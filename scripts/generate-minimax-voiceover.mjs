import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INIT_PATH = join(ROOT, "docs", "init.md");
const VOICEOVER_PATH = join(ROOT, "scripts", "voiceover.md");
const OUTPUT_DIR = join(ROOT, "assets", "audio", "voiceover");
const MANIFEST_PATH = join(OUTPUT_DIR, "manifest.json");

const SCENES = [
  { id: "scene-001", chapter: "综述" },
  { id: "scene-002", chapter: "接入篇" },
  { id: "scene-003", chapter: "配置篇" },
  { id: "scene-004", chapter: "日志篇" },
  { id: "scene-005", chapter: "治理篇" },
  { id: "scene-006", chapter: "AI 工程化" },
];

function loadEnv(path) {
  if (!existsSync(path)) return;
  for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function parseDurations(markdown) {
  const result = new Map();
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^\|\s*(00[1-6])\s*\|[^|]*\|\s*([\d.]+)s\s*\|/);
    const sceneId = match ? `scene-${match[1]}` : null;
    if (match && !result.has(sceneId)) result.set(sceneId, Number(match[2]));
  }
  return result;
}

function parseVoiceover(markdown) {
  const result = new Map();
  const headingPattern = /^##\s+(.+?)\s*$/gm;
  const headings = [...markdown.matchAll(headingPattern)];

  for (let index = 0; index < headings.length; index += 1) {
    const chapter = headings[index][1].trim();
    const start = headings[index].index + headings[index][0].length;
    const end = headings[index + 1]?.index ?? markdown.length;
    const text = markdown
      .slice(start, end)
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith(">"))
      .join("\n");
    result.set(chapter, text);
  }

  return result;
}

function probeDuration(path) {
  const output = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      path,
    ],
    { encoding: "utf8" },
  );
  const duration = Number(output.trim());
  if (!Number.isFinite(duration)) throw new Error(`Unable to read duration: ${path}`);
  return duration;
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function sleep(milliseconds) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function synthesize({ text, speed, outputPath }) {
  const apiKey = process.env.MINIMAX_API_KEY;
  const baseUrl = (process.env.MINIMAX_API_BASE_URL || "https://api.minimaxi.com").replace(
    /\/+$/,
    "",
  );
  const endpoint = process.env.MINIMAX_TTS_ENDPOINT || "/v1/t2a_v2";
  const model = process.env.MINIMAX_TTS_MODEL || "speech-2.8-hd";
  const voiceId = process.env.MINIMAX_VOICE_ID || "Chinese (Mandarin)_Cute_Spirit";

  if (!apiKey) throw new Error("MINIMAX_API_KEY is missing.");

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        text,
        stream: false,
        voice_setting: {
          voice_id: voiceId,
          speed,
          vol: 1,
          pitch: 0,
        },
        audio_setting: {
          sample_rate: 32000,
          bitrate: 128000,
          format: "mp3",
          channel: 1,
        },
        subtitle_enable: false,
      }),
    });

    const body = await response.json().catch(() => null);
    const message = body?.base_resp?.status_msg || "request failed";
    const rateLimited = /rate limit|rpm/i.test(message);

    if ((response.ok && body?.base_resp?.status_code === 0 && body?.data?.audio)) {
      writeFileSync(outputPath, Buffer.from(body.data.audio, "hex"));
      return {
        traceId: body.trace_id,
        usageCharacters: body.extra_info?.usage_characters,
      };
    }

    if (rateLimited && attempt < 3) {
      console.log(`MiniMax RPM limit reached; waiting 65 seconds before retry ${attempt + 1}.`);
      await sleep(65_000);
      continue;
    }

    if (!response.ok) throw new Error(`MiniMax HTTP ${response.status}: ${message}`);
    throw new Error(`MiniMax synthesis failed: ${message}`);
  }

  throw new Error("MiniMax synthesis failed after retries.");
}

