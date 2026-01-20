import { defineConfig, type Collection, type TinaField } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
// Use environment variable or fallback to current branch
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  "main";

// ============================================================================
// SHARED FIELD DEFINITIONS
// Reusable field configurations for all language collections
// ============================================================================

const getPrefix = () => {
  if (typeof window === 'undefined') return '';
  return window.location.hostname === 'localhost' ? '' : '/tango-portugal';
};

const createPageFields = (lang: "pt" | "en" | "es"): TinaField[] => {
  const labels = {
    pt: {
      title: "Título",
      titleDesc: "O título principal da página",
      date: "Data",
      dateDesc: "Data de criação ou publicação",
      draft: "Rascunho",
      draftDesc: "Marcar como rascunho (não será publicado)",
      weight: "Ordem",
      weightDesc: "Número para ordenar no menu (menor aparece primeiro)",
      cover: "Imagem de Capa",
      coverDesc: "Imagem principal que aparece no topo da página",
      image: "Imagem",
      imageDesc: "Selecione ou envie uma imagem",
      alt: "Texto Alternativo",
      altDesc: "Descrição da imagem para acessibilidade",
      description: "Descrição",
      descriptionDesc: "Breve descrição para SEO e redes sociais",
      body: "Conteúdo",
      bodyDesc: "Conteúdo principal da página",
      youtube: "Vídeo YouTube",
      videoId: "ID do Vídeo",
      videoIdDesc: "ID do vídeo YouTube (ex: X0qDhRLkigY)",
      layout: "Layout",
      layoutDesc: "Layout personalizado (deixar vazio para usar o padrão)",
    },
    en: {
      title: "Title",
      titleDesc: "The main page title",
      date: "Date",
      dateDesc: "Publication or creation date",
      draft: "Draft",
      draftDesc: "Mark as draft (will not be published)",
      weight: "Order",
      weightDesc: "Number for menu ordering (lower appears first)",
      cover: "Cover Image",
      coverDesc: "Main image displayed at the top of the page",
      image: "Image",
      imageDesc: "Select or upload an image",
      alt: "Alt Text",
      altDesc: "Image description for accessibility",
      description: "Description",
      descriptionDesc: "Brief description for SEO and social media",
      body: "Content",
      bodyDesc: "Main page content",
      youtube: "YouTube Video",
      videoId: "Video ID",
      videoIdDesc: "YouTube video ID (e.g., X0qDhRLkigY)",
      layout: "Layout",
      layoutDesc: "Custom layout (leave empty for default)",
    },
    es: {
      title: "Título",
      titleDesc: "El título principal de la página",
      date: "Fecha",
      dateDesc: "Fecha de creación o publicación",
      draft: "Borrador",
      draftDesc: "Marcar como borrador (no se publicará)",
      weight: "Orden",
      weightDesc: "Número para ordenar en el menú (menor aparece primero)",
      cover: "Imagen de Portada",
      coverDesc: "Imagen principal que aparece en la parte superior de la página",
      image: "Imagen",
      imageDesc: "Seleccione o cargue una imagen",
      alt: "Texto Alternativo",
      altDesc: "Descripción de la imagen para accesibilidad",
      description: "Descripción",
      descriptionDesc: "Breve descripción para SEO y redes sociales",
      body: "Contenido",
      bodyDesc: "Contenido principal de la página",
      youtube: "Video de YouTube",
      videoId: "ID del Video",
      videoIdDesc: "ID del video de YouTube (ej: X0qDhRLkigY)",
      layout: "Layout",
      layoutDesc: "Layout personalizado (dejar vacío para usar el predeterminado)",
    },
  };

  const l = labels[lang];
  const dateFormat = lang === "en" ? "MM/DD/YYYY" : "DD/MM/YYYY";

  return [
    {
      type: "string",
      name: "title",
      label: l.title,
      description: l.titleDesc,
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: l.date,
      description: l.dateDesc,
      ui: {
        dateFormat,
      },
    },
    {
      type: "boolean",
      name: "draft",
      label: l.draft,
      description: l.draftDesc,
      ui: {
        component: "toggle",
      },
    },
    {
      type: "number",
      name: "weight",
      label: l.weight,
      description: l.weightDesc,
    },
    {
      type: "string",
      name: "layout",
      label: l.layout,
      description: l.layoutDesc,
    },
    {
      type: "object",
      name: "cover",
      label: l.cover,
      description: l.coverDesc,
      fields: [
        {
          type: "image",
          name: "image",
          label: l.image,
          description: l.imageDesc,
          ui: {
            // Fix sidebar image preview for GitHub Pages sub-path
            previewSrc: (src) => {
              if (src && src.startsWith("http")) return src;
              return `${getPrefix()}${src}`;
            },
          },
        },
        {
          type: "string",
          name: "alt",
          label: l.alt,
          description: l.altDesc,
        },
      ],
    },
    {
      type: "string",
      name: "description",
      label: l.description,
      description: l.descriptionDesc,
      ui: {
        component: "textarea",
      },
    },
    {
      type: "rich-text",
      name: "body",
      label: l.body,
      description: l.bodyDesc,
      isBody: true,
      templates: [
        {
          name: "youtube",
          label: l.youtube,
          fields: [
            {
              name: "videoId",
              label: l.videoId,
              type: "string",
              required: true,
              description: l.videoIdDesc,
            },
          ],
        },
      ],
    },
  ];
};

