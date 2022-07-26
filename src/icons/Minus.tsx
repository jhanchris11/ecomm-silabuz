import { IconProps } from '../types'

export const MinusIcon = ({
  size,
  width = 24,
  height = 24,
  ...props
}: IconProps) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 20 20"
      width={width}
      height={height}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
        clipRule="evenodd"
      />
    </svg>
  )
}