async function generateScene(scene, text, targetDuration) {
  const finalPath = join(OUTPUT_DIR, `${scene.id}.mp3`);
  const rawPath = join(OUTPUT_DIR, `.${scene.id}.raw.mp3`);
  const normalizedPath = join(OUTPUT_DIR, `.${scene.id}.normalized.mp3`);
  const speed = 1.1;
  const api = await synthesize({ text, speed, outputPath: rawPath });
  const rawDuration = probeDuration(rawPath);
  const desiredDuration = targetDuration - 0.35;
  const tempo = clamp(rawDuration / desiredDuration, 0.5, 2);

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-v",
      "error",
      "-i",
      rawPath,
      "-filter:a",
      `atempo=${tempo.toFixed(6)}`,
      "-codec:a",
      "libmp3lame",
      "-b:a",
      "128k",
      "-ar",
      "32000",
      "-ac",
      "1",
      normalizedPath,
    ],
    { stdio: "inherit" },
  );

  const duration = probeDuration(normalizedPath);
  rmSync(finalPath, { force: true });
  renameSync(normalizedPath, finalPath);
  rmSync(rawPath, { force: true });

  console.log(
    `${scene.id}: ${rawDuration.toFixed(2)}s MiniMax → ${duration.toFixed(2)}s final (target ${targetDuration}s)`,
  );

  return {
    scene: scene.id,
    chapter: scene.chapter,
    file: `assets/audio/voiceover/${scene.id}.mp3`,
    targetDuration,
    rawDuration: Number(rawDuration.toFixed(3)),
    actualDuration: Number(duration.toFixed(3)),
    speed,
    postProcessTempo: Number(tempo.toFixed(6)),
    voiceId: process.env.MINIMAX_VOICE_ID,
    model: process.env.MINIMAX_TTS_MODEL,
    textSha256: sha256(text),
    usageCharacters: api.usageCharacters,
    traceId: api.traceId,
  };
}

loadEnv(join(ROOT, ".env"));
mkdirSync(OUTPUT_DIR, { recursive: true });

const durations = parseDurations(readFileSync(INIT_PATH, "utf8"));
const voiceovers = parseVoiceover(readFileSync(VOICEOVER_PATH, "utf8"));
const manifest = [];
const normalizeExisting = process.argv.includes("--normalize-existing");
const previousManifest = normalizeExisting && existsSync(MANIFEST_PATH)
  ? JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
  : null;

function normalizeExistingScene(scene, text, targetDuration) {
  const finalPath = join(OUTPUT_DIR, `${scene.id}.mp3`);
  const normalizedPath = join(OUTPUT_DIR, `.${scene.id}.normalized.mp3`);
  if (!existsSync(finalPath)) throw new Error(`Existing audio missing: ${finalPath}`);

  const previous = previousManifest?.scenes?.find((item) => item.scene === scene.id) || {};
  const currentDuration = probeDuration(finalPath);
  const desiredDuration = targetDuration - 0.35;
  const tempo = clamp(currentDuration / desiredDuration, 0.5, 2);

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-v",
      "error",
      "-i",
      finalPath,
      "-filter:a",
      `atempo=${tempo.toFixed(6)}`,
      "-codec:a",
      "libmp3lame",
      "-b:a",
      "128k",
      "-ar",
      "32000",
      "-ac",
      "1",
      normalizedPath,
    ],
    { stdio: "inherit" },
  );

  const duration = probeDuration(normalizedPath);
  rmSync(finalPath, { force: true });
  renameSync(normalizedPath, finalPath);
  console.log(
    `${scene.id}: ${currentDuration.toFixed(2)}s existing → ${duration.toFixed(2)}s final (voiceover target ${targetDuration}s)`,
  );

  return {
    ...previous,
    scene: scene.id,
    chapter: scene.chapter,
    file: `assets/audio/voiceover/${scene.id}.mp3`,
    targetDuration,
    rawDuration: previous.rawDuration,
    actualDuration: Number(duration.toFixed(3)),
    speed: previous.speed || 1.1,
    postProcessTempo: Number(
      ((previous.postProcessTempo || 1) * tempo).toFixed(6),
    ),
    voiceId: process.env.MINIMAX_VOICE_ID,
    model: process.env.MINIMAX_TTS_MODEL,
    textSha256: sha256(text),
  };
}

for (let index = 0; index < SCENES.length; index += 1) {
  const scene = SCENES[index];
  const targetDuration = durations.get(scene.id);
  const text = voiceovers.get(scene.chapter);
  if (!targetDuration) throw new Error(`Duration missing for ${scene.id}.`);
  if (!text) throw new Error(`Voiceover missing for ${scene.chapter}.`);
  manifest.push(
    normalizeExisting
      ? normalizeExistingScene(scene, text, targetDuration)
      : await generateScene(scene, text, targetDuration),
  );
  if (!normalizeExisting && index < SCENES.length - 1) await sleep(12_000);
}

writeFileSync(
  MANIFEST_PATH,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: {
        durations: "docs/init.md",
        voiceover: "scripts/voiceover.md",
      },
      scenes: manifest,
    },
    null,
    2,
  )}\n`,
);

console.log(`Generated ${manifest.length} scene voiceovers.`);
console.log(`Manifest: ${MANIFEST_PATH}`);
