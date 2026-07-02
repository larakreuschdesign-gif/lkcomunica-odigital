import { useState, useRef, useEffect } from 'react'
import { useAI } from '../hooks/useAI'
import Button from './Button'
import Spinner from './Spinner'

export default function AIChat({ reportData, isOpen = false, onClose = null }) {
  const { askQuestion, loading } = useAI()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! Sou sua assistente IA. Você pode fazer perguntas sobre seu relatório de desempenho. Alguns exemplos:\n\n• "Por que o alcance caiu?"\n• "Quais conteúdos devo repetir?"\n• "O que devo testar?"\n• "Quais horários tiveram melhor desempenho?"\n\nComo posso ajudar?'
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    // Adicionar mensagem do usuário
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      // Chamar IA
      const response = await askQuestion(input, reportData)

      // Adicionar resposta da IA
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Desculpe, houve um erro ao processar sua pergunta: ${error.message}`
      }])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-2xl h-96 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-lg font-bold">✨ Perguntar para IA</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-pink-600 rounded-full p-1"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-pink-500 text-white rounded-br-none'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-3">
                <Spinner size="sm" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="border-t bg-white p-4 rounded-b-lg flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            disabled={loading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!input.trim() || loading}
          >
            {loading ? '...' : '→'}
          </Button>
        </form>
      </div>
    </div>
  )
}
