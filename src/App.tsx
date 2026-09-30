import { useState, useMemo, useRef, useEffect } from 'react'
import { Icon as IconifyIcon } from '@iconify/react'
import {
  Clock,
  ChevronDown,
  FileText,
  House,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Search,
  X,
  Check,
  ArrowRight,
  Sparkles,
  Activity,
  Droplets,
  Pill,
  FlaskConical,
  ExternalLink,
  Menu,
  CheckCircle2,
  FileCheck,
  HelpCircle,
} from 'lucide-react'

const whatsappUrl =
  'https://wa.me/5493416824801?text=Hola%20Laboratorio%20Valero%2C%20quiero%20consultar%20por%20mi%20orden%20m%C3%A9dica.'

const whatsappDomicilioUrl =
  'https://wa.me/5493416824801?text=Hola%20Laboratorio%20Valero%2C%20quiero%20solicitar%20un%20turno%20para%20extracci%C3%B3n%20a%20domicilio.'

const socialWorksData = [
  { name: 'AMR Salud', type: 'obra-social', popular: true },
  { name: 'AMUR', type: 'obra-social', popular: false },
  { name: 'Avalian', type: 'prepaga', popular: true },
  { name: 'Caja Forense', type: 'obra-social', popular: false },
  { name: 'Cs. Económicas', type: 'obra-social', popular: false },
  { name: 'Dasuten', type: 'obra-social', popular: false },
  { name: 'Demi Salud', type: 'obra-social', popular: false },
  { name: 'Energía Salud', type: 'obra-social', popular: false },
  { name: 'Ensalud', type: 'obra-social', popular: false },
  { name: 'Federada Salud', type: 'prepaga', popular: true },
  { name: 'IAPOS', type: 'obra-social', popular: true },
  { name: 'Jerárquicos Salud', type: 'prepaga', popular: true },
  { name: 'Luis Pasteur', type: 'prepaga', popular: false },
  { name: 'Medifé', type: 'prepaga', popular: true },
  { name: 'Mosaistas', type: 'obra-social', popular: false },
  { name: 'Mutual del Clero', type: 'obra-social', popular: false },
  { name: 'Mutualyf', type: 'obra-social', popular: false },
  { name: 'Opdea', type: 'obra-social', popular: false },
  { name: 'OSDE', type: 'prepaga', popular: true },
  { name: 'OSPAC', type: 'obra-social', popular: false },
  { name: 'OSPIDA', type: 'obra-social', popular: false },
  { name: 'OSPTA', type: 'obra-social', popular: false },
  { name: 'Poder Judicial', type: 'obra-social', popular: false },
  { name: 'Prevención Salud', type: 'prepaga', popular: true },
  { name: 'Salud Rosario (Británica Salud)', type: 'prepaga', popular: false },
  { name: 'Sancor Salud', type: 'prepaga', popular: true },
  { name: 'Swiss Medical', type: 'prepaga', popular: true },
  { name: 'UNR', type: 'obra-social', popular: false },
  { name: 'William Hope', type: 'prepaga', popular: false },
]

const prepGuides = [
  {
    id: 'sangre',
    category: 'rutina',
    title: 'Sangre de rutina',
    badge: '8 horas de ayuno',
    icon: Droplets,
    summary: 'Concurrir con 8 horas de ayuno estricto. Agua solamente si lo necesitás.',
    details: [
      'No consumir chicles, caramelos, café, té ni mate durante el período de ayuno.',
      'Evitar comidas copiosas o con alto contenido de grasas la noche anterior.',
      'Bebés y lactantes: ayuno mínimo estipulado de 3 horas.',
      'Podés beber unos sorbos de agua sola en caso de sed o calor.',
    ],
  },
  {
    id: 'lipidos',
    category: 'lipidos',
    title: 'Triglicéridos o perfil lipídico',
    badge: '12 horas de ayuno',
    icon: Activity,
    summary: 'Requiere 12 horas de ayuno y una cena liviana libre de grasas.',
    details: [
      'No ingerir bebidas alcohólicas durante las 24 horas previas al estudio.',
      'Cenaliviana la noche anterior (sin frituras, embutidos ni lácteos enteros).',
      'Mantener las pautas generales de hidratación sólo con agua.',
    ],
  },
  {
    id: 'tiroides',
    category: 'tiroides',
    title: 'Medicación tiroidea (TSH / T4)',
    badge: 'Dosis post-extracción',
    icon: Pill,
    summary: 'Si tomás levotiroxina, no la tomes antes de la extracción de sangre.',
    details: [
      'Concurrí en ayunas al laboratorio para la toma de muestra.',
      'Llevá tu medicación para tomarla inmediatamente posterior a la extracción.',
      'Para otras medicaciones habituales, seguí la indicación de tu profesional médico.',
    ],
  },
  {
    id: 'orina',
    category: 'orina',
    title: 'Orina completa y urocultivo',
    badge: 'Frasco estéril',
    icon: FlaskConical,
    summary: 'Usar frasco limpio o estéril según corresponda y descartar el primer chorro.',
    details: [
      'Idealmente recolectar la primera orina de la mañana.',
      'Si no es posible, asegurar una retención vesical mínima de 3 horas.',
      'Para urocultivo: higiene genital previa con agua y jabón neutro, secar con toalla limpia.',
      'Descartar el primer chorro en el inodoro y recolectar la porción media en el frasco.',
      'Podés retirar frascos estériles sin cargo previamente en nuestro laboratorio.',
    ],
  },
]

