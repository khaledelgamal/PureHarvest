import React, { useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { ImagePlus, UploadCloud } from 'lucide-react';
import { Button } from '@/components/Buttons/Button/Button';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import { useImageCropper } from './hooks/useImageCropper';

export interface ImageCropModalProps {
  outputWidth?: number;
  outputHeight?: number;
  maxFileSizeMB?: number;
  onCropComplete: (croppedFile: File) => Promise<void>;
  onClose: () => void;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({
  outputWidth = 300,
  outputHeight = 300,
  maxFileSizeMB = 5,
  onCropComplete,
  onClose,
}) => {
  const {
    file: selectedFile,
    scale,
    rotate,
    error,
    loading,
    isDragging,
    editorRef,
    fileInputRef,
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
  } = useImageCropper({
    outputWidth,
    outputHeight,
    maxFileSizeMB,
    onCropComplete,
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl p-6 w-[420px] max-w-[95vw] flex flex-col items-center gap-5 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between">
          <h2 className="text-gray-800 text-lg font-bold">Crop Your Image</h2>
          <CloseButton onClick={onClose} disabled={loading} />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
            Max size: {maxFileSizeMB} MB
          </span>
        </div>

        {!selectedFile ? (
          <div
            className={[
              'w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl py-14 cursor-pointer transition-colors',
              isDragging
                ? 'border-primary bg-primary/10 scale-[1.02]'
                : 'border-gray-200 hover:border-primary hover:bg-primary/5',
            ].join(' ')}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadCloud
              className={`w-10 h-10 transition-colors ${isDragging ? 'text-primary' : 'text-gray-300'}`}
            />
            <p
              className={`text-sm text-center ${isDragging ? 'text-primary font-medium' : 'text-gray-400'}`}
            >
              {isDragging ? 'Drop your image here' : 'Click to browse or drag & drop your image'}
            </p>
            <span className="text-gray-300 text-xs">PNG, JPG, WEBP up to {maxFileSizeMB} MB</span>
          </div>
        ) : (
          <>
            <div className="rounded-full overflow-hidden ring-2 ring-primary" onWheel={handleWheel}>
              <AvatarEditor
                ref={editorRef}
                image={selectedFile}
                width={280}
                height={280}
                border={30}
                borderRadius={140}
                color={[0, 0, 0, 0.55]}
                scale={scale}
                rotate={rotate}
                style={{ display: 'block', cursor: 'grab' }}
              />
            </div>

            <div className="w-full flex flex-col gap-1.5">
              <label className="text-gray-500 text-sm">
                🔍 Zoom: <strong className="text-gray-700">{scale.toFixed(2)}×</strong>
              </label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={scale}
                onChange={e => setScale(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={rotateLeft} disabled={loading}>
                ↺ Left
              </Button>
              <span className="text-gray-500 text-sm w-10 text-center">{rotate}°</span>
              <Button variant="ghost" size="sm" onClick={rotateRight} disabled={loading}>
                Right ↻
              </Button>
            </div>
          </>
        )}

        {error && <p className="text-red-500 text-sm text-center">⚠️ {error}</p>}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        <div className="w-full flex gap-3 mt-1">
          <Button
            variant="border"
            size="md"
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 flex-1"
          >
            <ImagePlus className="w-4 h-4" />
            {selectedFile ? 'Change' : 'Browse'}
          </Button>

          <Button
            variant="fill"
            size="md"
            onClick={handleSave}
            disabled={!selectedFile || loading}
            className="flex-2"
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
