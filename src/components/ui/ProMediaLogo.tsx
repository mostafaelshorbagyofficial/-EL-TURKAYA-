import Image from "next/image";

interface ProMediaLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { width: 108, height: 82, imgClass: "w-[96px] sm:w-[108px]", padding: "px-3 py-2" },
  md: { width: 148, height: 112, imgClass: "w-[132px] sm:w-[148px]", padding: "px-4 py-3" },
  lg: { width: 184, height: 139, imgClass: "w-[160px] sm:w-[184px]", padding: "px-5 py-3.5" },
};

/**
 * Enforces the mandatory brand rule:
 * The ProMedia logo MUST ALWAYS be rendered on a pure white (#FFFFFF) background.
 */
export function ProMediaLogo({ size = "md", className = "" }: ProMediaLogoProps) {
  const config = SIZE_MAP[size];

  return (
    <div
      className={`promedia-logo-plate inline-flex items-center justify-center bg-[#FFFFFF] border border-[#090C16]/10 ${config.padding} ${className}`}
    >
      <Image
        src="/assets/promedia-logo.png"
        alt="ProMedia Official Logo"
        width={config.width}
        height={config.height}
        className={`h-auto ${config.imgClass} object-contain`}
        sizes="(max-width: 640px) 120px, 184px"
      />
    </div>
  );
}
