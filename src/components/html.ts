export type HtmlChild =
  | string
  | number
  | boolean
  | null
  | undefined
  | HtmlChild[]

export type AttributeValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | StyleMap

export type HtmlAttributes = Record<string, AttributeValue>
export type StyleMap = Record<string, string | number | null | undefined>

const escapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const toKebabCase = (value: string): string =>
  value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)

const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
])

export const escapeHtml = (value: unknown): string =>
  String(value).replace(/[&<>"']/g, (match) => escapeMap[match])

const appendChild = (output: string[], child: HtmlChild): void => {
  if (Array.isArray(child)) {
    child.forEach((nestedChild) => appendChild(output, nestedChild))
    return
  }

  if (child !== null && child !== undefined && child !== false) {
    output.push(String(child))
  }
}

export const renderChildren = (children: HtmlChild[]): string =>
  children.reduce<string[]>((output, child) => {
    appendChild(output, child)
    return output
  }, []).join('')

export const renderStyle = (style: StyleMap = {}): string =>
  Object.entries(style)
    .filter(([, value]) => value !== null && value !== undefined && value !== '')
    .map(([name, value]) => `${toKebabCase(name)}: ${value}`)
    .join('; ')

export const renderAttributes = (attributes: HtmlAttributes = {}): string => {
  const rendered = Object.entries(attributes)
    .filter(([, value]) => value !== null && value !== undefined && value !== false)
    .map(([name, value]) => {
      const attrName = name === 'className' ? 'class' : toKebabCase(name)

      if (value === true) {
        return attrName
      }

      const attrValue =
        name === 'style' && typeof value === 'object'
          ? renderStyle(value as StyleMap)
          : String(value)

      return `${attrName}="${escapeHtml(attrValue)}"`
    })

  return rendered.length > 0 ? ` ${rendered.join(' ')}` : ''
}

export const cx = (
  ...classNames: Array<string | false | null | undefined>
): string => classNames.filter(Boolean).join(' ')

export const html = (
  tagName: string,
  attributes: HtmlAttributes = {},
  ...children: HtmlChild[]
): string => {
  const openingTag = `<${tagName}${renderAttributes(attributes)}>`

  if (voidElements.has(tagName.toLowerCase())) {
    return openingTag
  }

  return `${openingTag}${renderChildren(children)}</${tagName}>`
}
