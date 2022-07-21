import { IconProps } from '../types'

export const UserIcon = ({
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
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  )
}
