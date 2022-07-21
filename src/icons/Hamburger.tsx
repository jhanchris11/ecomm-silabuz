import { IconProps } from '../types'

export const HamburguerIcon = ({
  size,
  width = 24,
  height = '100%',
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
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )
}
