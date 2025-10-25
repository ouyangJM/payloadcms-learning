import { Block } from "payload";

export const ContentBlock: Block = {
    slug: "content",
    fields: [
        {
            name: "Heading",
            type: "text",
            required: true
        },
        {
            name: "Content",
            type: "richText",
            required: true
        }
    ]
}