const faqs = [
  {
    question: '¿Cuál es el horario de atención y de extracciones?',
    answer:
      'Atendemos de lunes a viernes de 7:30 a 12:00 y de 17:00 a 19:00. Las extracciones en el laboratorio se realizan de 7:30 a 10:00.',
  },
  {
    question: '¿Necesito sacar turno para atenderme en el laboratorio?',
    answer:
      'La atención presencial para extracciones en el laboratorio es por estricto orden de llegada de 7:30 a 10:00. Para extracciones a domicilio sí es necesario coordinar turno previamente por WhatsApp.',
  },
  {
    question: '¿Qué documentación debo presentar al concurrir?',
    answer:
      'Credencial o carnet digital de obra social o prepaga, DNI original y orden médica con datos del paciente, diagnóstico, firma, sello y fecha vigente del profesional solicitante.',
  },
  {
    question: '¿Cómo sé si mi orden requiere autorización previa de mi obra social?',
    answer:
      'Podés enviarnos una foto nítida de tu orden médica por WhatsApp al +54 9 3416 82-4801 y nosotros verificamos de inmediato si requiere bono, autorización o documentación adicional.',
  },
  {
    question: '¿Cómo y cuándo puedo recibir mis resultados?',
    answer:
      'Te enviamos los informes en formato digital PDF por WhatsApp o correo electrónico para mayor comodidad. Si lo preferís, también podés retirarlos impresos en el laboratorio durante nuestro horario habitual.',
  },
  {
    question: '¿Puedo retirar recipientes estériles para orina en el laboratorio?',
    answer:
      'Sí, podés pasar sin turno durante todo nuestro horario de atención (mañana o tarde) a retirar los frascos estériles necesarios sin ningún costo.',
  },
]

