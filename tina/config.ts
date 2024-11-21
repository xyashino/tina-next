import { defineConfig } from 'tinacms'
import {
  anoucementsCollection,
  contactCollection,
  galleryCollection,
  intentionsCollection,
  navigationCollection,
  pageCollection
} from './collections'

export default defineConfig({
  branch: 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

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
