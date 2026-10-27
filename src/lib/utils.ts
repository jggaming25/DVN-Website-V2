import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h && m) return `${h} Std. ${m} Min.`
  if (h) return `${h} Std.`
  return `${m} Min.`
}

export function getRoleColor(role: string): string {
  switch (role) {
    case 'CEO':
    case 'VORSTAND':
      return 'from-yellow-500 to-orange-500'
    case 'ADMINISTRATOR':
    case 'ADMIN':
    case 'BOARD':
    case 'MANAGEMENT':
      return 'from-red-500 to-pink-500'
    default:
      return 'from-indigo-500 to-cyan-500'
  }
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    'CEO': 'CEO',
    'VORSTAND': 'Vorstand',
    'ADMINISTRATOR': 'Administrator',
    'ADMIN': 'Administrator',
    'BOARD': 'Vorstand',
    'MANAGEMENT': 'Management',
    'PERSONAL': 'Personal'
  }
  return labels[role] || role
}
