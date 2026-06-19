import { colors } from '../styles/colors'
import { motion } from '../styles/motion'
import { spacing } from '../styles/spacing'
import { typography } from '../styles/typography'
import {
  cx,
  escapeHtml,
  html,
  type HtmlChild,
  type StyleMap,
} from './html'

export {
  cx,
  escapeHtml,
  html,
  renderAttributes,
  renderChildren,
  renderStyle,
  type HtmlAttributes,
  type HtmlChild,
  type StyleMap,
} from './html'

export type ComponentState = 'default' | 'highlight' | 'dim'
export type FlowDirection = 'horizontal' | 'vertical'
export type StackLabelColorScheme = 'coral-dark' | 'blue-light' | 'teal-light'
export type StackLabelSize = 'md' | 'lg'
export type StackFrameColorScheme = 'blue' | 'teal' | 'coral' | 'gray'
export type CheckBadgeColorScheme = 'teal' | 'green' | 'blue'
export type CheckBadgeSize = 'sm' | 'md' | 'lg'

export interface BaseComponentProps {
  id?: string
  className?: string
  style?: StyleMap
}

export interface TechCardProps extends BaseComponentProps {
  title: string
  subtitle?: string
  iconSrc?: string
  badge?: string
  state?: ComponentState
}

export interface MachineBoxProps extends BaseComponentProps {
  title: string
  subtitle?: string
  iconSrc?: string
  state?: ComponentState
}

export interface ContainerBoxProps extends BaseComponentProps {
  title: string
  subtitle?: string
  children?: HtmlChild
  state?: ComponentState
}

export interface TerminalLine {
  text: string
  highlight?: boolean
}

export interface TerminalWindowProps extends BaseComponentProps {
  title?: string
  lines: Array<string | TerminalLine>
  highlightedLineIndex?: number
}

export interface FlowArrowProps extends BaseComponentProps {
  direction?: FlowDirection
  label?: string
  length?: number
  state?: ComponentState
}

export interface LayerItem {
  label: string
  detail?: string
  state?: ComponentState
}

export interface LayerStackProps extends BaseComponentProps {
  layers: LayerItem[]
}

export interface CompareLayoutProps extends BaseComponentProps {
  leftTitle: string
  left: HtmlChild
  rightTitle: string
  right: HtmlChild
}

export interface StepItem {
  label: string
  description?: string
  state?: ComponentState
}

export interface StepListProps extends BaseComponentProps {
  steps: StepItem[]
}

export interface SubtitleBarProps extends BaseComponentProps {
  text: string
}

export interface WatermarkProps extends BaseComponentProps {
  text?: string
  logoSrc?: string
}

export interface StackLabelProps extends BaseComponentProps {
  text: string
  colorScheme?: StackLabelColorScheme
  size?: StackLabelSize
  block?: boolean
}

export interface StackFrameProps extends BaseComponentProps {
  title?: string
  children?: HtmlChild
  colorScheme?: StackFrameColorScheme
}

export interface CheckBadgeProps extends BaseComponentProps {
  label?: string
  colorScheme?: CheckBadgeColorScheme
  size?: CheckBadgeSize
  animated?: boolean
  animationDurationMs?: number
}

const baseTextStyle = {
  fontFamily: typography.body.fontFamily,
  color: colors.darkGray,
}

const labelStyle = {
  fontFamily: typography.label.fontFamily,
  fontWeight: typography.label.fontWeight,
  color: colors.deepBlue,
}

const mergeStyle = (
  base: StyleMap,
  override: StyleMap | undefined,
): StyleMap => ({
  ...base,
  ...override,
})

const stateStyle = (state: ComponentState = 'default'): StyleMap => ({
  opacity: state === 'dim' ? motion.dimOpacity : 1,
  borderColor: state === 'highlight' ? colors.primaryBlue : colors.lightGray,
  boxShadow:
    state === 'highlight'
      ? '0 10px 24px rgba(47, 111, 143, 0.16)'
      : '0 6px 18px rgba(35, 59, 94, 0.08)',
})

const rootAttrs = (
  baseClassName: string,
  props: BaseComponentProps,
  style: StyleMap,
) => ({
  id: props.id,
  className: cx(baseClassName, props.className),
  style: mergeStyle(style, props.style),
})

const cssRootAttrs = (
  baseClassName: string,
  props: BaseComponentProps,
) => ({
  id: props.id,
  className: cx(baseClassName, props.className),
  style: props.style,
})

