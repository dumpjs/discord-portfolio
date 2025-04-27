'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { PlatformData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';

interface PlatformCardProps {
  platform: PlatformData;
  index: number;
}

const PlatformCard: FC<PlatformCardProps> = ({ platform, index }) => {
  const { theme } = useTheme();
  const iconSrc = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${platform.icon.toLowerCase().replace('si', '')}.svg`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Card className="glass-effect overflow-hidden h-full">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div 
              className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white/5"
              style={{ color: platform.color }}
            >
              <img
                src={iconSrc}
                alt={platform.name}
                className="w-6 h-6"
                style={{ 
                  filter: theme === 'dark' ? 'invert(1) brightness(100)' : 'none',
                  opacity: theme === 'dark' ? 0.8 : 1
                }}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm mb-2">{platform.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {platform.services.map((service) => (
                  <Badge 
                    key={service}
                    variant="secondary" 
                    className="text-[10px] bg-white/5 hover:bg-white/10"
                  >
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlatformCard;