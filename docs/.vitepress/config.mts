import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import anchorMap from './anchor-map.json';
import { defaultSlugify } from '../../scripts/anchor-map-utils.ts';

const docsBase = process.env.DOCS_BASE_PATH || '/alantia-harness-engineering/';
const repository = 'https://github.com/AIMM-dev/alantia-harness-engineering';
const esLectureItems = [
  { text: "Bienvenido", link: "/es/" },
  { text: "Un modelo potente no garantiza una ejecución confiable", link: "/es/lectures/lecture-01-why-capable-agents-still-fail/" },
  { text: "Qué significa realmente harness", link: "/es/lectures/lecture-02-what-a-harness-actually-is/" },
  { text: "Convierte el repositorio en la fuente única de verdad", link: "/es/lectures/lecture-03-why-the-repository-must-become-the-system-of-record/" },
  { text: "Divide las instrucciones entre archivos", link: "/es/lectures/lecture-04-why-one-giant-instruction-file-fails/" },
  { text: "Mantén vivo el contexto entre sesiones", link: "/es/lectures/lecture-05-why-long-running-tasks-lose-continuity/" },
  { text: "Inicializa antes de cada sesión del agente", link: "/es/lectures/lecture-06-why-initialization-needs-its-own-phase/" },
  { text: "Define límites claros para las tareas del agente", link: "/es/lectures/lecture-07-why-agents-overreach-and-under-finish/" },
  { text: "Usa listas de funciones para limitar al agente", link: "/es/lectures/lecture-08-why-feature-lists-are-harness-primitives/" },
  { text: "Evita que los agentes declaren victoria demasiado pronto", link: "/es/lectures/lecture-09-why-agents-declare-victory-too-early/" },
  { text: "Solo las pruebas end-to-end son verificación real", link: "/es/lectures/lecture-10-why-end-to-end-testing-changes-results/" },
  { text: "Haz observable el runtime del agente", link: "/es/lectures/lecture-11-why-observability-belongs-inside-the-harness/" },
  { text: "Deja un traspaso limpio al final de cada sesión", link: "/es/lectures/lecture-12-why-every-session-must-leave-a-clean-state/" },

  { text: "De los prompts manuales a los ciclos autónomos", link: "/es/lectures/lecture-13-loop-engineering/" },
  { text: "De un ciclo a la ingeniería de grafos", link: "/es/lectures/lecture-14-graph-engineering/" }
];

const esProjectItems = [
  { text: "Bienvenido", link: "/es/projects/" },
  { text: "Solo prompts frente a reglas explícitas", link: "/es/projects/project-01-baseline-vs-minimal-harness/" },
  { text: "Haz el proyecto legible y retoma el trabajo", link: "/es/projects/project-02-agent-readable-workspace/" },
  { text: "Mantén al agente trabajando tras reiniciar sesiones", link: "/es/projects/project-03-multi-session-continuity/" },
  { text: "Usa señales de ejecución para corregir el comportamiento", link: "/es/projects/project-04-incremental-indexing/" },
  { text: "Haz que el agente verifique su propio trabajo", link: "/es/projects/project-05-grounded-qa-verification/" },
  { text: "Construye un harness completo (proyecto integrador)", link: "/es/projects/project-06-runtime-observability-and-debugging/" },

  { text: "Construye tu primer ciclo automatizado", link: "/es/projects/project-07-loop-engineering-first-loop/" },
  { text: "Dibuja tu flujo de trabajo como un grafo", link: "/es/projects/project-08-graph-engineering-first-graph/" }
];

const esResourceItems = [
  { text: "Resumen", link: "/es/resources/" },
  { text: "Plantillas", link: "/es/resources/templates/" },
  { text: "Referencia", link: "/es/resources/reference/" },
  { text: "Paquete avanzado", link: "/es/resources/openai-advanced/" },
];

const esSkillItems = [
  { text: "Resumen de Skills", link: "/es/skills/" },
];

const esHarnessDesignItems = [
  { text: "Análisis de los harness más avanzados", link: "/es/harness-designs/" },
  { text: "Análisis del diseño del harness de Pi", link: "/es/harness-designs/pi/" },
  { text: "Análisis del diseño del harness de Claude Code", link: "/es/harness-designs/claude-code/" },
  { text: "Análisis del diseño del harness de Codex", link: "/es/harness-designs/codex/" },
  { text: "Análisis del diseño de DeepSeek Harness", link: "/es/harness-designs/deepseek/" }
];

