import React from 'react';
import { Accordion } from './Accordion';

const faqs = [
    {
        question: "What is the Image SEO AI Assistant for?",
        answer: "This tool helps you quickly generate SEO-friendly metadata (titles, descriptions, and tags) for your images. By uploading images, you can use the power of Google's Gemini AI to create optimized content that can improve your website's search engine ranking."
    },
    {
        question: "Is my Gemini API key secure?",
        answer: "Yes. Your API key is stored exclusively in your browser's local storage. It is never sent to our servers or anywhere else. It is only used directly from your browser to communicate with the Google Gemini API."
    },
    {
        question: "What image formats are supported?",
        answer: "You can upload most common image formats, including JPEG, PNG, WEBP, and GIF. The tool will process them and send them to the AI for analysis."
    },
    {
        question: "Why did my image generation fail?",
        answer: "Generation can fail for a few reasons: 1) Your API key might be invalid or have exceeded its usage quota. 2) The image might be corrupted or in an unsupported format. 3) The AI service may be temporarily unavailable or has content safety restrictions. Check the error message for more details."
    },
    {
        question: "Are there any usage limits?",
        answer: "The usage limits are determined by your Google Gemini API key. Google's free tier typically offers a generous number of requests per minute. For higher usage, you may need to enable billing on your Google Cloud project."
    },
];


export const FAQ: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="bg-slate-800/50 rounded-xl ring-1 ring-slate-700 p-6">
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <Accordion key={index} title={faq.question}>
                            <p>{faq.answer}</p>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
};