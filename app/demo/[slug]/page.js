'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const demoConfig = {
  'bella-italia': { name: 'Bella Italia', type: 'restaurant', color: '#c9a227', tagline: 'FINE ITALIAN DINING', since: '1995', heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920' },
  'anderssons-bilverkstad': { name: 'Anderssons Bilverkstad', type: 'workshop', color: '#457b9d', tagline: 'KVALITET SEDAN 1985', since: '1985', heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920' },
  'bella-napoli': { name: 'Bella Napoli', type: 'restaurant', color: '#c9a227', tagline: 'AUTENTISK ITALIENSK', since: '2005', heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920' },
  'hansen-auto': { name: 'Hansen Auto', type: 'workshop', color: '#457b9d', tagline: 'KVALITET SIDEN 1992', since: '1992', heroImage: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920' },
  'trattoria-roma': { name: 'Trattoria Roma', type: 'restaurant', color: '#c9a227', tagline: 'ÆGTE ITALIENSK', since: '2008', heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920' },
  'jensens-vaerksted': { name: 'Jensens Værksted', type: 'workshop', color: '#457b9d', tagline: 'KVALITET SIDEN 1988', since: '1988', heroImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920' },
}

export default function DemoPage() {
  const { slug } = useParams()
  const config = demoConfig[slug]
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      fetchGreeting()
    }
  }, [isOpen])

  const fetchGreeting = async () => {
    try {
      const res = await fetch('https://eryai-engine.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, prompt: '__greeting__' })
      })
      const data = await res.json()
      if (data.greeting) setMessages([{ role: 'assistant', content: data.greeting }])
      if (data.sessionId) setSessionId(data.sessionId)
    } catch (err) { console.error(err) }
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
        body: JSON.stringify({ slug, prompt: userMessage, sessionId })
      })
      const data = await res.json()
      if (data.response) setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      if (data.sessionId) setSessionId(data.sessionId)
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ett fel uppstod.' }])
    } finally { setLoading(false) }
  }

  if (!config) return <div style={{ padding: '40px', textAlign: 'center', color: '#fff', background: '#1a1a1a', minHeight: '100vh' }}><h1>Demo hittades inte</h1><Link href="/" style={{ color: '#4CAF50' }}>← Tillbaka</Link></div>

  const isRestaurant = config.type === 'restaurant'

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', background: '#1a1a1a', minHeight: '100vh' }}>
      {/* Top Bar */}
      <div style={{ background: isRestaurant ? config.color : '#1d3557', color: '#fff', textAlign: 'center', padding: '10px', fontSize: '0.85rem', letterSpacing: '2px' }}>
        {isRestaurant ? `RESERVATIONER ÖPPNA - SINCE ${config.since}` : 'ÖPPET MÅN-FRE 07-17 | BOKA TID IDAG'}
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', background: '#fff' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: isRestaurant ? 400 : 700, letterSpacing: isRestaurant ? '3px' : '0', color: '#1a1a1a', margin: 0 }}>
          {isRestaurant ? config.name.toUpperCase() : `🔧 ${config.name}`}
        </h1>
        <Link href="/" style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: '0.9rem' }}>← Alla demos</Link>
      </nav>

      {/* Hero */}
      <section style={{
        height: '70vh',
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${config.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.9rem', letterSpacing: '4px', color: config.color, marginBottom: '20px' }}>{config.tagline}</p>
        <h2 style={{ fontSize: isRestaurant ? '4rem' : '3rem', fontWeight: isRestaurant ? 400 : 700, margin: 0, fontFamily: isRestaurant ? 'Georgia, serif' : 'inherit' }}>{config.name}</h2>
      </section>

      {/* Chat Button */}
      <button onClick={() => setIsOpen(!isOpen)} style={{
        position: 'fixed', bottom: '24px', right: '24px', width: '60px', height: '60px',
        borderRadius: '50%', background: config.color, border: 'none', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          {isOpen ? <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/> : <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>}
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{ position: 'fixed', bottom: '100px', right: '24px', width: '380px', height: '500px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 999 }}>
          <div style={{ background: config.color, color: '#fff', padding: '16px 20px' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>💬 Chatta med oss</h3>
          </div>
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#f8f9fa' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
                <div style={{ background: msg.role === 'user' ? config.color : '#fff', color: msg.role === 'user' ? '#fff' : '#333', padding: '10px 14px', borderRadius: '16px', maxWidth: '80%', fontSize: '0.9rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>{msg.content}</div>
              </div>
            ))}
            {loading && <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '16px', fontSize: '0.9rem', display: 'inline-block' }}>⏳ Skriver...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} style={{ padding: '12px 16px', borderTop: '1px solid #eee', background: '#fff', display: 'flex', gap: '8px' }}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Skriv ett meddelande..." style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '0.9rem', outline: 'none' }} />
            <button type="submit" disabled={loading} style={{ padding: '10px 18px', borderRadius: '20px', border: 'none', background: config.color, color: '#fff', cursor: 'pointer' }}>Skicka</button>
          </form>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: '#1a1a1a', color: '#fff', padding: '40px 60px', textAlign: 'center' }}>
        <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Demo powered by <a href="https://eryai.tech" style={{ color: config.color }}>EryAI.tech</a></p>
      </footer>
    </div>
  )
}
