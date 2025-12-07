import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: boolean;
  external?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon = false, 
  external = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-full focus:outline-none";
  
  const variants = {
    primary: "bg-brand-white text-black hover:bg-brand-yellow hover:scale-105 active:scale-95 shadow-lg shadow-white/5",
    secondary: "bg-transparent border border-brand-white/20 text-brand-white hover:border-brand-white hover:bg-brand-white/5",
    ghost: "bg-transparent text-brand-gray hover:text-brand-white"
  };

  const widthClass = fullWidth ? "w-full" : "";
  const Icon = external ? ArrowUpRight : ArrowRight;

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
      {icon && <Icon className="w-4 h-4" />}
    </button>
  );
};