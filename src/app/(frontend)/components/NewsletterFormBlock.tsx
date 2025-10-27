"use client"
import { Page } from '@/payload-types'
import React from 'react'

type NewsletterFormProps = Extract<Page["layout"][0], { blockType: "newsletter-form" }>
export default function NewsletterFormBlock({ block }: { block: NewsletterFormProps }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // console.log(e.target)
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        console.log(data);
    }
    return (
        <div style={{
            marginTop: ".5rem",
            padding: "1rem",
            // border: "1px solid red",
        }}>
            {
                typeof block.form === "object" && block?.form?.title === "newsletter-form-1" && (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                        width: "100%",
                        paddingBottom: "20px"
                    }}>
                        <h2>{block.heading}</h2>
                        <form className="form" onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
                            {block?.form?.fields?.map((field: any) => (
                                <div key={field.name} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    marginTop: "15px"
                                }}>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    <input id={field.name} name={field.name} type={field.blockType}
                                        required={field.required}
                                        placeholder={field.label}
                                        style={{
                                            padding: "10px", borderRadius: "5px", border: "1px solid #ccc", outlineColor: "#000"
                                        }} />
                                </div>
                            ))}
                            <button type="submit" style={{ margin: "15px" }}>{block.form.submitButtonLabel || "Submit"}</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
