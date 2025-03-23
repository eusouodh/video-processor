import React, { useState } from 'react'

interface VideoProcessorProps {
  videoFile?: File
}

export const VideoProcessor: React.FC<VideoProcessorProps> = ({ videoFile }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleProcess = async () => {
    if (!videoFile) return

    setIsProcessing(true)
    setError(null)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('video', videoFile)

      const response = await fetch('/api/process-video', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erro ao processar o vídeo')
      }

      const data = await response.json()
      setProgress(100)
      
      // Aqui você pode adicionar a lógica para download ou visualização do vídeo processado
      console.log('Vídeo processado:', data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Processamento de Vídeo</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isProcessing && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Processando... {progress}%
          </p>
        </div>
      )}

      <button
        onClick={handleProcess}
        disabled={!videoFile || isProcessing}
        className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
          !videoFile || isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isProcessing ? 'Processando...' : 'Processar Vídeo'}
      </button>
    </div>
  )
} 