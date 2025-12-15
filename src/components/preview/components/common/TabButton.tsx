import { useRef, useEffect, ReactNode } from 'react'

interface TabButtonProps {
  isActive: boolean
  activeClass: string
  children: ReactNode
  onClick: () => void
  onMounted?: (element: HTMLButtonElement) => void
}

export default function TabButton({
  isActive,
  activeClass,
  children,
  onClick,
  onMounted
}: TabButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current && onMounted) {
      onMounted(buttonRef.current)
    }
  }, [onMounted])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`px-3 py-1 rounded text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
        isActive ? activeClass : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {children}
    </button>
  )
}
