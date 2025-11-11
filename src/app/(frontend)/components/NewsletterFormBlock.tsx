"use client"
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React, { useState } from 'react'
type FormState = {
    loading: boolean,
    error: string | null,
    success: boolean
}
type NewsletterFormProps = Extract<Page["layout"][0], { blockType: "newsletter-form" }>
export default function NewsletterFormBlock({ block }: { block: NewsletterFormProps }) {
    const [formState, setFormState] = useState<FormState>({
        loading: false,
        error: null,
        success: false
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // console.log(e.target)
        e.preventDefault();
        if (!block?.form || typeof block.form !== "object") return;

        setFormState({
            loading: true,
            error: null,
            success: false
        })

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        try {
            const response = await fetch("/api/form-submissions", {
                method: "POST",
                body: JSON.stringify({
                    form: block.form.id,
                    submissionData: Object.entries(data)?.map(([field, value]) => {
                        return {
                            field,
                            value: value as string
                        }
                    })
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
            if (!response.ok) {
                throw new Error("Failed to submit form");
            }


            setFormState({
                loading: false,
                error: null,
                success: true
            });
            (e.target as HTMLFormElement).reset();

            setTimeout(() => {
                setFormState({
                    loading: false,
                    error: null,
                    success: true
                });
            }, 5000);
        } catch (error) {
            console.error('err', error);
            setFormState({
                loading: false,
                error: "Failed to submit form",
                success: false
            });
        }
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
                            {
                                formState.error && <p style={{ color: "red" }}>{formState.error}</p>
                            }
                            {
                                formState.success ? <div style={{ color: "green" }}>
                                    <RichText data={block?.form?.confirmationMessage!} />
                                </div> :
                                    <button type="submit" style={{ margin: "15px" }}>{block.form.submitButtonLabel || "Submit"}</button>

                            }
                        </form>
                    </div>
                )
            }
        </div>
    )
}
