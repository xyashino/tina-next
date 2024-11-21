// tina/config.ts
import { defineConfig } from "tinacms";

// tina/utils.ts
var getNextDay = (day) => {
  const today = /* @__PURE__ */ new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + (day + 7 - (today.getDay() - 1)) % 7);
  return nextDay.toISOString();
};

// tina/collections/annoucements-collection.ts
var anoucementsCollection = {
  label: "Og\u0142oszenia",
  name: "announcements",
  path: "announcements",
  ui: {
    filename: {
      readonly: true,
      slugify: (data) => data?.title?.toLowerCase().replace(/\s+/g, "-")
    }
  },
  defaultItem: {
    date: getNextDay(0)
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Tytu\u0142",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Opis"
    },
    {
      type: "datetime",
      name: "date",
      label: "Data",
      ui: {
        description: "Ustaw dat\u0119, aby og\u0142oszenie by\u0142o widoczne na stronie. Musi by\u0107 to poniedzia\u0142ek danego tygodnia."
      }
    },
    {
      type: "rich-text",
      name: "body",
      label: "Tre\u015B\u0107"
    }
  ]
};

// tina/collections/contact-collection.ts
var contactCollection = {
  name: "contact",
  label: "Kontakt",
  path: "content/contact",
  format: "json",
  match: {
    include: "contact"
  },
  ui: {
    filename: {
      readonly: true,
      slugify: () => "contact"
    },
    allowedActions: {
      create: false,
      delete: false
    },
    router: () => `/contact`
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
    },
    {
      name: "googleMapsUrl",
      label: "Google Maps URL",
      type: "string",
      required: true
    }
  ]
};

// tina/collections/gallery-collection.ts
import "tinacms";
var galleryCollection = {
  name: "gallery",
  label: "Galeria",
  path: "content/gallery",
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
        itemProps: (item) => ({
          label: item.groupTitle
        })
      },
      fields: [
        {
          type: "string",
          name: "groupTitle",
          label: "Nazwa grupy",
          required: true,
          isTitle: true
        },
        {
          type: "boolean",
          name: "isEnabled",
          label: "Aktywny"
        },
        {
          type: "object",
          name: "images",
          label: "Albumy",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.title
            })
          },
          fields: [
            {
              type: "string",
              name: "title",
              label: "Nazwa albumu",
              required: true
            },
            {
              type: "boolean",
              name: "isEnabled",
              label: "Aktywny"
            },
            {
              type: "string",
              name: "link",
              label: "Link",
              required: true
            },
            {
              type: "image",
              name: "coverPhoto",
              label: "Zdj\u0119cie g\u0142\xF3wne"
            },
            {
              type: "string",
              name: "description",
              label: "Opis"
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
              collections: ["page"],
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

// tina/collections/page-collection.ts
var pageCollection = {
  name: "page",
  label: "Strony",
  path: "content/page",
  format: "mdx",
  ui: {
    filename: {
      readonly: true,
      slugify: (data) => data?.slug?.toLowerCase().replace(/\s+/g, "-")
    },
    router: ({ document }) => {
      return `/page/${document?._sys.filename}`;
    }
  },
  fields: [
    {
      type: "boolean",
      name: "isPublished",
      label: "Opublikuj"
    },
    {
      type: "boolean",
      name: "showTitle",
      label: "Show title"
    },
    {
      type: "string",
      name: "slug",
      label: "Slug",
      required: true,
      ui: {
        description: 'Preferowana warto\u015B\u0107 to "slug" w j\u0119zyku angielskim',
        format: (value) => value?.toLowerCase().replace(/\s+/g, "-") || ""
      }
    },
    {
      type: "image",
      name: "image",
      label: "Image"
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      toolbarOverride: [
        "heading",
        "bold",
        "italic",
        "link",
        "list",
        "quote",
        "table",
        "image",
        "embed"
      ],
      templates: [
        {
          name: "Accordion",
          label: "Accordion",
          fields: [
            {
              type: "string",
              name: "type",
              label: "Type",
              required: true,
              options: ["multiple", "single"]
            },
            {
              type: "object",
              name: "options",
              label: "Options",
              list: true,
              ui: {
                itemProps: (item) => {
                  return {
                    label: item?.title
                  };
                },
                defaultItem: () => {
                  return {
                    uniqueId: crypto.randomUUID()
                  };
                }
              },
              fields: [
                {
                  type: "string",
                  name: "uniqueId",
                  label: "Unique ID",
                  ui: {
                    component: () => null
                  }
                },
                {
                  type: "string",
                  name: "title",
                  label: "Title"
                },
                {
                  type: "rich-text",
                  name: "body",
                  label: "Body",
                  isBody: true
                }
              ]
            }
          ]
        },
        {
          name: "TabsView",
          label: "Tabs View",
          fields: [
            {
              type: "object",
              name: "groups",
              label: "Groups",
              ui: {
                defaultItem: () => {
                  return {
                    tabId: crypto.randomUUID()
                  };
                },
                itemProps: (item) => {
                  return {
                    label: item?.tabTitle
                  };
                }
              },
              list: true,
              fields: [
                {
                  type: "string",
                  name: "tabId",
                  label: "Tab ID"
                },
                {
                  type: "string",
                  name: "tabTitle",
                  label: "Tab Title"
                },
                {
                  type: "rich-text",
                  name: "tabContent",
                  label: "Tab Content",
                  isBody: true
                }
              ]
            }
          ]
        }
      ]
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
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  schema: {
    collections: [
      navigationCollection,
      pageCollection,
      intentionsCollection,
      anoucementsCollection,
      galleryCollection,
      contactCollection
    ]
  }
});
export {
  config_default as default
};
