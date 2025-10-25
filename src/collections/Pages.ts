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
            required:true,
        },
        // {
        //     name:"",
        //     type:"text",
        //     required:
        // }
    ],
} 