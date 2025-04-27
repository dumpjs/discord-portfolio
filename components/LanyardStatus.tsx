'use client';

import { FC } from 'react';
import { useLanyard } from '@/hooks/useLanyard';
import { Skeleton } from '@/components/ui/skeleton';
import { AppConfig } from '@/lib/types';
import Profile from './Profile';
import ActivityCard from './ActivityCard';
import { motion, stagger } from 'framer-motion';
import { Github } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

interface LanyardStatusProps {
  config: AppConfig;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
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

const LanyardStatus: FC<LanyardStatusProps> = ({ config }) => {
  const { data, loading, error } = useLanyard(config.userId);
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github':
        return <Github className="w-4 sm:w-5 h-4 sm:h-5 text-foreground" />;
      case 'Discord':
        return <FontAwesomeIcon icon={faDiscord} className="w-4 sm:w-5 h-4 sm:h-5 text-foreground" />;
      default:
        return null;
    }
  };

  // Filter activities to only show Spotify and games
  const filteredActivities = data?.activities?.filter(activity => {
    // Spotify activity has type 2
    if (activity.type === 2) return true;
    // Game activity has type 0
    if (activity.type === 0) return true;
    return false;
  });
  
  return (
    <motion.div 
      className="min-h-screen w-full flex items-center justify-center py-8 sm:py-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <main className="w-full max-w-2xl mx-auto">
        {loading && (
          <motion.div 
            className="space-y-6 px-4"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center">
              <Skeleton className="h-20 sm:h-24 w-20 sm:w-24 rounded-full" />
              <Skeleton className="h-6 sm:h-8 w-36 sm:w-48 mt-4" />
              <Skeleton className="h-4 w-28 sm:w-36 mt-2" />
              <Skeleton className="h-16 sm:h-20 w-full mt-4" />
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-28 sm:h-32 w-full rounded-lg" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20 sm:h-24 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {error && (
          <motion.div 
            className="text-center p-6 sm:p-8"
            variants={itemVariants}
          >
            <h2 className="text-lg sm:text-xl font-bold text-destructive">Falha ao carregar status do Discord</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">{error}</p>
          </motion.div>
        )}
        
        {data && (
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <Profile data={data} bio={config.bio} skills={config.skills} />
            </motion.div>
            
            {filteredActivities && filteredActivities.length > 0 && (
              <motion.div 
                className="space-y-4"
                variants={itemVariants}
              >
                <h2 className="text-lg font-semibold px-4 sm:px-6">Atividade Atual</h2>
                <ActivityCard activity={filteredActivities[0]} />
              </motion.div>
            )}
            
            <motion.div 
              className="flex justify-center gap-3 sm:gap-4 flex-wrap px-4"
              variants={itemVariants}
            >
              {config.links.map((link, index) => (
                <motion.a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-full bg-background/50 hover:bg-background/80 transition-colors border border-border/50 hover:border-primary/20"
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants}
                >
                  {getIcon(link.icon)}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}

export default LanyardStatus;