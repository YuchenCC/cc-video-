export const colors = {
  backgroundPrimary: '#F7F8FA',
  backgroundSecondary: '#F4F6F8',
  primaryBlue: '#2F6F8F',
  deepBlue: '#233B5E',
  teal: '#2C9A9A',
  green: '#3CAEA3',
  coral: '#EF7B85',
  lightGray: '#D9E1E8',
  mediumGray: '#AAB4BE',
  darkGray: '#333333',
  terminalBg: '#1F2933',
  terminalText: '#E5E7EB',
  subtitleBg: 'rgba(40, 40, 40, 0.75)',
  subtitleText: '#FFFFFF',
  highlightYellow: '#FFE08A',
} as const

export type ColorToken = keyof typeof colors
