import { defineConfig } from 'tinacms'
import {
  anoucementsCollection,
  contactCollection,
  galleryCollection,
  intentionsCollection,
  navigationCollection,
  pageCollection
} from './collections'

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  ''

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,

  branch,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public'
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads'
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
})
