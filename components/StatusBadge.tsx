'use client';

import { getStatusColor } from '@/lib/lanyard';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FC } from 'react';

interface StatusBadgeProps {
  status: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusBadge: FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  className 
}) => {
  const getStatusImage = (status: string) => {
    switch (status) {
      case 'online':
        return (
          <div className="relative w-full h-full rounded-full bg-[#3ba55c]" />
        );
      case 'idle':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full bg-[#faa61a]" />
            <div className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-full bg-[#2b2d31] transform translate-x-[15%] translate-y-[15%]" />
          </div>
        );
      case 'dnd':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full bg-[#ed4245]" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[20%] bg-[#2b2d31] rounded-sm" />
          </div>
        );
      case 'streaming':
        return (
          <div className="relative w-full h-full rounded-full bg-[#593695]" />
        );
      case 'offline':
      default:
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full bg-[#747f8d]" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#2b2d31] rounded-full" />
          </div>
        );
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'idle':
        return 'Ausente';
      case 'dnd':
        return 'Não perturbe';
      case 'streaming':
        return 'Transmitindo';
      case 'offline':
      default:
        return 'Offline';
    }
  };

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const pulseAnimation = status === 'online' ? 'animate-pulse' : '';
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge 
          variant="outline" 
          className={cn(
            "p-0.5 font-normal border-2 border-background bg-[#2b2d31]",
            className
          )}
        >
          <div className={cn(sizeClasses[size], pulseAnimation)}>
            {getStatusImage(status)}
          </div>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{getStatusLabel(status)}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default StatusBadge;