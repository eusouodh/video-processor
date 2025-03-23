import React, { useState } from 'react'
import { GoogleLogin } from './components/Auth/GoogleLogin'
import { VideoUploader } from './components/Video/VideoUploader'
import { VideoProcessor } from './components/Video/VideoProcessor'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth-url')
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Erro ao obter URL de autenticação:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Processador de Vídeos
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!isAuthenticated ? (
          <GoogleLogin onLogin={handleLogin} isLoading={isLoading} />
        ) : (
          <div className="space-y-6">
            <VideoUploader />
            <VideoProcessor />
          </div>
        )}
      </main>
    </div>
  )
}

export default App