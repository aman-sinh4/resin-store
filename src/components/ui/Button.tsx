'use client';

import * as React from "react";
import { Loader2 } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ButtonProps specific to our component
interface ButtonCustomProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

// Combine with Framer Motion props
// Omit ref from here as it is handled by forwardRef
type ButtonProps = ButtonCustomProps & Omit<HTMLMotionProps<"button">, "children"> & { children?: React.ReactNode };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
    
    const variants = {
      primary: "bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-900 shadow-md hover:shadow-lg",
      secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-200",
      outline: "border border-zinc-200 bg-transparent hover:bg-zinc-50 text-zinc-900 focus:ring-zinc-200",
      ghost: "bg-transparent hover:bg-zinc-50 text-zinc-900",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(baseStyles, variants[variant || "primary"], sizes[size || "md"], className)}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
