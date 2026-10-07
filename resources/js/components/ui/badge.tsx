import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-[#BFDBFE] bg-[#EFF6FF] text-[#1E3A8A]",
        primary:
          "border-transparent bg-[#2563EB] text-white",
        success:
          "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]",
        warning:
          "border-[#FDE68A] bg-[#FEF3C7] text-[#D97706]",
        danger:
          "border-[#FECACA] bg-[#FEE2E2] text-[#DC2626]",
        secondary:
          "border-[#E2E8F0] bg-[#F1F5F9] text-[#475569]",
        outline:
          "border-[#CBD5E1] bg-transparent text-[#0F172A]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