const articlesData = [
  {
    id: 1,
    tag: 'Bioquímica Clínica',
    title: '¿Por qué es importante el ayuno antes de un análisis de sangre?',
    preview:
      'Cómo la ingesta de alimentos altera directamente glucemia, triglicéridos, lípidos y enzimas hepáticas.',
    content:
      'El ayuno no es un mero capricho del laboratorio: cuando ingerimos alimentos o bebidas azucaradas, el torrente sanguíneo recibe una afluencia inmediata de glucosa, grasas y aminoácidos. Esto modifica drásticamente parámetros bioquímicos basales como la glucemia, el perfil lipídico y los electrolitos. Mantener las horas de ayuno recomendadas (habitualmente 8 a 12 horas) garantiza resultados reproducibles y clínicamente comparables para tu médico.',
  },
  {
    id: 2,
    tag: 'Prevención',
    title: 'Chequeo anual preventivo: estudios de rutina esenciales',
    preview:
      'Un repaso completo por las determinaciones clave que permiten detectar a tiempo desequilibrios metabólicos.',
    content:
      'El control de laboratorio anual es la herramienta preventiva más eficaz. Un hemograma completo evalúa anemias e infecciones; la glucemia y hemoglobina glicosilada detectan diabetes incipiente; el hepatograma y el perfil lipídico evalúan la función del hígado y el riesgo cardiovascular; mientras que la uremia y creatinina vigilan la salud renal. Detectar variaciones a tiempo evita complicaciones futuras.',
  },
  {
    id: 3,
    tag: 'Endocrinología',
    title: 'Control de tiroides: TSH, T4 libre y recomendaciones',
    preview:
      'Pautas claras para estudios tiroideos y cómo proceder si consumís levotiroxina diariamente.',
    content:
      'Las hormonas tiroideas regulan el metabolismo general del cuerpo. Para analizar TSH, T4 total o libre y anticuerpos antitiroideos, es indispensable concurrir a primera hora de la mañana. Si tomás levotiroxina, no debés ingerir el comprimido antes de la extracción de sangre; llevalo con vos para tomarlo inmediatamente después de que te hayamos tomado la muestra.',
  },
  {
    id: 4,
    tag: 'Guía práctica',
    title: 'Cómo recolectar una muestra de orina sin errores',
    preview:
      'Pasos esenciales de higiene y técnica del chorro medio para evitar falsos positivos bacterianos.',
    content:
      'La muestra ideal es la primera orina de la mañana o tras una retención mínima de 3 horas. Para evitar contaminaciones externas, realizá un lavado genital previo con agua y jabón neutro. Al orinar, dejá caer el primer chorro en el inodoro y recolectá la porción media en el recipiente estéril. Cerrá bien la tapa y llevalo al laboratorio dentro de las 2 horas de recolectado.',
  },
  {
    id: 5,
    tag: 'Servicios',
    title: 'Extracción a domicilio: comodidad y precisión en tu hogar',
    preview:
      'Una alternativa segura para adultos mayores, personas en reposo o con movilidad reducida.',
    content:
      'Nuestro servicio de extracción a domicilio traslada todo el rigor y la bioseguridad del laboratorio a la calidez de tu hogar. Profesionales bioquímicos matriculados realizan la toma de muestra con materiales descartables de primera calidad. Se coordina previamente por WhatsApp enviando la orden médica y domicilio en Rosario.',
  },
]

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [coverageSearch, setCoverageSearch] = useState('')
  const [coverageFilter, setCoverageFilter] = useState<'all' | 'popular' | 'obra-social' | 'prepaga'>('all')
  const [activePrepCategory, setActivePrepCategory] = useState<string>('todas')
  const [selectedArticle, setSelectedArticle] = useState<(typeof articlesData)[0] | null>(null)
  const segmentedControlRef = useRef<HTMLDivElement>(null)

  const handlePrepCategoryChange = (category: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActivePrepCategory(category)
    const container = segmentedControlRef.current
    const target = e.currentTarget
    if (container && target) {
      const targetLeft = target.offsetLeft
      const targetWidth = target.offsetWidth
      const containerWidth = container.clientWidth
      container.scrollTo({
        left: targetLeft - containerWidth / 2 + targetWidth / 2,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const container = segmentedControlRef.current
    if (container) {
      const activeBtn = container.querySelector<HTMLButtonElement>('.segmented-btn.active')
      if (activeBtn) {
        const targetLeft = activeBtn.offsetLeft
        const targetWidth = activeBtn.offsetWidth
        const containerWidth = container.clientWidth
        container.scrollTo({
          left: targetLeft - containerWidth / 2 + targetWidth / 2,
          behavior: 'smooth',
        })
      }
    }
  }, [activePrepCategory])

  // Filtered Social Works
  const filteredSocialWorks = useMemo(() => {
    return socialWorksData.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(coverageSearch.toLowerCase().trim())
      if (!matchesSearch) return false

      if (coverageFilter === 'popular') return item.popular
      if (coverageFilter === 'obra-social') return item.type === 'obra-social'
      if (coverageFilter === 'prepaga') return item.type === 'prepaga'
      return true
    })
  }, [coverageSearch, coverageFilter])

  // Filtered Prep Guides
  const filteredPrepGuides = useMemo(() => {
    if (activePrepCategory === 'todas') return prepGuides
    return prepGuides.filter((guide) => guide.category === activePrepCategory)
  }, [activePrepCategory])

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      {/* Top micro announcement bar */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-items">
            <span className="top-bar-item">
              <MapPin className="icon" /> Iriondo 2065, Rosario
            </span>
            <span className="top-bar-item">
              <Clock className="icon" /> Lun a Vie 7:30 - 12:00 y 17:00 - 19:00
            </span>
            <span className="top-bar-item">
              <Phone className="icon" /> +54 9 3416 82-4801
            </span>
          </div>

          <div className="top-bar-status">
            <span className="status-dot" aria-hidden="true" />
            <span>Extracciones: 7:30 a 10:00 hs · Sin turno previo</span>
          </div>
        </div>
      </div>

      {/* Apple Frosted Glass Header */}
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Laboratorio Valero - Ir al inicio">
          <div className="brand-mark" aria-hidden="true" />
          <div className="brand-text">
            <span className="brand-title">Laboratorio Valero</span>
            <span className="brand-subtitle">Bioquímica Clínica · Rosario</span>
          </div>
        </a>

        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#coberturas">Coberturas</a>
          <a href="#preparacion">Preparación</a>
          <a href="#domicilio">A Domicilio</a>
          <a href="#faq">Preguntas</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="header-actions">
          <a
            className="header-cta"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Consultar por WhatsApp"
          >
            <IconifyIcon icon="logos:whatsapp-icon" className="icon" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-nav-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div id="mobile-nav-drawer" className="mobile-nav-drawer" role="menu">
            <a href="#coberturas" onClick={() => setMobileMenuOpen(false)}>
              Coberturas y Obras Sociales
            </a>
            <a href="#preparacion" onClick={() => setMobileMenuOpen(false)}>
              Preparación para Análisis
            </a>
            <a href="#domicilio" onClick={() => setMobileMenuOpen(false)}>
              Extracción a Domicilio
            </a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
              Preguntas Frecuentes
            </a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>
              Ubicación y Contacto
            </a>
            <hr className="drawer-divider" />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="button button-whatsapp"
            >
              <IconifyIcon icon="logos:whatsapp-icon" className="icon" aria-hidden="true" />
              Consultar por WhatsApp
            </a>
          </div>
        </>
      )}

      <main id="contenido" tabIndex={-1}>
        {/* Apple Keynote Showcase Hero */}
        <section className="hero" id="inicio">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="apple-pill-tag">
                <Sparkles size={14} className="icon" />
                <span>Bioquímica de precisión en Rosario</span>
              </div>

              <h1 className="hero-title">
                Precisión en análisis.<br />
                <span className="hero-gradient-text">Calidez que te acompaña.</span>
              </h1>

              <p className="hero-copy">
                Laboratorio de análisis clínicos y bioquímicos en Rosario. Orientación clara
                para tus estudios, extracciones por orden de llegada, atención a domicilio y
                resultados digitales rápidos y seguros.
              </p>

              <div className="hero-actions">
                <a
                  className="button button-whatsapp"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconifyIcon icon="logos:whatsapp-icon" className="icon" aria-hidden="true" />
                  Consultar por WhatsApp
                </a>

                <a className="button button-secondary" href="#domicilio">
                  <House className="icon" />
                  Extracción a domicilio
                </a>
              </div>

              <div className="hero-trust-bar">
                <div className="hero-trust-item">
                  <MapPin className="icon" />
                  <span>Iriondo 2065, Rosario</span>
                </div>
                <div className="hero-trust-item">
                  <Clock className="icon" />
                  <span>Lun a Vie 7:30 - 12:00 y 17:00 - 19:00</span>
                </div>
                <div className="hero-trust-item">
                  <ShieldCheck className="icon" />
                  <span>+25 Obras Sociales y Prepagas</span>
                </div>
              </div>
            </div>

            {/* Apple Bento Hero Hub */}
            <div className="hero-hub">
              {/* Featured extraction card */}
              <div className="bento-card hero-card-featured">
                <div className="hub-status-header">
                  <span className="hub-badge">
                    <span className="status-dot" aria-hidden="true" />
                    Atención sin turno previo
                  </span>
                  <div className="hub-icon-bubble">
                    <Droplets className="icon" />
                  </div>
                </div>

                <div className="hub-time-display">
                  <span className="hub-time-label">Horario de extracciones en laboratorio</span>
                  <span className="hub-time-value">7:30 a 10:00 hs</span>
                  <p className="hub-time-sub">
                    Lunes a viernes por estricto orden de llegada. Atención ágil y personalizada.
                  </p>
                </div>
              </div>

              {/* Sub-cards in grid */}
              <div className="hero-hub-subgrid">
                <a
                  className="hub-mini-card"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="hub-mini-content">
                    <h3>¿Tenés orden médica?</h3>
                    <p>Envianos una foto y verificamos autorizaciones previas.</p>
                    <span className="hub-link-arrow">
                      Consultar ahora <ArrowRight size={13} />
                    </span>
                  </div>
                </a>

                <a className="hub-mini-card" href="#resultados">
                  <div className="hub-mini-content">
                    <h3>Resultados digitales</h3>
                    <p>Recibí tu informe en PDF por WhatsApp o correo.</p>
                    <span className="hub-link-arrow">
                      Ver modalidades <ArrowRight size={13} />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Bento Strip */}
        <section className="quick-strip" aria-label="Servicios destacados">
          <div className="quick-card">
            <div className="quick-card-icon">
              <FileCheck className="icon" />
            </div>
            <div className="quick-card-text">
              <h3>Revisión de órdenes</h3>
              <p>Envianos una foto para confirmar autorizaciones, bonos y ayuno necesario.</p>
            </div>
          </div>

          <div className="quick-card">
            <div className="quick-card-icon">
              <House className="icon" />
            </div>
            <div className="quick-card-text">
              <h3>Extracción a domicilio</h3>
              <p>De lunes a viernes de 8:00 a 10:00 hs con turno previamente coordinado.</p>
            </div>
          </div>

          <div className="quick-card">
            <div className="quick-card-icon">
              <MessageCircle className="icon" />
            </div>
            <div className="quick-card-text">
              <h3>Entrega digital o física</h3>
              <p>Descargá tus informes en alta resolución o retiralos impresos en el laboratorio.</p>
            </div>
          </div>
        </section>

        {/* Editorial Story / Trayectoria */}
        <section className="section" id="historia">
          <div className="section-inner">
            <div className="story-card">
              <div className="section-heading" style={{ marginBottom: 0 }}>
                <p className="eyebrow">Compromiso y Trayectoria</p>
                <h2>Calidez humana y rigor profesional para tu salud</h2>
                <p className="story-lead">
                  Combinamos experiencia, equipamiento de vanguardia y una atención personalizada
                  que prioriza el tiempo y la tranquilidad de cada paciente.
                </p>
              </div>

              <div className="story-pillars">
                <div className="pillar-item">
                  <div className="pillar-icon">
                    <CheckCircle2 className="icon" />
                  </div>
                  <div className="pillar-content">
                    <h3>Rigor analítico</h3>
                    <p>Procesos estandarizados y controles de calidad en cada determinación.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon">
                    <ShieldCheck className="icon" />
                  </div>
                  <div className="pillar-content">
                    <h3>Atención sin demoras</h3>
                    <p>Extracciones eficientes para que puedas continuar tu jornada sin esperas.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon">
                    <Sparkles className="icon" />
                  </div>
                  <div className="pillar-content">
                    <h3>Canales directos</h3>
                    <p>Comunicación fluida por WhatsApp con nuestro equipo bioquímico.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coberturas y Obras Sociales (Apple Live Search & Filter) */}
        <section className="section section-muted" id="coberturas">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Obras sociales y prepagas</p>
              <h2>Coberturas aceptadas</h2>
              <p>
                Trabajamos con las principales obras sociales y sistemas de medicina prepaga.
                Podés buscar tu cobertura en tiempo real en el listado a continuación.
              </p>
            </div>

            <div className="coverage-hub-card">
              <div className="coverage-toolbar">
                <div className="apple-search-box">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    className="apple-search-input"
                    placeholder="Buscar tu obra social o prepaga..."
                    value={coverageSearch}
                    onChange={(e) => setCoverageSearch(e.target.value)}
                    aria-label="Buscar obra social o prepaga"
                  />
                  {coverageSearch && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setCoverageSearch('')}
                      aria-label="Borrar búsqueda"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="coverage-filters">
                  <button
                    type="button"
                    className={`filter-pill ${coverageFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setCoverageFilter('all')}
                  >
                    Todas ({socialWorksData.length})
                  </button>
                  <button
                    type="button"
                    className={`filter-pill ${coverageFilter === 'popular' ? 'active' : ''}`}
                    onClick={() => setCoverageFilter('popular')}
                  >
                    Más consultadas
                  </button>
                  <button
                    type="button"
                    className={`filter-pill ${coverageFilter === 'obra-social' ? 'active' : ''}`}
                    onClick={() => setCoverageFilter('obra-social')}
                  >
                    Obras Sociales
                  </button>
                  <button
                    type="button"
                    className={`filter-pill ${coverageFilter === 'prepaga' ? 'active' : ''}`}
                    onClick={() => setCoverageFilter('prepaga')}
                  >
                    Prepagas
                  </button>
                </div>
              </div>

              <div className="coverage-status-row">
                <span>
                  Mostrando <strong>{filteredSocialWorks.length}</strong> coberturas
                  {coverageSearch ? ` para "${coverageSearch}"` : ''}
                </span>
                <span style={{ fontSize: '0.82rem' }}>
                  ✓ Con o sin autorización previa según plan
                </span>
              </div>

              {filteredSocialWorks.length > 0 ? (
                <div className="coverage-grid">
                  {filteredSocialWorks.map((item) => (
                    <div className="coverage-item" key={item.name}>
                      <span>{item.name}</span>
                      <Check className="check-icon" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="coverage-empty-state">
                  <HelpCircle className="empty-icon" />
                  <div>
                    <h3 style={{ margin: '0 0 0.4rem', color: 'var(--color-ink)' }}>
                      No encontramos "{coverageSearch}" en la lista directa
                    </h3>
                    <p style={{ margin: 0, color: 'var(--color-muted)' }}>
                      Muchas obras sociales operan mediante reintegro o convenios específicos.
                      Envianos tu orden y lo verificamos en minutos.
                    </p>
                  </div>
                  <a
                    className="button button-whatsapp"
                    href={`https://wa.me/5493416824801?text=Hola%20Laboratorio%20Valero%2C%20quisiera%20consultar%20si%20atienden%20por%20${encodeURIComponent(coverageSearch)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconifyIcon icon="logos:whatsapp-icon" className="icon" aria-hidden="true" />
                    Consultar por {coverageSearch}
                  </a>
                </div>
              )}

              <div className="coverage-consult-banner">
                <div className="coverage-consult-text">
                  <h4>¿Tu cobertura no figura en la lista?</h4>
                  <p>
                    Envianos una foto de tu pedido médico por WhatsApp y te informamos al
                    instante aranceles preferenciales o requisitos de autorización.
                  </p>
                </div>
                <a
                  className="button button-secondary"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconifyIcon icon="logos:whatsapp-icon" className="icon" aria-hidden="true" />
                  <span className="btn-label-mobile">Consultanos</span>
                  <span className="btn-label-desktop">Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Indicaciones y Preparación (Apple Segmented Control & Cards) */}
        <section className="section" id="preparacion">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Preparación</p>
              <h2>Indicaciones para pacientes</h2>
              <p>
                Una adecuada preparación previa asegura resultados exactos y representativos.
                Seleccioná el tipo de análisis para conocer sus requisitos.
              </p>
            </div>

            <div
              className="prep-segmented-control"
              role="tablist"
              aria-label="Tipos de análisis"
              ref={segmentedControlRef}
            >
              {[
                { id: 'todas', label: 'Todas las guías' },
                { id: 'rutina', label: 'Sangre de rutina' },
                { id: 'lipidos', label: 'Perfil lipídico' },
                { id: 'tiroides', label: 'Tiroides (TSH/T4)' },
                { id: 'orina', label: 'Orina y urocultivo' },
              ].map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={activePrepCategory === category.id}
                  className={`segmented-btn ${activePrepCategory === category.id ? 'active' : ''}`}
                  onClick={(e) => handlePrepCategoryChange(category.id, e)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="prep-grid">
              {filteredPrepGuides.map((guide) => {
                const GuideIcon = guide.icon
                return (
                  <article className="prep-card" key={guide.id}>
                    <div className="prep-card-header">
                      <div className="prep-icon-box">
                        <GuideIcon className="icon" />
                      </div>
                      <span className="prep-badge">{guide.badge}</span>
                    </div>

                    <h3>{guide.title}</h3>
                    <p className="prep-summary">{guide.summary}</p>

                    <ul className="prep-checklist">
                      {guide.details.map((detail) => (
                        <li key={detail}>
                          <Check className="icon" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Extracción a Domicilio (Apple Interactive Connected Steps) */}
        <section className="section section-muted" id="domicilio">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Extracción a domicilio</p>
              <h2>Coordiná tu visita sin salir de tu casa</h2>
              <p>
                Pensado especialmente para adultos mayores, pacientes con movilidad reducida o
                quienes prefieren realizar sus estudios con total privacidad y tranquilidad.
              </p>
            </div>

            <div className="domicilio-layout">
              <div className="service-steps">
                <div className="step-card">
                  <span className="step-number">1</span>
                  <div className="step-body">
                    <h3>Enviá tu orden médica</h3>
                    <p>
                      Mandanos una foto de la orden junto con tu dirección en Rosario por WhatsApp.
                    </p>
                  </div>
                </div>

                <div className="step-card">
                  <span className="step-number">2</span>
                  <div className="step-body">
                    <h3>Recibí indicaciones y cotización</h3>
                    <p>
                      Te informamos el ayuno necesario, condiciones de muestra y el arancel según
                      tu zona.
                    </p>
                  </div>
                </div>

                <div className="step-card">
                  <span className="step-number">3</span>
                  <div className="step-body">
                    <h3>Visita en tu hogar</h3>
                    <p>
                      Nuestro profesional bioquímico acude en el día y horario convenido de 8:00 a
                      10:00 hs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="domicilio-benefits">
                <h3>Ventajas del servicio domiciliario</h3>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <CheckCircle2 className="icon" />
                    <div>
                      <strong>Comodidad total</strong>
                      <span>Evitás traslados matutinos y demoras en salas de espera.</span>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <CheckCircle2 className="icon" />
                    <div>
                      <strong>Bioseguridad y materiales estériles</strong>
                      <span>Mismos estándares de excelencia que en nuestro laboratorio.</span>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <CheckCircle2 className="icon" />
                    <div>
                      <strong>Atención para todas las edades</strong>
                      <span>Adultos mayores, personas en posoperatorio o niños pequeños.</span>
                    </div>
                  </div>
                </div>

                <a
                  className="button button-whatsapp"
                  style={{ width: '100%' }}
                  href={whatsappDomicilioUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <House className="icon" />
                  Pedir turno a domicilio
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Resultados Digitales y Físicos */}
        <section className="section" id="resultados">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Entrega de informes</p>
              <h2>Tus resultados, disponibles como prefieras</h2>
              <p>
                Garantizamos rapidez y confidencialidad en la emisión de tus análisis bioquímicos.
              </p>
            </div>

            <div className="results-grid">
              <div className="result-card">
                <div className="result-card-icon">
                  <IconifyIcon icon="logos:whatsapp-icon" className="icon" aria-hidden="true" />
                </div>
                <div className="result-card-content">
                  <h3>Entrega digital en PDF</h3>
                  <p>
                    Recibí tus informes firmados digitalmente de forma directa en tu WhatsApp o
                    correo electrónico para reenviárselos al instante a tu médico tratante.
                  </p>
                </div>
              </div>

              <div className="result-card">
                <div className="result-card-icon">
                  <FileText className="icon" />
                </div>
                <div className="result-card-content">
                  <h3>Retiro presencial impreso</h3>
                  <p>
                    Si necesitás el informe en soporte papel, podés retirarlo en recepción durante
                    todo nuestro horario de atención habitual (mañana de 7:30 a 12:00 o tarde de
                    17:00 a 19:00).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preguntas Frecuentes (Apple iOS Grouped Accordion) */}
        <section className="section section-muted" id="faq">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Dudas habituales</p>
              <h2>Preguntas frecuentes</h2>
              <p>
                Respuestas inmediatas a las consultas más comunes antes de realizarte tus estudios.
              </p>
            </div>

            <div className="faq-container">
              {faqs.map((item) => (
                <div className="faq-item" key={item.question}>
                  <details>
                    <summary>
                      <span>{item.question}</span>
                      <ChevronDown className="faq-chevron" aria-hidden="true" />
                    </summary>
                    <p className="faq-answer">{item.answer}</p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Artículos de Interés (Apple Editorial Bento Cards) */}
        <section className="section" id="articulos">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Educación y Salud</p>
              <h2>Consejos para cuidar tus estudios</h2>
              <p>
                Artículos breves preparados por nuestro equipo para ayudarte a comprender mejor
                tus análisis.
              </p>
            </div>

            <div className="article-grid">
              {articlesData.map((article) => (
                <article
                  className="article-card"
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                >
                  <div>
                    <div className="article-meta">
                      <span>{article.tag}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.preview}</p>
                  </div>
                  <span className="article-read-more">
                    Leer artículo completo <ArrowRight size={14} />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Ubicación y Contacto (Apple Studio Bento) */}
        <section className="section section-muted" id="contacto">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Ubicación y Atención</p>
              <h2>Estamos en Iriondo 2065, Rosario</h2>
              <p>
                Vení a realizar tus estudios o comunicate con nosotros ante cualquier consulta.
              </p>
            </div>

            <div className="contact-bento-layout">
              <div className="contact-info-card">
                <div>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', color: 'var(--color-ink)' }}>
                    Laboratorio de Análisis Valero
                  </h3>
                  <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                    Bioquímica clínica y extracciones a domicilio en Rosario.
                  </p>

                  <div className="contact-list">
                    <div className="contact-row">
                      <div className="contact-row-icon">
                        <MapPin className="icon" />
                      </div>
                      <div className="contact-row-content">
                        <strong>Dirección</strong>
                        <span>Iriondo 2065, Rosario, Santa Fe (CP 2000)</span>
                      </div>
                    </div>

                    <div className="contact-row">
                      <div className="contact-row-icon">
                        <Phone className="icon" />
                      </div>
                      <div className="contact-row-content">
                        <strong>Teléfono / WhatsApp</strong>
                        <span>+54 9 3416 82-4801</span>
                      </div>
                    </div>

                    <div className="contact-row">
                      <div className="contact-row-icon">
                        <Clock className="icon" />
                      </div>
                      <div className="contact-row-content">
                        <strong>Horario de atención general</strong>
                        <span>Lunes a viernes de 7:30 a 12:00 y de 17:00 a 19:00 hs</span>
                      </div>
                    </div>

                    <div className="contact-row">
                      <div className="contact-row-icon">
                        <Droplets className="icon" />
                      </div>
                      <div className="contact-row-content">
                        <strong>Horario de extracciones</strong>
                        <span>Lunes a viernes de 7:30 a 10:00 hs (orden de llegada)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-actions">
                  <a
                    className="button button-whatsapp"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconifyIcon icon="logos:whatsapp-icon" className="icon" aria-hidden="true" />
                    Enviar foto de orden médica
                  </a>
                  <a
                    className="button button-secondary"
                    href="https://www.google.com/maps/search/?api=1&query=Iriondo%202065%2C%20Rosario%2C%20Santa%20Fe"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="icon" />
                    Cómo llegar
                  </a>
                </div>
              </div>

              <div className="map-container">
                <div className="map-header">
                  <span className="map-badge">
                    <MapPin size={16} color="var(--color-primary)" />
                    Iriondo 2065, Rosario
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Iriondo%202065%2C%20Rosario%2C%20Santa%20Fe"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600 }}
                  >
                    Ver en Google Maps ↗
                  </a>
                </div>
                <iframe
                  className="map-frame"
                  title="Mapa de ubicación Laboratorio Valero en Rosario"
                  src="https://www.google.com/maps?q=Iriondo%202065%2C%20Rosario%2C%20Santa%20Fe&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Apple Minimalist Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="brand">
              <div className="brand-mark" aria-hidden="true" />
              <div className="brand-text">
                <span className="brand-title">Laboratorio Valero</span>
                <span className="brand-subtitle">Rosario, Santa Fe</span>
              </div>
            </div>

            <div className="footer-links">
              <a href="#coberturas">Coberturas</a>
              <a href="#preparacion">Preparación</a>
              <a href="#domicilio">A Domicilio</a>
              <a href="#faq">Preguntas</a>
              <a href="#contacto">Contacto</a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Laboratorio de Análisis Valero. Todos los derechos reservados.</span>
            <span>Iriondo 2065, Rosario · Tel: +54 9 3416 82-4801</span>
          </div>
        </div>
      </footer>

      {/* Apple Dynamic Floating WhatsApp Pill */}
      <a
        className="floating-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar por WhatsApp"
      >
        <IconifyIcon icon="logos:whatsapp-icon" className="icon" aria-hidden="true" />
        <span>Consultar orden médica</span>
      </a>

      {/* Article Detail Glass Modal */}
      {selectedArticle && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedArticle(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedArticle(null)}
              aria-label="Cerrar artículo"
            >
              <X size={18} />
            </button>

            <div className="article-meta">
              <span>{selectedArticle.tag}</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'var(--color-ink)' }}>
              {selectedArticle.title}
            </h2>

            <div className="modal-body">
              <p>{selectedArticle.content}</p>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setSelectedArticle(null)}
              >
                Cerrar
              </button>
              <a
                className="button button-whatsapp"
                href={`https://wa.me/5493416824801?text=Hola%20Laboratorio%20Valero%2C%20le%C3%AD%20el%20art%C3%ADculo%20sobre%20${encodeURIComponent(selectedArticle.title)}%20y%20tengo%20una%20consulta.`}
                target="_blank"
                rel="noreferrer"
              >
                <IconifyIcon icon="logos:whatsapp-icon" className="icon" aria-hidden="true" />
                <span className="btn-label-mobile">Consultanos</span>
                <span className="btn-label-desktop">Hacer una consulta sobre esto</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
