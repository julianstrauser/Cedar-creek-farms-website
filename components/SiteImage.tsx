import Image from "next/image";

type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

function isSvg(src: string) {
  return src.endsWith(".svg") || src.includes(".svg?");
}

function isSupabaseStorageUrl(src: string) {
  try {
    return new URL(src).hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

/** Use unoptimized for SVGs and remote URLs outside Supabase storage (e.g. admin previews). */
function shouldUnoptimize(src: string) {
  if (isSvg(src)) return true;
  if (src.startsWith("http") && !isSupabaseStorageUrl(src)) return true;
  return false;
}

export default function SiteImage({
  src,
  alt,
  className,
  width = 800,
  height = 500,
  sizes,
  priority = false,
}: SiteImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized={shouldUnoptimize(src)}
    />
  );
}
