// tina/config.ts
import { defineConfig } from "tinacms";

// tina/collections/contact-collection.ts
var contactCollection = {
  name: "contact",
  label: "Kontakt",
  path: "content/contact",
  format: "json",
  ui: {
    filename: {
      readonly: true,
      slugify: () => "contact"
    },
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [
    {
      name: "title",
      label: "Tytu\u0142",
      type: "string",
      required: true
    },
    {
      name: "description",
      label: "Opis",
      type: "string"
    },
    {
      name: "googleMapsUrl",
      label: "Google Maps URL",
      type: "string",
      required: true
    },
    {
      name: "contactItems",
      label: "Elementy kontaktu",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.label || "Nowy element kontaktu"
        })
      },
      fields: [
        {
          name: "label",
          label: "Etykieta",
          type: "string",
          required: true
        },
        {
          name: "description",
          label: "Opis",
          type: "string"
        },
        {
          name: "value",
          label: "Warto\u015B\u0107",
          type: "string"
        }
      ]
    }
  ]
};

// tina/collections/gallery-collection.ts
import "tinacms";
var galleryCollection = {
  name: "gallery",
  label: "Gallery",
  path: "content/gallery",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/gallery/${document._sys.filename}`;
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Group Title",
      required: true
    },
    {
      type: "object",
      name: "albums",
      label: "Albums",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.albumTitle
        })
      },
      fields: [
        {
          type: "string",
          name: "albumTitle",
          label: "Album Title",
          required: true
        },
        {
          type: "string",
          name: "description",
          label: "Album Description",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "object",
          name: "images",
          label: "Images",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.caption || "Image"
            })
          },
          fields: [
            {
              type: "image",
              name: "src",
              label: "Image",
              required: true
            },
            {
              type: "string",
              name: "caption",
              label: "Caption"
            },
            {
              type: "string",
              name: "alt",
              label: "Alt Text",
              required: true
            }
          ]
        }
      ]
    }
  ]
};

// tina/collections/intentions-collection.ts
var POLISH_DAYS = [
  "Poniedzia\u0142ek",
  "Wtorek",
  "\u015Aroda",
  "Czwartek",
  "Pi\u0105tek",
  "Sobota",
  "Niedziela"
];
var nextMonday = () => {
  const today = /* @__PURE__ */ new Date();
  const nextMonday2 = new Date(today);
  nextMonday2.setDate(today.getDate() + (1 + 7 - today.getDay()) % 7);
  return nextMonday2.toISOString();
};
var intentionsCollection = {
  name: "intentions",
  label: "Intencje",
  path: "content/intentions",
  format: "json",
  defaultItem: {
    title: "Intencje parafialne",
    startDate: nextMonday(),
    days: [
      {
        day: "0",
        intentions: [{ hour: "09:00", intention: "Tre\u015B\u0107 intencji" }]
      },
      {
        day: "1",
        intentions: [{ hour: "10:00", intention: "Tre\u015B\u0107 intencji" }]
      },
      {
        day: "2",
        intentions: [{ hour: "11:00", intention: "Tre\u015B\u0107 intencji" }]
      },
      {
        day: "3",
        intentions: [{ hour: "12:00", intention: "Tre\u015B\u0107 intencji" }]
      },
      {
        day: "4",
        intentions: [{ hour: "13:00", intention: "Tre\u015B\u0107 intencji" }]
      },
      {
        day: "5",
        intentions: [{ hour: "14:00", intention: "Tre\u015B\u0107 intencji" }]
      },
      {
        day: "6",
        intentions: [{ hour: "15:00", intention: "Tre\u015B\u0107 intencji" }]
      }
    ]
  },
  ui: {
    filename: {
      readonly: true,
      slugify: (data) => `${data?.title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`
    }
  },
  fields: [
    {
      name: "title",
      label: "Tytu\u0142",
      type: "string",
      required: true,
      isTitle: true
    },
    {
      name: "startDate",
      label: "Data rozpocz\u0119cia",
      type: "datetime",
      required: true
    },
    {
      name: "description",
      label: "Opis",
      type: "string"
    },
    {
      name: "days",
      label: "Dni",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: POLISH_DAYS[item.day] || "Nieznany dzie\u0144"
          };
        }
      },
      fields: [
        {
          name: "day",
          type: "string",
          label: "Dzie\u0144 Tygodnia",
          required: true,
          options: Array.from({ length: 7 }, (_, i) => i).map((day) => ({
            label: POLISH_DAYS[day],
            value: day.toString()
          }))
        },
        {
          name: "intentions",
          label: "Intencje",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: item.hour || "Nowa intencja"
              };
            }
          },
          fields: [
            {
              name: "hour",
              label: "Godzina",
              type: "string",
              required: true
            },
            {
              name: "intention",
              label: "Intencja",
              type: "rich-text",
              required: true
            }
          ]
        }
      ]
    }
  ]
};

// tina/collections/navigation-collection.ts
var linkField = {
  type: "object",
  name: "links",
  label: "Linki",
  list: true,
  ui: {
    itemProps: (item) => ({
      label: item?.title || "Nowy link"
    })
  },
  indexed: true,
  fields: [
    {
      type: "string",
      name: "title",
      label: "Tytu\u0142",
      required: true,
      isTitle: true
    },
    {
      type: "string",
      name: "path",
      label: "URL",
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Opis"
    }
  ]
};
var groupField = {
  type: "object",
  name: "groups",
  label: "Grupy",
  list: true,
  ui: {
    itemProps: (item) => ({
      label: item?.title || "Nowa grupa"
    })
  },
  indexed: true,
  fields: [
    {
      type: "string",
      name: "title",
      label: "Tytu\u0142",
      required: true,
      isTitle: true
    },
    linkField
  ]
};
var navigationCollection = {
  name: "navigation",
  label: "Nawigacja",
  path: "content/navigation",
  format: "json",
  ui: {
    filename: {
      readonly: true,
      slugify: () => "navigation"
    },
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [groupField]
};

// tina/config.ts
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  schema: {
    collections: [
      navigationCollection,
      intentionsCollection,
      galleryCollection,
      contactCollection
    ]
  }
});
export {
  config_default as default
};
