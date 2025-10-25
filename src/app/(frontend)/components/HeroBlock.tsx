import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import React from 'react'

type HeroProps = Extract<Page["layout"][0], { blockType: "hero" }>
export default function HeroBlock({ block }: { block: HeroProps }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid red",
            padding: "1rem"
        }}>
            <div style={{
                fontSize: "2rem",
                fontWeight: 700
            }}>{block.heading}</div>
            <RichText data={block.subheading} />
            {typeof block?.image === 'object' && block?.image?.url && (
                <Image src={block.image.url} alt={block.image.alt} width={400} height={300} priority />
            )}
            <a href={block?.cta_btn?.url}>{block?.cta_btn?.label}</a>
        </div>
    )
}
