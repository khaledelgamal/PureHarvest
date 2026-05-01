import { useCallback, useRef, useState } from 'react';
import type { AvatarEditorRef } from 'react-avatar-editor';

type Params = {
  outputWidth: number;
  outputHeight: number;
  maxFileSizeMB: number;
  onCropComplete: (file: File) => Promise<void>;
};

const canvasToFile = (
  canvas: HTMLCanvasElement,
  fileName: string,
  mimeType = 'image/jpeg',
  quality = 0.92,
): Promise<File> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) return reject(new Error('Canvas export failed'));
        resolve(new File([blob], fileName, { type: mimeType }));
      },
      mimeType,
      quality,
    );
  });

const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];

export function useImageCropper({
  outputWidth,
  outputHeight,
  maxFileSizeMB,
  onCropComplete,
}: Params) {
  const editorRef = useRef<AvatarEditorRef>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const resetTransforms = () => {
    setScale(1);
    setRotate(0);
  };

  /** Shared validation + state update for any incoming file */
  const processFile = useCallback(
    (selected: File) => {
      setError(null);

      if (!ACCEPTED_MIME_TYPES.includes(selected.type)) {
        setError(
          `Invalid file type "${selected.type || 'unknown'}". Only JPG, PNG, WEBP, AVIF, GIF are allowed.`,
        );
        return;
      }

      const sizeMB = selected.size / (1024 * 1024);
      if (sizeMB > maxFileSizeMB) {
        setError(`File too large (${sizeMB.toFixed(2)}MB > ${maxFileSizeMB}MB)`);
        return;
      }

      setFile(selected);
      resetTransforms();
    },
    [maxFileSizeMB],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
    e.target.value = '';
  };

  /* ── Drag & Drop handlers ─────────────────────────────── */

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Required so the browser treats the zone as a valid drop target
    e.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Only reset when leaving the drop zone itself, not a child element
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) processFile(droppedFile);
    },
    [processFile],
  );

  /* ── Other handlers (unchanged) ────────────────────────── */

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale(prev => {
      const next = prev + (e.deltaY > 0 ? -0.1 : 0.1);
      return Math.min(3, Math.max(1, parseFloat(next.toFixed(2))));
    });
  }, []);

  const rotateLeft = () => setRotate(r => r - 90);
  const rotateRight = () => setRotate(r => r + 90);

  const handleSave = useCallback(async () => {
    if (!editorRef.current || !file) return;

    setLoading(true);
    setError(null);

    try {
      const canvas = editorRef.current.getImageScaledToCanvas();

      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = outputWidth;
      outputCanvas.height = outputHeight;

      const ctx = outputCanvas.getContext('2d');
      if (!ctx) throw new Error('No canvas context');

      ctx.drawImage(canvas, 0, 0, outputWidth, outputHeight);

      const croppedFile = await canvasToFile(outputCanvas, `cropped_${file.name}`);
      await onCropComplete(croppedFile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, [file, outputWidth, outputHeight, onCropComplete]);

  return {
    // state
    file,
    scale,
    rotate,
    error,
    loading,
    isDragging,

    // refs
    editorRef,
    fileInputRef,

    // actions
    setScale,
    handleFileSelect,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleWheel,
    rotateLeft,
    rotateRight,
    handleSave,
  };
}
