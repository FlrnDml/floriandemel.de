import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Impressum: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Impressum | Florian Demel</title>
        <meta name="description" content="Impressum - Rechtliche Informationen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header className="section" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <Link 
            href="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              marginBottom: '2rem', 
              fontSize: '1rem',
              color: 'var(--accent-teal)'
            }}
          >
            &larr; Back to Home
          </Link>
          <h1>Impressum</h1>
        </header>

        <section className="section">
          <div className="card">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>Florian Demel</p>
            <p><strong>Hinweis:</strong> Diese Website wird von einer angestellten Privatperson betrieben. Da ich derzeit nicht unternehmerisch tätig bin, gilt für mich keine Pflicht zur Angabe einer vollständigen Anschrift.</p>
            
            <h3>Kontakt</h3>
            <p>E-Mail: kontakt@floriandemel.de</p>

            <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
            <p>Florian Demel</p>

            <h2>Haftung für Inhalte</h2>
            <p>Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
            <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.</p>

            <h2>Haftung für Links</h2>
            <p>Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
            <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.</p>

            <h2>Urheberrecht</h2>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
            <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.</p>
          </div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Florian Demel. All rights reserved.</p>
          <p className="photo-credit">
            Background photo: <a href="https://www.pexels.com/de-de/foto/foto-von-berg-und-baumen-1139429/" target="_blank" rel="noopener noreferrer">https://www.pexels.com/de-de/foto/foto-von-berg-und-baumen-1139429/</a>
          </p>
          <p>
            <Link href="/" style={{ marginRight: '1rem', color: 'var(--text-secondary)' }}>Home</Link>
            <Link href="/impressum" style={{ marginRight: '1rem', color: 'var(--text-secondary)' }}>Impressum</Link>
            <Link href="/datenschutz" style={{ color: 'var(--text-secondary)' }}>Datenschutz</Link>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Impressum
