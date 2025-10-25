import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

type ContentProps = Extract<Page["layout"][0], { blockType: "content" }>
export default function ContentBlock({ block }: { block: ContentProps }) {
    return (
        <div style={{
            marginTop: ".5rem",
            padding: "1rem",
            border: "1px solid red",
        }}>
            <div>{block.Heading}</div>
            <RichText data={block.Content} />
        </div>
    )
}
