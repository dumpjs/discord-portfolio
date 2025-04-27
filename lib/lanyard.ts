import { LanyardResponse } from './types';

const LANYARD_API_URL = 'https://api.lanyard.rest/v1/users';

/**
 * Fetches user data from the Lanyard API
 * @param userId Discord user ID
 * @returns Lanyard API response
 */
export async function fetchLanyardData(userId: string): Promise<LanyardResponse> {
  try {
    const response = await fetch(`${LANYARD_API_URL}/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Lanyard data: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Lanyard data:', error);
    return { success: false };
  }
}

/**
 * Get the color associated with a Discord status
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'online':
      return 'hsl(139, 47.3%, 43.9%)'; // Green
    case 'idle':
      return 'hsl(38, 95.7%, 54.1%)'; // Yellow
    case 'dnd':
      return 'hsl(359, 82.6%, 59.4%)'; // Red
    case 'offline':
    default:
      return 'hsl(214, 9.9%, 50.4%)'; // Grey
  }
}

/**
 * Get the label for a Discord status
 */
export function getStatusLabel(status: string): string {
  switch (status) {
    case 'online':
      return 'Online';
    case 'idle':
      return 'Idle';
    case 'dnd':
      return 'Do Not Disturb';
    case 'offline':
    default:
      return 'Offline';
  }
}

/**
 * Format activity duration
 */
export function formatActivityDuration(timestamp?: number): string {
  if (!timestamp) return '';
  
  const start = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  
  if (diffHours > 0) {
    return `${diffHours} hr ${diffMins % 60} min`;
  }
  
  return `${diffMins} min`;
}

/**
 * Get Discord avatar URL
 */
export function getAvatarUrl(userId: string, avatarId: string): string {
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.webp?size=256`;
}