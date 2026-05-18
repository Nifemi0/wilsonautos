// Utility functions for Wilson Express Autos

/**
 * Format number as Nigerian Naira currency (₦)
 */
export function formatPrice(price: number): string {
  return '₦' + price.toLocaleString('en-NG')
}

/**
 * Generate a slug for a car based on its properties: year-make-model-location-id
 */
export function getCarSlug(car: {
  year: number
  make: string
  model: string
  location: string
  id: string
}): string {
  const base = `${car.year}-${car.make}-${car.model}-${car.location}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, '')    // Remove leading/trailing hyphens
  return `${base}-${car.id}`
}

/**
 * Extract the ID from an SEO slug parameter
 */
export function parseIdFromSlug(slug: string): string {
  // UUID regex: 8-4-4-4-12 hex chars at the end of the string
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const match = slug.match(uuidRegex)
  if (match) {
    return match[0]
  }
  // Otherwise, fallback to splitting by hyphens and taking the last segment (e.g. for mock numeric IDs like '1')
  const parts = slug.split('-')
  return parts[parts.length - 1]
}

/**
 * Calculate simple time ago string
 */
export function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago'
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago'
  return Math.floor(diff / 86400000) + 'd ago'
}
