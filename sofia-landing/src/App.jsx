import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problems } from './components/Problems';
import { Projects } from './components/Projects';
import { Mediation } from './components/Mediation';
import { Process } from './components/Process';
import { About } from './components/About';
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
        <Mediation />
        <Projects />
        <Process />
        <About />
        <Faq />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
