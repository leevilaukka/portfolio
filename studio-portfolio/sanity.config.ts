import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { markdownSchema } from 'sanity-plugin-markdown'
import { documentInternationalization } from '@sanity/document-internationalization'

const i18n = documentInternationalization({
  supportedLanguages: [{
    id: 'en',
    title: 'English',
  }, {
    id: 'fi',
    title: 'Finnish',
  }],
  schemaTypes: ['work', 'education', 'project', "profile"],
})

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: 'xbwio4d9',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), markdownSchema(), i18n],

  schema: {
    types: schemaTypes,
  },
})
