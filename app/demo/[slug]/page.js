'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

// Demo configurations
const demoConfig = {
  'bella-italia': {
    name: 'Bella Italia',
    type: 'restaurant',
    tagline: 'FINE ITALIAN DINING',
    subtitle: 'En kulinarisk resa genom Italiens hjärta',
    since: '1995',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920',
    primaryColor: '#c9a227',
    darkColor: '#1a1a1a',
    menuItems: [
      { name: 'Pasta Carbonara', price: '185 kr', desc: 'Klassisk romersk pasta' },
      { name: 'Margherita Pizza', price: '165 kr', desc: 'San Marzano, mozzarella, basilika' },
      { name: 'Tiramisu', price: '95 kr', desc: 'Husets dessert' },
    ],
    navItems: ['MENY', 'OM OSS', 'RESERVERA'],
    lang: 'sv'
  },
  'anderssons-bilverkstad': {
    name: 'Anderssons Bilverkstad',
    type: 'workshop',
    tagline: 'KVALITET SEDAN 1985',
    subtitle: 'Personlig service för din bil',
    since: '1985',
    heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920',
    primaryColor: '#457b9d',
    darkColor: '#1d3557',
    services: [
      { name: 'Service', price: 'från 1 995 kr', desc: 'Olja, filter, kontroll' },
      { name: 'Däckbyte', price: '495 kr', desc: '4 hjul inkl. balansering' },
      { name: 'Besiktning', price: '450 kr', desc: 'Kontrollbesiktning' },
    ],
    navItems: ['TJÄNSTER', 'PRISER', 'KONTAKT'],
    lang: 'sv'
  },
  'bella-napoli': {
    name: 'Bella Napoli',
    type: 'restaurant',
    tagline: 'AUTENTISK ITALIENSK',
    subtitle: 'Smaken av Napoli i Oslo',
    since: '2005',
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920',
    primaryColor: '#c9a227',
    darkColor: '#1a1a1a',
    menuItems: [
      { name: 'Spaghetti Carbonara', price: '195 kr', desc: 'Klassisk romersk oppskrift' },
      { name: 'Pizza Diavola', price: '195 kr', desc: 'Spicy salami, chili' },
      { name: 'Tiramisu', price: '95 kr', desc: 'Hjemmelaget dessert' },
    ],
    navItems: ['MENY', 'OM OSS', 'BESTILL BORD'],
    lang: 'no'
  },
  'hansen-auto': {
    name: 'Hansen Auto',
    type: 'workshop',
    tagline: 'KVALITET SIDEN 1992',
    subtitle: 'Din lokale bilekspert i Oslo',
    since: '1992',
    heroImage: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920',
    primaryColor: '#457b9d',
    darkColor: '#1d3557',
    services: [
      { name: 'Service', price: 'fra 2 495 kr', desc: 'Olje, filter, kontroll' },
      { name: 'Dekkskift', price: '595 kr', desc: '4 hjul inkl. balansering' },
      { name: 'EU-kontroll', price: '550 kr', desc: 'Godkjent kontrollstasjon' },
    ],
    navItems: ['TJENESTER', 'PRISER', 'KONTAKT'],
    lang: 'no'
  },
  'trattoria-roma': {
    name: 'Trattoria Roma',
    type: 'restaurant',
    tagline: 'ÆGTE ITALIENSK',
    subtitle: 'En bid af Rom i København',
    since: '2008',
    heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920',
    primaryColor: '#c9a227',
    darkColor: '#1a1a1a',
    menuItems: [
      { name: 'Spaghetti Carbonara', price: '185 kr', desc: 'Klassisk romersk opskrift' },
      { name: 'Pizza Margherita', price: '165 kr', desc: 'San Marzano, mozzarella' },
      { name: 'Panna Cotta', price: '75 kr', desc: 'Med bær' },
    ],
    navItems: ['MENU', 'OM OS', 'RESERVER'],
    lang: 'dk'
  },
  'jensens-vaerksted': {
    name: 'Jensens Værksted',
    type: 'workshop',
    tagline: 'KVALITET SIDEN 1988',
    subtitle: 'Dit lokale autoværksted i København',
    since: '1988',
    heroImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920',
    primaryColor: '#457b9d',
    darkColor: '#1d3557',
    services: [
      { name: 'Service', price: 'fra 1 995 kr', desc: 'Olie, filter, kontrol' },
      { name: 'Dækskifte', price: '495 kr', desc: '4 hjul inkl. afbalancering' },
      { name: 'Syn', price: '448 kr', desc: 'Godkendt synshall' },
    ],
    navItems: ['YDELSER', 'PRISER', 'KONTAKT'],
    lang: 'dk'
  },
}

