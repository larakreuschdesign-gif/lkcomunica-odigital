import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

export default function Dropzone({
  onFilesAccepted = null,
  acceptedFormats = ['image/png', 'image/jpeg', 'application/pdf'],
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
}) {
  const onDrop = useCallback(acceptedFiles => {
    if (onFilesAccepted) {
      onFilesAccepted(acceptedFiles)
    }
  }, [onFilesAccepted])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats.reduce((acc, format) => {
      acc[format] = []
      return acc
    }, {}),
    maxSize,
    multiple,
  })

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-colors duration-200
        ${isDragActive
          ? 'border-pink-500 bg-pink-50'
          : 'border-gray-300 bg-gray-50 hover:border-pink-300'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
        </svg>
        {isDragActive ? (
          <div>
            <p className="text-pink-600 font-semibold">Solte os arquivos aqui</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-900 font-semibold">
              Arraste arquivos aqui ou clique para selecionar
            </p>
            <p className="text-gray-500 text-sm mt-1">
              PNG, JPG, PDF, Excel, CSV
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
