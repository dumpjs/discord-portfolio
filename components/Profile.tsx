'use client';

import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { getAvatarUrl } from '@/lib/lanyard';
import StatusBadge from './StatusBadge';
import { LanyardData } from '@/lib/types';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { Badge } from './ui/badge';
import PlatformCard from './PlatformCard';
import { appConfig } from '@/lib/config';

interface ProfileProps {
  data: LanyardData;
  bio: string;
  skills: Array<{ name: string; icon: string; color: string; }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const Profile: FC<ProfileProps> = ({ data, bio, skills }) => {
  const { discord_user, discord_status, activities } = data;
  const avatarUrl = getAvatarUrl(discord_user.id, discord_user.avatar);
  const { theme } = useTheme();
  
  const currentActivity = activities && activities.length > 0 ? activities[0] : null;
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 space-y-6"
    >
      <Card className="glass-effect overflow-hidden">
        <CardContent className="pt-6 px-4 sm:px-6 flex flex-col items-center text-center">
          <motion.div 
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Avatar className="h-24 sm:h-28 w-24 sm:w-28 ring-2 ring-white/10 shadow-lg">
              <AvatarImage src={avatarUrl} alt={discord_user.display_name} />
              <AvatarFallback>{discord_user.display_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 right-0">
              <StatusBadge status={discord_status} size="lg" />
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-6 space-y-2"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {discord_user.display_name}
              </h1>
              {currentActivity?.state && (
                <Badge variant="secondary" className="text-xs bg-white/5">
                  {currentActivity.state}
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <h2 className="text-sm text-muted-foreground">@{discord_user.username}</h2>
              {discord_user.discriminator !== '0' && (
                <Badge variant="secondary" className="text-xs bg-white/5">
                  #{discord_user.discriminator}
                </Badge>
              )}
            </div>
            {discord_user.global_name && discord_user.global_name !== discord_user.display_name && (
              <p className="text-xs text-muted-foreground">
                aka {discord_user.global_name}
              </p>
            )}
          </motion.div>
          
          <motion.p 
            className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md px-4"
            variants={itemVariants}
          >
            {bio}
          </motion.p>

          <motion.div 
            className="mt-8 w-full"
            variants={itemVariants}
          >
            <h3 className="text-base sm:text-lg font-semibold mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 sm:w-12 bg-white/10"></span>
              <span className="text-white/80">Tecnologias</span>
              <span className="h-px w-8 sm:w-12 bg-white/10"></span>
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
              {skills.map((skill, index) => {
                const iconSrc = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.icon.toLowerCase().replace('si', '')}.svg`;
                
                return (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <motion.div
                        className="glass-effect flex flex-col items-center gap-2 p-2 sm:p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <div 
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"
                          style={{ color: skill.color }}
                        >
                          <img
                            src={iconSrc}
                            alt={skill.name}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            style={{ 
                              filter: theme === 'dark' ? 'invert(1) brightness(100)' : 'none',
                              opacity: theme === 'dark' ? 0.8 : 1
                            }}
                          />
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center text-white/80">
                          {skill.name}
                        </span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      <motion.div variants={itemVariants}>
        <h3 className="text-base sm:text-lg font-semibold mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 sm:w-12 bg-white/10"></span>
          <span className="text-white/80">Plataformas</span>
          <span className="h-px w-8 sm:w-12 bg-white/10"></span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appConfig.platforms.map((platform, index) => (
            <PlatformCard key={platform.name} platform={platform} index={index} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;