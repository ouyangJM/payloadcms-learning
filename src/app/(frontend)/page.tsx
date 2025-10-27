import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { Page } from '@/payload-types'
import HeroBlock from './components/HeroBlock'
import ContentBlock from './components/ContentBlock'
import NewsletterFormBlock from './components/NewsletterFormBlock'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const { docs: [page] } = await payload.find({
    collection: 'pages', where: {
      slug: {
        equals: "landing-page"
      }
    }
  })

  const renderBlock = (block: Page['layout'][0]) => {
    switch (block.blockType) {
      case "hero":
        return <HeroBlock key={block.id} block={block} />;
      case "content":
        return <ContentBlock key={block.id} block={block} />;
      case "newsletter-form":
        return <NewsletterFormBlock key={block.id} block={block} />;
      default:
        return null;
    }
  }

  if (!page) {
    return <div>Page not found.</div>
  }

  return (
    <div>
      {page.title}
      {/* <pre>
        {JSON.stringify(page.layout[0], null, 0)}
      </pre> */}
      <div className="page">
        {
          page.layout?.map(block => {
            return renderBlock(block);
          })
        }
      </div>
    </div>

  )
}
