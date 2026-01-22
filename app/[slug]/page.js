'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const demoConfig = {
  'bella-italia': { name: 'Bella Italia', type: '🍕', color: '#e63946' },
  'anderssons-bilverkstad': { name: 'Anderssons Bilverkstad', type: '🔧', color: '#457b9d' },
  'bella-napoli': { name: 'Bella Napoli', type: '🍕', color: '#e63946' },
  'hansen-auto': { name: 'Hansen Auto', type: '🔧', color: '#457b9d' },
  'trattoria-roma': { name: 'Trattoria Roma', type: '🍕', color: '#e63946' },
  'jensens-vaerksted': { name: 'Jensens Værksted', type: '🔧', color: '#457b9d' },
}

export default function DemoPage() {
  const { slug } = useParams()
  const config = demoConfig[slug]
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Hämta greeting vid start
  useEffect(() => {
    if (config) {
      fetchGreeting()
    }
  }, [slug])

  const fetchGreeting = async () => {
    try {
      const res = await fetch('https://eryai-engine.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, prompt: '__greeting__' })
      })
      const data = await res.json()
      if (data.greeting) {
        setMessages([{ role: 'assistant', content: data.greeting }])
      }
      if (data.sessionId) {
        setSessionId(data.sessionId)
      }
    } catch (err) {
      console.error('Greeting error:', err)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const res = await fetch('https://eryai-engine.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          slug, 
          prompt: userMessage,
          sessionId 
        })
      })
      const data = await res.json()
      
      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }
      if (data.sessionId) {
        setSessionId(data.sessionId)
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ett fel uppstod. Försök igen.' }])
    } finally {
      setLoading(false)
    }
  }

  if (!config) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Demo hittades inte</h1>
        <Link href="/" style={{ color: '#4CAF50' }}>← Tillbaka</Link>
      </div>
    )
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ 
        background: config.color, 
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link href="/" style={{ color: '#fff', opacity: 0.8 }}>← Alla demos</Link>
        <h1 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {config.type} {config.name}
        </h1>
        <div style={{ width: '80px' }}></div>
      </header>

      {/* Chat area */}
      <div style={{ 
        flex: 1, 
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        width: '100%',
        overflowY: 'auto'
      }}>
        {messages.map((msg, i) => (
          <div 
            key={i} 
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '12px'
            }}
          >
            <div style={{
              background: msg.role === 'user' ? config.color : 'rgba(255,255,255,0.1)',
              padding: '12px 16px',
              borderRadius: '18px',
              maxWidth: '80%',
              lineHeight: '1.4'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '18px' }}>
              ⏳ Skriver...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} style={{ 
        padding: '15px 20px', 
        background: 'rgba(0,0,0,0.3)',
        maxWidth: '600px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Skriv ett meddelande..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '24px',
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button 
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: '24px',
              border: 'none',
              background: config.color,
              color: '#fff',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            Skicka
          </button>
        </div>
      </form>
    </main>
  )
}