export default withMermaid(defineConfig({
  base: docsBase,
  lang: 'es-MX',
  title: 'Harness Engineering — Alantia',
  description: 'Aprende a construir agentes de IA confiables: contexto, herramientas, verificación y control. 14 lecciones y 8 proyectos prácticos en español.',
  cleanUrls: true,
  // Evita carreras al crear carpetas durante el renderizado en Windows.
  buildConcurrency: process.platform === 'win32' ? 1 : undefined,
  // Mermaid usa este módulo CommonJS; Vite debe precompilarlo en desarrollo.
  vite: { optimizeDeps: { include: ['fastdom', 'fastdom/extensions/fastdom-promised.js'] } },
  lastUpdated: true,
  srcExclude: ['temp/**', 'en/**', 'zh/**', 'zh-TW/**', 'ja/**', 'ko/**', 'fr/**', 'ru/**', 'de/**', 'ar/**', 'vi/**', 'uz/**', 'tr/**', 'uk/**', 'pt-BR/**'],
  ignoreDeadLinks: false,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: docsBase + 'brand/mark-manual-light.png' }],
    ['meta', { name: 'theme-color', content: '#031D46' }],
    ['meta', { property: 'og:locale', content: 'es_MX' }],
    ['meta', { property: 'og:site_name', content: 'Harness Engineering — Alantia' }]
  ],
  themeConfig: {
    logo: { light: '/brand/logo-manual-light.png', dark: '/brand/logo-manual-dark.png', alt: 'Alantia.ai' },
    siteTitle: false,
    nav: [
      { text: 'Lecciones', link: esLectureItems[1].link, activeMatch: '/es/lectures/' },
      { text: 'Proyectos', link: '/es/projects/' },
      { text: 'Recursos', link: '/es/resources/' },
      { text: 'Análisis de harness', link: '/es/harness-designs/' },
      { text: 'Alantia.ai', link: 'https://alantia.ai/' }
    ],
    sidebar: {
      '/es/projects/': [{text:'Proyectos prácticos',items:esProjectItems}],
      '/es/resources/': [{text:'Biblioteca de recursos',items:[...esResourceItems,{text:'Glosario',link:'/es/glosario'}]}],
      '/es/skills/': [{text:'Skills',items:esSkillItems}],
      '/es/harness-designs/': [{text:'Análisis de harness',items:esHarnessDesignItems}],
      '/es/': [{text:'Ruta de aprendizaje',items:esLectureItems},{text:'Herramientas de consulta',items:[{text:'Glosario',link:'/es/glosario'},{text:'Skills',link:'/es/skills/'}]}]
    },
    search: { provider: 'local', options: { translations: {
      button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar en el curso' },
      modal: { displayDetails: 'Mostrar detalles', resetButtonTitle: 'Borrar búsqueda', backButtonTitle: 'Volver', noResultsText: 'No se encontraron resultados para', footer: { selectText: 'seleccionar', navigateText: 'navegar', closeText: 'cerrar' } }
    } } },
    socialLinks: [{icon:'github',link:repository}],
    editLink: {pattern:repository+'/edit/main/docs/:path',text:'Editar esta página en GitHub'},
    outline: {level:[2,3],label:'En esta página'},
    docFooter: {prev:'Anterior',next:'Siguiente'},
    lastUpdated: {text:'Última actualización',formatOptions:{dateStyle:'long'}},
    returnToTopLabel:'Volver arriba', sidebarMenuLabel:'Temario', darkModeSwitchLabel:'Tema',
    lightModeSwitchTitle:'Cambiar a tema claro', darkModeSwitchTitle:'Cambiar a tema oscuro',
    skipToContentLabel:'Saltar al contenido',
    externalLinkIcon: true,
    notFound: {code:'404',title:'Página no encontrada',quote:'Esta ruta no forma parte del curso. Puedes volver al inicio o buscar una lección.',linkLabel:'Volver al inicio',linkText:'Volver al inicio'},
    footer: {message:'Edición Alantia.ai · Basada en Learn Harness Engineering de <a href="https://github.com/walkinglabs/learn-harness-engineering">WalkingLab</a>.',copyright:'Contenido original bajo licencia MIT. Identidad de marca Alantia.ai.'}
  },
  markdown: {
    anchor: {
        slugifyWithState(source: string, state: any) {
          const [locale, ...rest] = String(state.env.relativePath ?? '').split('/')
          const page = (anchorMap as Record<string, { ids: string[]; locales: Record<string, number> }>)[
            rest.join('/')
          ]
          if (page && page.locales[locale] === page.ids.length) {
            const index = (state.env.__anchorIndex = (state.env.__anchorIndex ?? -1) + 1)
            if (page.ids[index]) return page.ids[index]
          }
          return defaultSlugify(source)
        },
      },
      theme: {
        light: 'github-light',
        dark: 'github-dark'
      },
    },

  mermaid: {theme:'base',themeVariables:{primaryColor:'#f4f6f8',primaryBorderColor:'#031D46',primaryTextColor:'#031D46',lineColor:'#46618f',fontFamily:'Inter, sans-serif',fontSize:'16px'},flowchart:{nodeSpacing:40,rankSpacing:56,padding:12}}
}));
