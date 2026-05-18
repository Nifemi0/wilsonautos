import React from 'react'

interface HighlightTextProps {
  text: string
  searchTerm: string
  className?: string
}

/**
 * Highlights matching portions of text with a gold background.
 * Case-insensitive. Handles empty/whitespace search terms gracefully.
 */
export default function HighlightText({ text, searchTerm, className }: HighlightTextProps) {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return <span className={className}>{text}</span>
  }

  const escaped = searchTerm.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-[#F59E0B]/30 text-[#1E2030] rounded px-0.5 not-italic font-semibold"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </span>
  )
}
