import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        className={cn(sizeClasses[size], "text-primary")}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="8" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="8" y="12" width="3" height="3" fill="currentColor" />
        <rect x="13" y="12" width="3" height="3" fill="currentColor" />
        <rect x="18" y="12" width="3" height="3" fill="currentColor" />
        <rect x="8" y="17" width="3" height="3" fill="currentColor" />
        <rect x="13" y="17" width="3" height="3" fill="currentColor" />
        <rect x="18" y="17" width="3" height="3" fill="currentColor" />
        <rect x="8" y="22" width="3" height="3" fill="currentColor" />
        <rect x="13" y="22" width="3" height="3" fill="currentColor" />
        <rect x="18" y="22" width="3" height="3" fill="currentColor" />
        <rect x="12" y="4" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
      <span
        className={cn(
          "font-semibold text-foreground",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-xl",
        )}
      >
        Smart Condominium
      </span>
    </div>
  )
}