const textBlock = (title: string, subtitle?: string): string =>
  html(
    'div',
    {
      className: 'cc-component-text',
      style: {
        display: 'grid',
        gap: `${spacing.xs}px`,
        minWidth: 0,
      },
    },
    html(
      'div',
      {
        className: 'cc-component-title',
        style: {
          ...labelStyle,
          fontSize: '22px',
          lineHeight: 1.25,
        },
      },
      escapeHtml(title),
    ),
    subtitle
      ? html(
          'div',
          {
            className: 'cc-component-subtitle',
            style: {
              ...baseTextStyle,
              color: colors.mediumGray,
              fontSize: '15px',
              lineHeight: 1.4,
            },
          },
          escapeHtml(subtitle),
        )
      : '',
  )

export const TechCard = ({
  title,
  subtitle,
  iconSrc,
  badge,
  state = 'default',
  ...props
}: TechCardProps): string =>
  html(
    'article',
    rootAttrs('cc-tech-card', props, {
      ...stateStyle(state),
      ...baseTextStyle,
      alignItems: 'center',
      background: '#FFFFFF',
      border: '1px solid',
      borderRadius: '12px',
      boxSizing: 'border-box',
      display: 'grid',
      gap: `${spacing.md}px`,
      gridTemplateColumns: iconSrc ? '56px 1fr' : '1fr',
      minHeight: '112px',
      padding: `${spacing.lg}px`,
    }),
    iconSrc
      ? html('img', {
          alt: '',
          className: 'cc-tech-card-icon',
          src: iconSrc,
          style: {
            height: '56px',
            objectFit: 'contain',
            width: '56px',
          },
        })
      : '',
    html('div', {}, textBlock(title, subtitle)),
    badge
      ? html(
          'span',
          {
            className: 'cc-tech-card-badge',
            style: {
              ...labelStyle,
              background: colors.backgroundSecondary,
              borderRadius: '999px',
              fontSize: '13px',
              padding: `${spacing.xs}px ${spacing.sm}px`,
            },
          },
          escapeHtml(badge),
        )
      : '',
  )

export const StackLabel = ({
  text,
  colorScheme = 'coral-dark',
  size = 'lg',
  block = true,
  ...props
}: StackLabelProps): string =>
  html(
    'div',
    cssRootAttrs(
      cx(
        'cc-stack-label',
        `cc-stack-label--${colorScheme}`,
        `cc-stack-label--${size}`,
        block && 'cc-stack-label--block',
      ),
      props,
    ),
    escapeHtml(text),
  )

export const StackFrame = ({
  title,
  children,
  colorScheme = 'blue',
  ...props
}: StackFrameProps): string =>
  html(
    'figure',
    cssRootAttrs(
      cx('cc-stack-frame', `cc-stack-frame--${colorScheme}`),
      props,
    ),
    title
      ? html(
          'figcaption',
          { className: 'cc-stack-frame__title' },
          escapeHtml(title),
        )
      : '',
    html('div', { className: 'cc-stack-frame__body' }, children ?? ''),
  )

export const CheckBadge = ({
  label = '完成',
  colorScheme = 'teal',
  size = 'md',
  animated = true,
  animationDurationMs,
  ...props
}: CheckBadgeProps = {}): string =>
  html(
    'span',
    cssRootAttrs(
      cx(
        'cc-check-badge',
        `cc-check-badge--${colorScheme}`,
        `cc-check-badge--${size}`,
        animated ? 'cc-check-badge--animated' : 'cc-check-badge--static',
      ),
      {
        ...props,
        style:
          animationDurationMs === undefined
            ? props.style
            : {
                ...props.style,
                '--cc-check-badge-animation-duration': `${animationDurationMs}ms`,
              },
      },
    ),
    `<svg class="cc-check-badge__icon" viewBox="0 0 64 64" fill="none" role="img" aria-label="${escapeHtml(
      label,
    )}">
      <path class="cc-check-badge__mark" d="M18 33.5L28.5 44L47 21" />
    </svg>`,
  )

export const MachineBox = ({
  title,
  subtitle,
  iconSrc,
  state = 'default',
  ...props
}: MachineBoxProps): string =>
  html(
    'section',
    rootAttrs('cc-machine-box', props, {
      ...stateStyle(state),
      ...baseTextStyle,
      background: colors.backgroundSecondary,
      border: '1px solid',
      borderRadius: '12px',
      display: 'grid',
      gap: `${spacing.md}px`,
      gridTemplateColumns: iconSrc ? '64px 1fr' : '1fr',
      padding: `${spacing.lg}px`,
    }),
    iconSrc
      ? html('img', {
          alt: '',
          src: iconSrc,
          style: {
            height: '64px',
            objectFit: 'contain',
            width: '64px',
          },
        })
      : '',
    textBlock(title, subtitle),
  )

