import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Rendered while loading and if the file does not exist yet (e.g. before real screenshots are added). */
  fallback: ReactNode;
  width?: number;
  height?: number;
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
  /** `contain` shows the whole image (lightbox); `cover` fills the box (cards, covers). */
  fit?: 'cover' | 'contain';
}

/**
 * Image with graceful placeholder: drop the real file at `src` and it appears automatically —
 * until then a designed fallback is shown instead of a broken image.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  fallback,
  width,
  height,
  sizes,
  srcSet,
  priority = false,
  fit = 'cover',
}: SmartImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {status !== 'loaded' && <div className="absolute inset-0">{fallback}</div>}
      {status !== 'error' && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'relative h-full w-full transition-opacity duration-700',
            fit === 'contain' ? 'object-contain' : 'object-cover',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
