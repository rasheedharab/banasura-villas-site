import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] font-sans font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-terracotta text-white hover:bg-terracotta-hover hover:text-white",
        whatsapp: "bg-leaf text-white hover:bg-leaf-hover hover:text-white",
        outline: "border-2 border-teak bg-transparent text-teak hover:bg-teak hover:text-butter",
        ghost: "text-teak hover:bg-teak/5",
      },
      size: {
        default: "px-[26px] py-4 text-base",
        md: "px-5 py-3 text-[15px]",
        sm: "px-[18px] py-2.5 text-[15px]",
        block: "w-full px-2.5 py-[15px] text-[15px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