// Chat Widget Component
function ChatWidget({ config, slug }) {
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
        body: JSON.stringify({ slug, prompt: userMessage, sessionId })
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

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: config.primaryColor,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          {isOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          ) : (
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          )}
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '380px',
          height: '500px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 999,
        }}>
          {/* Header */}
          <div style={{
            background: config.primaryColor,
            color: '#fff',
            padding: '16px 20px',
          }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>💬 Chatta med oss</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', opacity: 0.9 }}>
              Vi svarar direkt!
            </p>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            background: '#f8f9fa',
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <div style={{
                  background: msg.role === 'user' ? config.primaryColor : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#333',
                  padding: '10px 14px',
                  borderRadius: '16px',
                  maxWidth: '80%',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: '#fff',
                  padding: '10px 14px',
                  borderRadius: '16px',
                  fontSize: '0.9rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}>
                  ⏳ Skriver...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} style={{
            padding: '12px 16px',
            borderTop: '1px solid #eee',
            background: '#fff',
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Skriv ett meddelande..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '10px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  background: config.primaryColor,
                  color: '#fff',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                Skicka
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

// Restaurant Page Component
function RestaurantPage({ config }) {
  return (
    <>
      {/* Top Bar */}
      <div style={{
        background: config.primaryColor,
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
        fontSize: '0.85rem',
        letterSpacing: '2px',
      }}>
        RESERVATIONER ÖPPNA - AUTHENTIC ITALIAN CUISINE - SINCE {config.since}
      </div>

      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        background: '#fff',
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          letterSpacing: '3px',
          color: '#1a1a1a',
          margin: 0,
        }}>
          {config.name.toUpperCase()}
        </h1>
        <div style={{ display: 'flex', gap: '40px' }}>
          {config.navItems.map((item) => (
            <a key={item} href="#" style={{
              color: '#1a1a1a',
              textDecoration: 'none',
              fontSize: '0.9rem',
              letterSpacing: '1px',
            }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        height: '80vh',
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
        <p style={{
          fontSize: '0.9rem',
          letterSpacing: '4px',
          color: config.primaryColor,
          marginBottom: '20px',
        }}>
          {config.tagline}
        </p>
        <h2 style={{
          fontSize: '5rem',
          fontWeight: '400',
          letterSpacing: '8px',
          margin: '0',
          lineHeight: '1.1',
          fontFamily: 'Georgia, serif',
        }}>
          {config.name.split(' ')[0].toUpperCase()}<br/>
          {config.name.split(' ').slice(1).join(' ').toUpperCase()}
        </h2>
        <p style={{
          fontSize: '1.2rem',
          fontStyle: 'italic',
          marginTop: '30px',
          opacity: 0.9,
        }}>
          {config.subtitle}
        </p>
        <button style={{
          marginTop: '40px',
          padding: '15px 40px',
          background: config.primaryColor,
          color: '#fff',
          border: 'none',
          fontSize: '0.9rem',
          letterSpacing: '2px',
          cursor: 'pointer',
        }}>
          SE VÅR MENY
        </button>
      </section>

      {/* Menu Preview */}
      <section style={{
        padding: '80px 60px',
        background: '#f8f5f0',
      }}>
        <h3 style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          letterSpacing: '3px',
          color: config.primaryColor,
          marginBottom: '10px',
        }}>
          UPPTÄCK
        </h3>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: '400',
          marginBottom: '60px',
          fontFamily: 'Georgia, serif',
        }}>
          Vår Meny
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {config.menuItems.map((item) => (
            <div key={item.name} style={{
              textAlign: 'center',
              padding: '30px',
              background: '#fff',
              borderRadius: '8px',
            }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{item.name}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>{item.desc}</p>
              <p style={{ color: config.primaryColor, fontWeight: '600' }}>{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// Workshop Page Component
function WorkshopPage({ config }) {
  return (
    <>
      {/* Top Bar */}
      <div style={{
        background: config.darkColor,
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
        fontSize: '0.85rem',
        letterSpacing: '2px',
      }}>
        ÖPPET MÅN-FRE 07-17 | LÖR 09-14 | BOKA TID IDAG
      </div>

      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        background: '#fff',
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: config.darkColor,
          margin: 0,
        }}>
          🔧 {config.name}
        </h1>
        <div style={{ display: 'flex', gap: '40px' }}>
          {config.navItems.map((item) => (
            <a key={item} href="#" style={{
              color: config.darkColor,
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        height: '70vh',
        background: `linear-gradient(rgba(29,53,87,0.85), rgba(29,53,87,0.85)), url(${config.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.9rem',
          letterSpacing: '4px',
          color: config.primaryColor,
          marginBottom: '20px',
        }}>
          {config.tagline}
        </p>
        <h2 style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          margin: '0',
          lineHeight: '1.2',
        }}>
          {config.name}
        </h2>
        <p style={{
          fontSize: '1.3rem',
          marginTop: '20px',
          opacity: 0.9,
        }}>
          {config.subtitle}
        </p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
          <button style={{
            padding: '15px 40px',
            background: config.primaryColor,
            color: '#fff',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '4px',
          }}>
            BOKA TID
          </button>
          <button style={{
            padding: '15px 40px',
            background: 'transparent',
            color: '#fff',
            border: '2px solid #fff',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '4px',
          }}>
            SE PRISER
          </button>
        </div>
      </section>

      {/* Services */}
      <section style={{
        padding: '80px 60px',
        background: '#f8f9fa',
      }}>
        <h3 style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          letterSpacing: '3px',
          color: config.primaryColor,
          marginBottom: '10px',
        }}>
          VÅRA TJÄNSTER
        </h3>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '60px',
          color: config.darkColor,
        }}>
          Vad kan vi hjälpa dig med?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {config.services.map((service) => (
            <div key={service.name} style={{
              padding: '40px 30px',
              background: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '10px', color: config.darkColor }}>
                {service.name}
              </h4>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>
                {service.desc}
              </p>
              <p style={{ color: config.primaryColor, fontWeight: '700', fontSize: '1.2rem' }}>
                {service.price}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// Main Page Component
export default function DemoPage() {
  const { slug } = useParams()
  const config = demoConfig[slug]

  if (!config) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Demo hittades inte</h1>
        <a href="/" style={{ color: '#4CAF50' }}>← Tillbaka till alla demos</a>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {config.type === 'restaurant' ? (
        <RestaurantPage config={config} />
      ) : (
        <WorkshopPage config={config} />
      )}
      <ChatWidget config={config} slug={slug} />
      
      {/* Footer */}
      <footer style={{
        background: config.type === 'restaurant' ? '#1a1a1a' : config.darkColor,
        color: '#fff',
        padding: '40px 60px',
        textAlign: 'center',
      }}>
        <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
          © 2026 {config.name}. Demo powered by{' '}
          <a href="https://eryai.tech" style={{ color: config.primaryColor }}>EryAI.tech</a>
        </p>
      </footer>
    </div>
  )
}
