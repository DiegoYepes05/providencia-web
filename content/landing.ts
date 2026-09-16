import { siteConfig } from "@/lib/site-config";

export const hero = {
  badge: "Plataforma tecnológica para equipos B2B",
  headline: {
    lead: "Infraestructura digital para empresas que",
    accent: "no se detienen",
  },
  body: siteConfig.description,
  actions: {
    primary: { label: "Explorar productos", href: "/productos" },
    secondary: { label: "Hablar con ventas", href: "/contacto" },
  },
  trust: ["ISO 27001", "99,98% uptime", "Soporte 24/7"],
};

export const about = {
  eyebrow: "Quiénes somos",
  heading: "Construimos software de base para operaciones críticas",
  body: [
    "Desde 2016 acompañamos a compañías de logística, banca y retail en su transformación digital. Nuestro equipo de 120 especialistas diseña, implementa y opera la capa técnica sobre la que corre el negocio.",
    "No entregamos proyectos y desaparecemos: nos quedamos operando contigo. Cada módulo que desplegamos viene con monitoreo, acuerdos de nivel de servicio y un equipo que responde en minutos.",
  ],
  stats: [
    { value: "120+", label: "Especialistas en nómina" },
    { value: "9 años", label: "Operando en la región" },
    { value: "240", label: "Proyectos entregados" },
    { value: "4", label: "Países con operación" },
  ],
};

export const capabilities = {
  eyebrow: "Qué hacemos",
  heading: "Una plataforma modular, no un paquete cerrado",
  body: "Activa solo lo que necesitas hoy y agrega módulos cuando el negocio lo pida. Todo comparte identidad, permisos y datos.",
  items: [
    {
      title: "Integración de datos",
      description:
        "Conectamos ERP, CRM y bases legadas en un modelo único, con linaje y control de versiones sobre cada tabla.",
      icon: "layers" as const,
    },
    {
      title: "Automatización de procesos",
      description:
        "Flujos con reglas de negocio, aprobaciones y trazabilidad completa. Reduce trabajo manual sin reescribir tus sistemas.",
      icon: "bolt" as const,
    },
    {
      title: "Seguridad y cumplimiento",
      description:
        "Cifrado en tránsito y reposo, registro de auditoría inmutable y controles alineados a ISO 27001 y SOC 2.",
      icon: "shield" as const,
    },
    {
      title: "Observabilidad",
      description:
        "Métricas técnicas y de negocio en el mismo tablero, con alertas que llegan al canal donde ya trabaja tu equipo.",
      icon: "pulse" as const,
    },
    {
      title: "Infraestructura administrada",
      description:
        "Despliegues en tu nube o en la nuestra, con escalado automático y planes de recuperación probados cada trimestre.",
      icon: "server" as const,
    },
    {
      title: "Acompañamiento continuo",
      description:
        "Un equipo asignado a tu cuenta, revisiones mensuales de arquitectura y hoja de ruta construida contigo.",
      icon: "people" as const,
    },
  ],
};

export const process = {
  eyebrow: "Cómo trabajamos",
  heading: "Cuatro fases, sin sorpresas en el camino",
  steps: [
    {
      step: "01",
      title: "Diagnóstico",
      description:
        "Dos semanas revisando sistemas, datos y procesos. Sales con un mapa técnico y un plan priorizado por impacto.",
    },
    {
      step: "02",
      title: "Diseño",
      description:
        "Definimos arquitectura, modelo de datos y criterios de éxito medibles antes de escribir una línea de código.",
    },
    {
      step: "03",
      title: "Implementación",
      description:
        "Entregas cada dos semanas en ambientes reales. Validas avances funcionando, no presentaciones.",
    },
    {
      step: "04",
      title: "Operación",
      description:
        "Monitoreo permanente, mejoras continuas y un acuerdo de servicio con tiempos de respuesta garantizados.",
    },
  ],
};

export const clients = {
  label: "Compañías que ya operan con nosotros",
  names: ["Andicorp", "Banco Central", "Logística Sur", "Retail Nova", "Grupo Vela"],
};

export const testimonial = {
  quote:
    "Pasamos de cerrar inventario en cinco días a tenerlo en tiempo real. Lo importante no fue la tecnología, fue que el equipo de Providencia entendió cómo opera nuestra bodega antes de proponer nada.",
  author: "Mariana Saldarriaga",
  role: "Directora de Operaciones, Logística Sur",
};

export const finalCta = {
  heading: "Hablemos de lo que necesita tu operación",
  body: "Agenda 30 minutos con nuestro equipo técnico. Salimos de la llamada con un diagnóstico inicial y los siguientes pasos, sin compromiso.",
  primary: { label: "Agendar demo", href: "/contacto" },
  secondary: { label: "Ver productos", href: "/productos" },
};
