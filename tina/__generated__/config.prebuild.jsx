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
var getNextDay = (day) => {
  const today = /* @__PURE__ */ new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + (day + 7 - (today.getDay() - 1)) % 7);
  return nextDay.toISOString();
};
var INITIAL_INTENTIONS = Array.from({ length: 7 }, (_, i) => i).map((day) => ({
  day: day.toString(),
  date: getNextDay(day),
  intentions: [{ hour: "09:00", intention: "" }]
}));
var intentionsCollection = {
  name: "intentions",
  label: "Intencje",
  path: "content/intentions",
  format: "json",
  defaultItem: {
    title: "Intencje parafialne",
    startDate: getNextDay(0),
    days: INITIAL_INTENTIONS,
    isActive: true
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
      name: "isActive",
      label: "Aktywny",
      type: "boolean",
      required: true
    },
    {
      name: "startDate",
      label: "Data rozpocz\u0119cia",
      type: "datetime",
      required: true,
      searchable: true
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
          isTitle: true,
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
import { ReferenceField, TextField } from "tinacms";
var getElementType = (props, num) => {
  const currentField = props.field.name.split(".").slice(0, num);
  const formValues = props.form.getState().values;
  let selectedValue = formValues;
  for (let i = 0; i < num; i++) {
    selectedValue = selectedValue[currentField[i]];
  }
  return selectedValue.type;
};
var navigationCollection = {
  name: "navigation",
  label: "Nawigacja",
  path: "content/navigation",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [
    {
      type: "object",
      name: "groups",
      label: "Grupy",
      list: true,
      ui: {
        defaultItem: {
          isEnabled: true
        },
        itemProps: (item) => {
          const linksLength = item?.links?.length || 0;
          if (linksLength === 0) {
            return {
              label: `Nowa Grupa/Link`
            };
          }
          const isLink = item?.links?.length === 1;
          return {
            label: `(${isLink ? "Link" : "Grupa"}) - ${item?.label}`
          };
        }
      },
      fields: [
        {
          type: "string",
          name: "label",
          label: "Nazwa grupy"
        },
        {
          type: "boolean",
          name: "isEnabled",
          label: "Aktywny"
        },
        {
          type: "object",
          name: "links",
          label: "Podstrony",
          description: "Gdy b\u0119dzie tylko jedna podstrona, to grupa b\u0119dzie renderowana jako link.",
          list: true,
          ui: {
            defaultItem: {
              type: "page" /* PAGE */
            },
            itemProps: (item) => {
              return {
                label: item?.name
              };
            }
          },
          fields: [
            {
              type: "string",
              name: "type",
              label: "Typ linku",
              options: [
                {
                  label: "Strona",
                  value: "page" /* PAGE */
                },
                {
                  label: "URL zewn\u0119trzny",
                  value: "external" /* EXTERNAL */
                }
              ]
            },
            {
              type: "string",
              name: "name",
              label: "Nazwa linku"
            },
            {
              type: "reference",
              name: "page",
              label: "Strona",
              collections: ["pages"],
              ui: {
                component: (props) => {
                  const selectedValue = getElementType(props, 4);
                  if (selectedValue === "external" /* EXTERNAL */) {
                    return null;
                  }
                  return ReferenceField(props);
                }
              }
            },
            {
              type: "string",
              name: "externalUrl",
              label: "URL zewn\u0119trzny",
              ui: {
                component: (props) => {
                  const selectedValue = getElementType(props, 4);
                  if (selectedValue === "page" /* PAGE */) {
                    return null;
                  }
                  return TextField(props);
                }
              }
            },
            {
              type: "string",
              name: "description",
              label: "Opis linku",
              ui: {
                component: "textarea"
              }
            }
          ]
        }
      ]
    }
  ]
};

// tina/collections/pages-collection.ts
var pagesCollection = {
  name: "pages",
  label: "Strony",
  path: "content/pages",
  format: "json",
  ui: {
    filename: {
      readonly: true,
      slugify: (values) => {
        return `${values?.slug?.toLowerCase().replace(/ /g, "-")}` || "";
      }
    }
  },
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
      name: "slug",
      label: "URL strony",
      required: true,
      description: "Np. '/o-nas' utworzy stron\u0119 '/o-nas'"
    },
    {
      type: "string",
      name: "description",
      label: "Opis",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "template",
      label: "Szablon strony",
      options: [
        {
          label: "Strona domowa",
          value: "home"
        },
        {
          label: "Strona standardowa",
          value: "default"
        },
        {
          label: "Strona kontaktowa",
          value: "contact"
        }
      ],
      required: true
    },
    {
      type: "rich-text",
      name: "content",
      label: "Tre\u015B\u0107",
      isBody: true
    },
    {
      type: "boolean",
      name: "isPublished",
      label: "Opublikowany"
    },
    {
      type: "datetime",
      name: "createdAt",
      label: "Data utworzenia",
      ui: {
        dateFormat: "DD MMMM YYYY"
      }
    }
  ]
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
      contactCollection,
      pagesCollection
    ]
  }
});
export {
  config_default as default
};
