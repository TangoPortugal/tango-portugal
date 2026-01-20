// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.HEAD || "main";
var getPrefix = () => {
  if (typeof window === "undefined") return "";
  return window.location.hostname === "localhost" ? "" : "/tango-portugal";
};
var createPageFields = (lang) => {
  const labels = {
    pt: {
      title: "T\xEDtulo",
      titleDesc: "O t\xEDtulo principal da p\xE1gina",
      date: "Data",
      dateDesc: "Data de cria\xE7\xE3o ou publica\xE7\xE3o",
      draft: "Rascunho",
      draftDesc: "Marcar como rascunho (n\xE3o ser\xE1 publicado)",
      weight: "Ordem",
      weightDesc: "N\xFAmero para ordenar no menu (menor aparece primeiro)",
      cover: "Imagem de Capa",
      coverDesc: "Imagem principal que aparece no topo da p\xE1gina",
      image: "Imagem",
      imageDesc: "Selecione ou envie uma imagem",
      alt: "Texto Alternativo",
      altDesc: "Descri\xE7\xE3o da imagem para acessibilidade",
      description: "Descri\xE7\xE3o",
      descriptionDesc: "Breve descri\xE7\xE3o para SEO e redes sociais",
      body: "Conte\xFAdo",
      bodyDesc: "Conte\xFAdo principal da p\xE1gina",
      youtube: "V\xEDdeo YouTube",
      videoId: "ID do V\xEDdeo",
      videoIdDesc: "ID do v\xEDdeo YouTube (ex: X0qDhRLkigY)",
      layout: "Layout",
      layoutDesc: "Layout personalizado (deixar vazio para usar o padr\xE3o)"
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
      layoutDesc: "Custom layout (leave empty for default)"
    },
    es: {
      title: "T\xEDtulo",
      titleDesc: "El t\xEDtulo principal de la p\xE1gina",
      date: "Fecha",
      dateDesc: "Fecha de creaci\xF3n o publicaci\xF3n",
      draft: "Borrador",
      draftDesc: "Marcar como borrador (no se publicar\xE1)",
      weight: "Orden",
      weightDesc: "N\xFAmero para ordenar en el men\xFA (menor aparece primero)",
      cover: "Imagen de Portada",
      coverDesc: "Imagen principal que aparece en la parte superior de la p\xE1gina",
      image: "Imagen",
      imageDesc: "Seleccione o cargue una imagen",
      alt: "Texto Alternativo",
      altDesc: "Descripci\xF3n de la imagen para accesibilidad",
      description: "Descripci\xF3n",
      descriptionDesc: "Breve descripci\xF3n para SEO y redes sociales",
      body: "Contenido",
      bodyDesc: "Contenido principal de la p\xE1gina",
      youtube: "Video de YouTube",
      videoId: "ID del Video",
      videoIdDesc: "ID del video de YouTube (ej: X0qDhRLkigY)",
      layout: "Layout",
      layoutDesc: "Layout personalizado (dejar vac\xEDo para usar el predeterminado)"
    }
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
      required: true
    },
    {
      type: "datetime",
      name: "date",
      label: l.date,
      description: l.dateDesc,
      ui: {
        dateFormat
      }
    },
    {
      type: "boolean",
      name: "draft",
      label: l.draft,
      description: l.draftDesc,
      ui: {
        component: "toggle"
      }
    },
    {
      type: "number",
      name: "weight",
      label: l.weight,
      description: l.weightDesc
    },
    {
      type: "string",
      name: "layout",
      label: l.layout,
      description: l.layoutDesc
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
            }
          }
        },
        {
          type: "string",
          name: "alt",
          label: l.alt,
          description: l.altDesc
        }
      ]
    },
    {
      type: "string",
      name: "description",
      label: l.description,
      description: l.descriptionDesc,
      ui: {
        component: "textarea"
      }
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
              description: l.videoIdDesc
            }
          ]
        }
      ]
    }
  ];
};
var pagesPortuguese = {
  name: "pages_pt",
  label: "\u{1F1F5}\u{1F1F9} P\xE1ginas (Portugu\xEAs)",
  path: "content",
  format: "md",
  match: {
    include: "*.pt"
  },
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "_index.pt") {
        return `${getPrefix()}/pt`;
      }
      return `${getPrefix()}/${document._sys.filename.replace(".pt", "")}`;
    },
    filename: {
      readonly: true
    },
    itemProps: (item) => ({
      label: item?.title || item?._sys?.filename.replace(".pt", "") || "Sem t\xEDtulo"
    })
  },
  fields: createPageFields("pt")
};
var pagesEnglish = {
  name: "pages_en",
  label: "\u{1F1EC}\u{1F1E7} Pages (English)",
  path: "content",
  format: "md",
  match: {
    include: "*.en"
  },
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "_index.en") {
        return `${getPrefix()}/en`;
      }
      return `${getPrefix()}/en/${document._sys.filename.replace(".en", "")}`;
    },
    filename: {
      readonly: true
    },
    itemProps: (item) => ({
      label: item?.title || item?._sys?.filename?.replace(".en", "") || "No title"
    })
  },
  fields: createPageFields("en")
};
var pagesSpanish = {
  name: "pages_es",
  label: "\u{1F1EA}\u{1F1F8} P\xE1ginas (Espa\xF1ol)",
  path: "content",
  format: "md",
  match: {
    include: "*.es"
  },
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "_index.es") {
        return `${getPrefix()}/es`;
      }
      return `${getPrefix()}/es/${document._sys.filename.replace(".es", "")}`;
    },
    filename: {
      readonly: true
    },
    itemProps: (item) => ({
      label: item?.title || item?._sys?.filename?.replace(".es", "") || "Sin t\xEDtulo"
    })
  },
  fields: createPageFields("es")
};
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    // Output the admin interface to static/admin (Hugo's static folder)
    outputFolder: "admin",
    publicFolder: "static",
    basePath: "tango-portugal"
    // Resolves asset loading issues on GitHub Pages sub-path
  },
  media: {
    tina: {
      publicFolder: "static",
      mediaRoot: "assets"
    },
    // Fix for GitHub Pages sub-path asset loading in TinaCMS
    loadCustomStore: async () => {
      const pack = await import("tinacms");
      return pack.TinaCloudMediaStore;
    }
  },
  // Search configuration for better content discovery
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["por", "eng", "spa"]
    }
  },
  schema: {
    collections: [
      pagesPortuguese,
      pagesEnglish,
      pagesSpanish
    ]
  }
});
export {
  config_default as default
};
