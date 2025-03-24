
import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  children, 
  className,
  dot = false
}) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all";
  
  const variantStyles = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-rose-50 text-rose-700",
    info: "bg-blue-50 text-blue-700"
  };
  
  const dotColors = {
    default: "bg-secondary-foreground",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-blue-500"
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {dot && (
        <span 
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full", 
            dotColors[variant]
          )} 
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
