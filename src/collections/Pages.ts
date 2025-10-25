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
            blocks: [
                {
                    slug: "hero",
                    fields: [
                        {
                            name: "heading",
                            type: "text",
                            required: true
                        },
                        {
                            name: "subheading",
                            type: "richText",
                            required: true
                        },
                        {
                            name: "image",
                            type: "upload",
                            required:true,
                            relationTo: "media"
                        },
                        {
                            name: "cta_btn",
                            label: "CTA Button",
                            type: "group",
                            fields: [
                                {
                                    name: "label",
                                    type: "text",
                                    required: true
                                },
                                {
                                    name: "url",
                                    type: "text",
                                    required: true
                                }
                            ],
                        }
                    ]
                }
            ]
        }
    ],
} 