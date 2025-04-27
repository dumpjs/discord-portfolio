'use client';

import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { formatActivityDuration } from '@/lib/lanyard';
import { Clock, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: FC<ActivityCardProps> = ({ activity }) => {
  const getLargeImageUrl = (url?: string) => {
    if (!url) return null;
    
    if (url.startsWith('http')) return url;
    if (url.startsWith('mp:external/')) return url.split('mp:external/')[1];
    if (url.includes('https://media.discordapp.net/')) return url;
    if (url.startsWith('spotify:')) return url.replace('spotify:', 'https://i.scdn.co/image/');
    
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${url}.png`;
  };
  
  const largeImageUrl = getLargeImageUrl(activity.assets?.large_image);
  const smallImageUrl = getLargeImageUrl(activity.assets?.small_image);
  const largeText = activity.assets?.large_text;
  const smallText = activity.assets?.small_text;
  const duration = formatActivityDuration(activity.timestamps?.start);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="px-4 sm:px-6"
    >
      <Card className="overflow-hidden border-border/50 backdrop-blur-sm bg-card/50 hover:bg-card/80 transition-all group">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {largeImageUrl && (
              <motion.div 
                className="relative shrink-0 overflow-hidden rounded-lg group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  src={largeImageUrl}
                  alt={largeText || activity.name}
                  className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (activity.application_id) {
                      target.src = `https://cdn.discordapp.com/app-icons/${activity.application_id}/${activity.assets?.large_image}.png`;
                    }
                  }}
                />
                {smallImageUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute -bottom-2 -right-2 bg-background/80 backdrop-blur-sm p-1 rounded-lg border border-border/50">
                        <img 
                          src={smallImageUrl}
                          alt={smallText || ''}
                          className="h-6 w-6 rounded-sm"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{smallText}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </motion.div>
            )}
            
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-2">
                <h3 className="text-lg font-semibold truncate">{activity.name}</h3>
                {duration && (
                  <Badge variant="secondary" className="h-6 px-2 gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">{duration}</span>
                  </Badge>
                )}
              </div>
              
              {activity.details && (
                <p className="text-sm text-muted-foreground mb-1.5 line-clamp-1">
                  {activity.details}
                </p>
              )}
              
              {activity.state && (
                <p className="text-sm text-muted-foreground/80 line-clamp-1">
                  {activity.state}
                </p>
              )}
              
              {activity.buttons && activity.buttons.length > 0 && (
                <div className="flex justify-center sm:justify-start gap-2 mt-4">
                  {activity.buttons.map((button, index) => (
                    <Button 
                      key={index}
                      variant="secondary" 
                      size="sm" 
                      className="h-8 text-xs hover:bg-primary/10 transition-colors" 
                      asChild
                    >
                      <a 
                        href={activity.application_id === "782685898163617802" ? "https://github.com" : "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        {activity.application_id === "782685898163617802" && <Github className="h-3.5 w-3.5" />}
                        <span>{button}</span>
                        <ExternalLink className="h-3 w-3 ml-0.5 opacity-50" />
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActivityCard;