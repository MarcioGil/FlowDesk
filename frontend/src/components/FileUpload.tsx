import { useState, useRef } from 'react';
import { Upload, X, File } from 'lucide-react';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
  maxSize?: number; // em MB
}

export function FileUpload({ onUpload, isUploading = false, maxSize = 10 }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Validar tipo
    if (file.type !== 'application/pdf') {
      setError('Apenas arquivos PDF são permitidos');
      return false;
    }

    // Validar tamanho
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSize) {
      setError(`O arquivo deve ter no máximo ${maxSize}MB`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = async (file: File) => {
    if (validateFile(file)) {
      try {
        await onUpload(file);
      } catch (err: any) {
        setError(err.message || 'Erro ao fazer upload do arquivo');
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleChange}
          disabled={isUploading}
        />

        <div className="flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-gray-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              {isUploading ? 'Enviando arquivo...' : 'Clique ou arraste um arquivo PDF'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Tamanho máximo: {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
          <X className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface AttachmentListProps {
  attachments: Array<{ filename: string; originalname?: string }>;
  onDownload: (filename: string) => void;
  onDelete?: (filename: string) => void;
  canDelete?: boolean;
}

export function AttachmentList({
  attachments,
  onDownload,
  onDelete,
  canDelete = false,
}: AttachmentListProps) {
  if (attachments.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        Nenhum anexo neste ticket
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {attachments.map((attachment) => (
        <div
          key={attachment.filename}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <File className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 truncate">
              {attachment.originalname || attachment.filename}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownload(attachment.filename)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Baixar
            </button>
            {canDelete && onDelete && (
              <>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => onDelete(attachment.filename)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remover
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