// ============================================================================
// COLLECTION DEFINITIONS
// ============================================================================

const pagesPortuguese: Collection = {
  name: "pages_pt",
  label: "🇵🇹 Páginas (Português)",
  path: "content",
  format: "md",
  match: {
    // Match all MD files, but exclude translated ones
    include: "*",
    exclude: "*.{en,es}",
  },
  ui: {
    router: ({ document }) => {
      // Home page
      if (document._sys.filename === "_index") {
        return `${getPrefix()}/`;
      }
      return `${getPrefix()}/${document._sys.filename}`;
    },
    filename: {
      readonly: true,
    },
    itemProps: (item) => ({
      label: item?.title || item?._sys?.filename || "Sem título",
    }),
  },
  fields: createPageFields("pt"),
};

const pagesEnglish: Collection = {
  name: "pages_en",
  label: "🇬🇧 Pages (English)",
  path: "content",
  format: "md",
  match: {
    // Match only English translation files
    include: "*.en",
  },
  ui: {
    router: ({ document }) => {
      // English Home page
      if (document._sys.filename === "_index.en") {
        return `${getPrefix()}/en`;
      }
      return `${getPrefix()}/en/${document._sys.filename.replace(".en", "")}`;
    },
    filename: {
      readonly: true,
    },
    itemProps: (item) => ({
      label: item?.title || item?._sys?.filename?.replace(".en", "") || "No title",
    }),
  },
  fields: createPageFields("en"),
};

const pagesSpanish: Collection = {
  name: "pages_es",
  label: "🇪🇸 Páginas (Español)",
  path: "content",
  format: "md",
  match: {
    // Match only Spanish translation files
    include: "*.es",
  },
  ui: {
    router: ({ document }) => {
      // Spanish Home page
      if (document._sys.filename === "_index.es") {
        return `${getPrefix()}/es`;
      }
      return `${getPrefix()}/es/${document._sys.filename.replace(".es", "")}`;
    },
    filename: {
      readonly: true,
    },
    itemProps: (item) => ({
      label: item?.title || item?._sys?.filename?.replace(".es", "") || "Sin título",
    }),
  },
  fields: createPageFields("es"),
};

// ============================================================================
// TINA CMS CONFIGURATION
// ============================================================================

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    // Output the admin interface to static/admin (Hugo's static folder)
    outputFolder: "admin",
    publicFolder: "static",
    basePath: "tango-portugal", // Resolves asset loading issues on GitHub Pages sub-path
  },

  media: {
    tina: {
      // Media files are stored in static/assets
      publicFolder: "static",
      mediaRoot: "assets",
    },
    // Fix for GitHub Pages sub-path asset loading in TinaCMS
    loadCustomStore: async () => {
      const pack = await import("tinacms");
      return pack.TinaCloudMediaStore;
    },
  },

  // Search configuration for better content discovery
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["por", "eng", "spa"],
    },
  },

  schema: {
    collections: [
      pagesPortuguese,
      pagesEnglish,
      pagesSpanish,
    ],
  },
});
