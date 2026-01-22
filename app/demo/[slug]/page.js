'use client'

import Link from 'next/link'

const demos = [
  {
    country: '🇸🇪',
    countryName: 'Sverige',
    businesses: [
      { slug: 'bella-italia', name: 'Bella Italia', type: '🍕', typeLabel: 'Restaurang', ai: 'Sofia' },
      { slug: 'anderssons-bilverkstad', name: 'Anderssons Bilverkstad', type: '🔧', typeLabel: 'Verkstad', ai: 'Marcus' },
    ]
  },
  {
    country: '🇳🇴',
    countryName: 'Norge',
    businesses: [
      { slug: 'bella-napoli', name: 'Bella Napoli', type: '🍕', typeLabel: 'Restaurant', ai: 'Giulia' },
      { slug: 'hansen-auto', name: 'Hansen Auto', type: '🔧', typeLabel: 'Verksted', ai: 'Erik' },
    ]
  },
  {
    country: '🇩🇰',
    countryName: 'Danmark',
    businesses: [
      { slug: 'trattoria-roma', name: 'Trattoria Roma', type: '🍕', typeLabel: 'Restaurant', ai: 'Marco' },
      { slug: 'jensens-vaerksted', name: 'Jensens Værksted', type: '🔧', typeLabel: 'Værksted', ai: 'Lars' },
    ]
  },
]

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f1a 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <a href="https://eryai.tech" style={{
          color: '#fff',
          fontSize: '1.5rem',
          fontWeight: '700',
          textDecoration: 'none',
        }}>
          ery<span style={{ color: '#4CAF50' }}>.ai</span>
        </a>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="https://eryai.tech#problem" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Problem</a>
          <a href="https://eryai.tech#solution" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Løsning</a>
          <a href="https://eryai.tech#waitlist" style={{ 
            background: '#4CAF50', 
            color: '#fff', 
            padding: '10px 20px', 
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500',
          }}>
            Kom i gang
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ padding: '80px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{
            color: '#4CAF50',
            fontSize: '0.9rem',
            letterSpacing: '2px',
            marginBottom: '20px',
            textTransform: 'uppercase',
          }}>
            Live Demos
          </p>
          <h1 style={{
            color: '#fff',
            fontSize: '3.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '20px',
          }}>
            Se Ery AI i aksjon
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Testa våra AI-assistenter för restauranger och bilverkstäder. 
            Klicka på chattbubblan för att starta en konversation.
          </p>
        </div>

        {/* Demo Cards by Region */}
        {demos.map((region) => (
          <div key={region.country} style={{ marginBottom: '60px' }}>
            <h2 style={{
              color: '#fff',
              fontSize: '1.5rem',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '2rem' }}>{region.country}</span>
              {region.countryName}
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {region.businesses.map((biz) => (
                <Link
                  key={biz.slug}
                  href={`/demo/${biz.slug}`}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '32px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'block',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.borderColor = '#4CAF50'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '16px',
                  }}>
                    <span style={{
                      fontSize: '2.5rem',
                      width: '60px',
                      height: '60px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {biz.type}
                    </span>
                    <div>
                      <h3 style={{
                        color: '#fff',
                        fontSize: '1.3rem',
                        margin: '0 0 4px 0',
                        fontWeight: '600',
                      }}>
                        {biz.name}
                      </h3>
                      <p style={{
                        color: 'rgba(255,255,255,0.5)',
                        margin: 0,
                        fontSize: '0.9rem',
                      }}>
                        {biz.typeLabel}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <p style={{
                      color: '#4CAF50',
                      margin: 0,
                      fontSize: '0.9rem',
                    }}>
                      💬 AI-assistent: <strong>{biz.ai}</strong>
                    </p>
                    <span style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '1.2rem',
                    }}>
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div style={{
          background: 'rgba(76, 175, 80, 0.1)',
          border: '1px solid rgba(76, 175, 80, 0.3)',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          marginTop: '60px',
        }}>
          <h2 style={{
            color: '#fff',
            fontSize: '2rem',
            marginBottom: '16px',
          }}>
            Klar til å kutte støyen?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '24px',
          }}>
            Book en 20 min discovery call – vi viser deg hvordan Ery AI passer ditt team.
          </p>
          <a href="https://eryai.tech#waitlist" style={{
            background: '#4CAF50',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'inline-block',
          }}>
            Book discovery call
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '40px 60px',
        textAlign: 'center',
      }}>
        <a href="https://eryai.tech" style={{
          color: '#fff',
          fontSize: '1.2rem',
          fontWeight: '700',
          textDecoration: 'none',
        }}>
          ery<span style={{ color: '#4CAF50' }}>.ai</span>
        </a>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          marginTop: '16px',
          fontSize: '0.85rem',
        }}>
          © 2026 Ery AI · Bygget for nordiske SMB
        </p>
      </footer>
    </div>
  )
}
