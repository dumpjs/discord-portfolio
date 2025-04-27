// Lanyard API response types
export interface LanyardResponse {
  data?: LanyardData;
  success: boolean;
}

export interface LanyardData {
  kv: Record<string, unknown>;
  discord_user: DiscordUser;
  activities: Activity[];
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: Spotify | null;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  clan?: {
    tag: string;
    identity_guild_id: string;
    badge: string;
    identity_enabled: boolean;
  };
  avatar_decoration_data: any;
  bot: boolean;
  global_name: string;
  primary_guild?: {
    tag: string;
    identity_guild_id: number;
    badge: string;
    identity_enabled: boolean;
  };
  collectibles: any;
  display_name: string;
  public_flags: number;
}

export interface Activity {
  flags: number;
  id: string;
  name: string;
  type: number;
  session_id?: string;
  details?: string;
  application_id?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  created_at?: number;
  buttons?: string[];
}

export interface Spotify {
  track_id: string;
  album: string;
  album_art_url: string;
  artist: string;
  song: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LinkData {
  title: string;
  url: string;
  icon: string;
}

export interface SkillData {
  name: string;
  icon: string;
  color: string;
}

export interface PlatformData {
  name: string;
  icon: string;
  color: string;
  services: string[];
}

export interface AppConfig {
  userId: string;
  name: string;
  bio: string;
  skills: SkillData[];
  platforms: PlatformData[];
  links: LinkData[];
}