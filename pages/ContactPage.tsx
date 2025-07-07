import React from 'react';
import { AdBanner } from '../components/AdBanner';
import { ContactForm } from '../components/ContactForm';

export const ContactPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-xl ring-1 ring-slate-700 p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
                <p className="text-slate-300 leading-relaxed">
                    We'd love to hear from you! Whether you have a question about our tool, feedback on how we can improve, or a partnership proposal, please don't hesitate to reach out. Fill out the form below, and our team will get back to you as soon as possible.
                </p>
            </div>

            <ContactForm />

            <div className="text-center">
                <AdBanner type="banner" />
            </div>

            <div className="text-center text-slate-400">
                <h2 className="text-xl font-semibold text-white mb-2">Our Office</h2>
                <p>123 AI Street, Tech City, 10101</p>
                <p>Email: contact@imageseoai.com</p>
            </div>
        </div>
    );
};