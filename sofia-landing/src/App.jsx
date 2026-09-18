import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problems } from './components/Problems';
import { Services } from './components/Services';
import { Mediation } from './components/Mediation';
import { Process } from './components/Process';
import { QuoteBand } from './components/QuoteBand';
import { About } from './components/About';
import { Resources } from './components/Resources';
import { Faq } from './components/Faq';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contacto">
        Ir al formulario de consulta
      </a>

      <Header />

      <main>
        <Hero />
        <Problems />
        <Services />
        <Mediation />
        <QuoteBand />
        <Process />
        <About />
        <Resources />
        <Faq />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
