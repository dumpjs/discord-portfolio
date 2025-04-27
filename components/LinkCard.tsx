'use client';

import { Card } from '@/components/ui/card';
import { LinkData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { DivideIcon as LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { FC } from 'react';
import { motion } from 'framer-motion';

interface LinkCardProps {
  link: LinkData;
  index: number;
}

const LinkCard: FC<LinkCardProps> = ({ link, index }) => {
  // Dynamically get the icon from lucide-react
  const IconComponent = (LucideIcons as Record<string, LucideIcon>)[link.icon] || LucideIcons.Link;
  
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
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <Card className={cn(
          "flex items-center gap-3 p-4 transition-all cursor-pointer group border border-border/50 hover:border-primary/20",
          "backdrop-blur-sm bg-card/50 hover:bg-card/80"
        )}>
          <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5 text-primary">
            <IconComponent className="h-5 w-5" />
          </div>
          
          <div className="flex-1">
            <p className="font-medium">{link.title}</p>
          </div>
          
          <div className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
            <LucideIcons.ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
      </a>
    </motion.div>
  );
};

export default LinkCard;