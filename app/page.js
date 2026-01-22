import Link from 'next/link'

const demos = [
  {
    country: '🇸🇪',
    countryName: 'Sverige',
    businesses: [
      { slug: 'bella-italia', name: 'Bella Italia', type: '🍕', ai: 'Sofia' },
      { slug: 'anderssons-bilverkstad', name: 'Anderssons Bilverkstad', type: '🔧', ai: 'Marcus' },
    ]
  },
  {
    country: '🇳🇴',
    countryName: 'Norge',
    businesses: [
      { slug: 'bella-napoli', name: 'Bella Napoli', type: '🍕', ai: 'Giulia' },
      { slug: 'hansen-auto', name: 'Hansen Auto', type: '🔧', ai: 'Erik' },
    ]
  },
  {
    country: '🇩🇰',
    countryName: 'Danmark',
    businesses: [
      { slug: 'trattoria-roma', name: 'Trattoria Roma', type: '🍕', ai: 'Marco' },
      { slug: 'jensens-vaerksted', name: 'Jensens Værksted', type: '🔧', ai: 'Lars' },
    ]
  },
]

export default function Home() {
  return (
    <main style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          🤖 EryAI Demos
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem' }}>
          Testa vår AI-kundtjänst för restauranger och bilverkstäder
        </p>
      </div>

      {demos.map((region) => (
        <div key={region.country} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '2rem' }}>{region.country}</span>
            {region.countryName}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {region.businesses.map((biz) => (
              <Link 
                key={biz.slug} 
                href={`/demo/${biz.slug}`}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'transform 0.2s, background 0.2s',
                  cursor: 'pointer',
                  display: 'block',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                  {biz.type}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
                  {biz.name}
                </h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                  AI-assistent: {biz.ai}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '60px', color: '#666' }}>
        <p>Powered by <a href="https://eryai.tech" style={{ color: '#4CAF50' }}>EryAI.tech</a></p>
      </div>
    </main>
  )
}