export const ContainerBox = ({
  title,
  subtitle,
  children,
  state = 'default',
  ...props
}: ContainerBoxProps): string =>
  html(
    'section',
    rootAttrs('cc-container-box', props, {
      ...stateStyle(state),
      ...baseTextStyle,
      background: '#FFFFFF',
      border: '2px dashed',
      borderRadius: '14px',
      display: 'grid',
      gap: `${spacing.md}px`,
      padding: `${spacing.lg}px`,
    }),
    textBlock(title, subtitle),
    children ?? '',
  )

export const TerminalWindow = ({
  title = 'Terminal',
  lines,
  highlightedLineIndex,
  ...props
}: TerminalWindowProps): string =>
  html(
    'section',
    rootAttrs('cc-terminal-window', props, {
      background: colors.terminalBg,
      borderRadius: '12px',
      boxShadow: '0 10px 26px rgba(31, 41, 51, 0.18)',
      color: colors.terminalText,
      overflow: 'hidden',
    }),
    html(
      'div',
      {
        className: 'cc-terminal-window-header',
        style: {
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: `${spacing.sm}px`,
          padding: `${spacing.sm}px ${spacing.md}px`,
        },
      },
      html('span', {
        style: {
          background: colors.coral,
          borderRadius: '50%',
          display: 'inline-block',
          height: '10px',
          width: '10px',
        },
      }),
      html('span', {
        style: {
          background: colors.highlightYellow,
          borderRadius: '50%',
          display: 'inline-block',
          height: '10px',
          width: '10px',
        },
      }),
      html('span', {
        style: {
          background: colors.green,
          borderRadius: '50%',
          display: 'inline-block',
          height: '10px',
          width: '10px',
        },
      }),
      html(
        'strong',
        {
          style: {
            fontFamily: typography.label.fontFamily,
            fontSize: '14px',
            fontWeight: typography.label.fontWeight,
            marginLeft: `${spacing.sm}px`,
          },
        },
        escapeHtml(title),
      ),
    ),
    html(
      'pre',
      {
        className: 'cc-terminal-window-body',
        style: {
          fontFamily: typography.code.fontFamily,
          fontSize: '17px',
          lineHeight: 1.55,
          margin: 0,
          padding: `${spacing.md}px ${spacing.lg}px`,
          whiteSpace: 'pre-wrap',
        },
      },
      lines
        .map((line, index) => {
          const text = typeof line === 'string' ? line : line.text
          const isHighlighted =
            highlightedLineIndex === index ||
            (typeof line !== 'string' && line.highlight === true)

          return html(
            'code',
            {
              style: {
                background: isHighlighted
                  ? 'rgba(255, 224, 138, 0.18)'
                  : 'transparent',
                borderRadius: '6px',
                color: isHighlighted ? colors.highlightYellow : colors.terminalText,
                display: 'block',
                padding: isHighlighted ? '2px 6px' : '2px 0',
              },
            },
            escapeHtml(text),
          )
        })
        .join(''),
    ),
  )

