import { ContentBlock } from "@/blocks/ContentBlock";
import { HeroBlock } from "@/blocks/HeroBlock";
import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
    slug: "pages",
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
        },
        {
            name: "layout",
            type: "blocks",
            required: true,
            blocks: [ HeroBlock, ContentBlock ]
        }
    ],
} 