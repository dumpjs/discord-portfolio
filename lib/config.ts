import { AppConfig } from './types';

const parseList = (envVar: string): string[] => {
  return envVar?.split(',').map(item => item.trim()) ?? [];
};

const getSkills = () => {
  const skillsList = parseList(process.env.NEXT_PUBLIC_SKILLS ?? '');
  
  return skillsList.map(skill => {
    const iconMap: { [key: string]: string } = {
      'React': 'SiReact',
      'JavaScript': 'SiJavascript',
      'TypeScript': 'SiTypescript',
      'C#': 'SiCsharp',
      'Python': 'SiPython',
      'Node.js': 'SiNodedotjs',
      'Next.js': 'SiNextdotjs',
      'TailwindCSS': 'SiTailwindcss',
      'Vue.js': 'SiVuedotjs',
      'Angular': 'SiAngular',
      'Java': 'SiJava',
      'PHP': 'SiPhp',
      'Go': 'SiGo',
      'Ruby': 'SiRuby',
      'Rust': 'SiRust',
      'Docker': 'SiDocker',
    };

    const colorMap: { [key: string]: string } = {
      'React': '#61DAFB',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'C#': '#239120',
      'Python': '#3776AB',
      'Node.js': '#339933',
      'Next.js': '#000000',
      'TailwindCSS': '#06B6D4',
      'Vue.js': '#4FC08D',
      'Angular': '#DD0031',
      'Java': '#007396',
      'PHP': '#777BB4',
      'Go': '#00ADD8',
      'Ruby': '#CC342D',
      'Rust': '#000000',
      'Docker': '#2496ED',
    };

    return {
      name: skill,
      icon: iconMap[skill] ?? 'SiCode',
      color: colorMap[skill] ?? '#666666',
    };
  });
};

const getPlatforms = () => {
  const platformsList = parseList(process.env.NEXT_PUBLIC_PLATFORMS ?? '');
  
  const serviceMap: { [key: string]: string[] } = {
    'AWS': ['EC2', 'S3', 'Lambda', 'RDS', 'DynamoDB'],
    'Azure': ['App Service', 'Functions', 'SQL Database', 'Cosmos DB'],
    'Google Cloud': ['Compute Engine', 'Cloud Functions', 'Cloud SQL', 'BigQuery'],
    'Vercel': ['Edge Functions', 'Serverless Functions', 'Edge Network'],
    'DigitalOcean': ['Droplets', 'Spaces', 'App Platform'],
    'Heroku': ['Dynos', 'Postgres', 'Redis'],
  };

  const iconMap: { [key: string]: string } = {
    'AWS': 'SiAmazonaws',
    'Azure': 'SiMicrosoftazure',
    'Google Cloud': 'SiGooglecloud',
    'Vercel': 'SiVercel',
    'DigitalOcean': 'SiDigitalocean',
    'Heroku': 'SiHeroku',
  };

  const colorMap: { [key: string]: string } = {
    'AWS': '#FF9900',
    'Azure': '#0078D4',
    'Google Cloud': '#4285F4',
    'Vercel': '#000000',
    'DigitalOcean': '#0080FF',
    'Heroku': '#430098',
  };

  return platformsList.map(platform => ({
    name: platform,
    icon: iconMap[platform] ?? 'SiCode',
    color: colorMap[platform] ?? '#666666',
    services: serviceMap[platform] ?? [],
  }));
};

export const appConfig: AppConfig = {
  userId: process.env.NEXT_PUBLIC_DISCORD_ID ?? '',
  name: process.env.NEXT_PUBLIC_NAME ?? '',
  bio: process.env.NEXT_PUBLIC_BIO ?? '',
  skills: getSkills(),
  platforms: getPlatforms(),
  links: [
    {
      title: 'GitHub',
      url: process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/',
      icon: 'Github'
    },
    {
      title: 'Discord',
      url: process.env.NEXT_PUBLIC_DISCORD_URL ?? '',
      icon: 'Discord'
    }
  ]
};