export const FlowArrow = ({
  direction = 'horizontal',
  label,
  length = 180,
  state = 'default',
  ...props
}: FlowArrowProps): string => {
  const isHorizontal = direction === 'horizontal'
  const markerId = `cc-arrow-${direction}-${state}`
  const color = state === 'highlight' ? colors.primaryBlue : colors.teal
  const width = isHorizontal ? length : 48
  const height = isHorizontal ? 48 : length
  const line = isHorizontal
    ? `<line x1="8" y1="24" x2="${length - 16}" y2="24" />`
    : `<line x1="24" y1="8" x2="24" y2="${length - 16}" />`

  return html(
    'figure',
    rootAttrs('cc-flow-arrow', props, {
      ...baseTextStyle,
      display: 'inline-grid',
      gap: `${spacing.xs}px`,
      justifyItems: 'center',
      margin: 0,
      opacity: state === 'dim' ? motion.dimOpacity : 1,
    }),
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" role="img" aria-label="${escapeHtml(
      label ?? 'flow arrow',
    )}">
      <defs>
        <marker id="${markerId}" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L8,3 z" fill="${color}" />
        </marker>
      </defs>
      <g stroke="${color}" stroke-width="4" stroke-linecap="round" marker-end="url(#${markerId})">
        ${line}
      </g>
    </svg>`,
    label
      ? html(
          'figcaption',
          {
            style: {
              ...labelStyle,
              fontSize: '14px',
            },
          },
          escapeHtml(label),
        )
      : '',
  )
}

export const LayerStack = ({ layers, ...props }: LayerStackProps): string =>
  html(
    'div',
    rootAttrs('cc-layer-stack', props, {
      display: 'grid',
      gap: `${spacing.sm}px`,
    }),
    layers.map((layer) =>
      html(
        'div',
        {
          className: cx('cc-layer-stack-item', `cc-state-${layer.state ?? 'default'}`),
          style: {
            ...stateStyle(layer.state),
            ...baseTextStyle,
            background: '#FFFFFF',
            border: '1px solid',
            borderRadius: '10px',
            display: 'grid',
            gap: `${spacing.xs}px`,
            padding: `${spacing.md}px ${spacing.lg}px`,
          },
        },
        html(
          'strong',
          {
            style: {
              ...labelStyle,
              fontSize: '18px',
            },
          },
          escapeHtml(layer.label),
        ),
        layer.detail
          ? html(
              'span',
              {
                style: {
                  color: colors.mediumGray,
                  fontSize: '14px',
                },
              },
              escapeHtml(layer.detail),
            )
          : '',
      ),
    ),
  )

export const CompareLayout = ({
  leftTitle,
  left,
  rightTitle,
  right,
  ...props
}: CompareLayoutProps): string =>
  html(
    'section',
    rootAttrs('cc-compare-layout', props, {
      display: 'grid',
      gap: `${spacing.xl}px`,
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    }),
    html(
      'div',
      {
        className: 'cc-compare-layout-panel',
        style: {
          display: 'grid',
          gap: `${spacing.md}px`,
        },
      },
      html(
        'h3',
        { style: { ...labelStyle, fontSize: '24px', margin: 0 } },
        escapeHtml(leftTitle),
      ),
      left,
    ),
    html(
      'div',
      {
        className: 'cc-compare-layout-panel',
        style: {
          display: 'grid',
          gap: `${spacing.md}px`,
        },
      },
      html(
        'h3',
        {
          style: {
            ...labelStyle,
            color: colors.primaryBlue,
            fontSize: '24px',
            margin: 0,
          },
        },
        escapeHtml(rightTitle),
      ),
      right,
    ),
  )

export const StepList = ({ steps, ...props }: StepListProps): string =>
  html(
    'ol',
    rootAttrs('cc-step-list', props, {
      ...baseTextStyle,
      counterReset: 'cc-step',
      display: 'grid',
      gap: `${spacing.md}px`,
      listStyle: 'none',
      margin: 0,
      padding: 0,
    }),
    steps.map((step, index) =>
      html(
        'li',
        {
          className: cx('cc-step-list-item', `cc-state-${step.state ?? 'default'}`),
          style: {
            ...stateStyle(step.state),
            alignItems: 'start',
            background: '#FFFFFF',
            border: '1px solid',
            borderRadius: '10px',
            display: 'grid',
            gap: `${spacing.sm}px`,
            gridTemplateColumns: '36px 1fr',
            padding: `${spacing.md}px`,
          },
        },
        html(
          'span',
          {
            style: {
              ...labelStyle,
              alignItems: 'center',
              background: colors.backgroundSecondary,
              borderRadius: '50%',
              display: 'inline-flex',
              height: '32px',
              justifyContent: 'center',
              width: '32px',
            },
          },
          index + 1,
        ),
        html(
          'span',
          {
            style: {
              display: 'grid',
              gap: `${spacing.xs}px`,
            },
          },
          html(
            'strong',
            {
              style: {
                ...labelStyle,
                fontSize: '17px',
              },
            },
            escapeHtml(step.label),
          ),
          step.description
            ? html(
                'span',
                {
                  style: {
                    color: colors.mediumGray,
                    fontSize: '14px',
                    lineHeight: 1.4,
                  },
                },
                escapeHtml(step.description),
              )
            : '',
        ),
      ),
    ),
  )

export const SubtitleBar = ({ text, ...props }: SubtitleBarProps): string =>
  html(
    'div',
    rootAttrs('cc-subtitle-bar', props, {
      ...typography.subtitle,
      background: colors.subtitleBg,
      borderRadius: '12px',
      bottom: '48px',
      boxSizing: 'border-box',
      fontSize: '26px',
      left: '50%',
      lineHeight: 1.35,
      maxWidth: '1120px',
      padding: `${spacing.sm}px ${spacing.xl}px`,
      position: 'absolute',
      textAlign: 'center',
      transform: 'translateX(-50%)',
      width: 'fit-content',
    }),
    escapeHtml(text),
  )

export const Watermark = ({
  text = 'PPTMOB',
  logoSrc,
  ...props
}: WatermarkProps): string =>
  html(
    'div',
    rootAttrs('cc-watermark', props, {
      ...labelStyle,
      alignItems: 'center',
      color: colors.mediumGray,
      display: 'inline-flex',
      fontSize: '14px',
      gap: `${spacing.sm}px`,
      opacity: 0.72,
      position: 'absolute',
      right: '36px',
      top: '28px',
    }),
    logoSrc
      ? html('img', {
          alt: '',
          src: logoSrc,
          style: {
            height: '22px',
            objectFit: 'contain',
            width: 'auto',
          },
        })
      : '',
    escapeHtml(text),
  )
