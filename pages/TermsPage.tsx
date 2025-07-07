import React from 'react';
import { AdBanner } from '../components/AdBanner';

export const TermsPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-xl ring-1 ring-slate-700 p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Terms and Conditions</h1>
                <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
                <p className="mt-4 text-slate-300 leading-relaxed">
                    Please read these terms and conditions carefully before using Our Service.
                </p>
            </div>
            
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <h2 className="text-xl font-semibold text-white">1. Acknowledgment</h2>
                <p>
                    These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service. Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions.
                </p>

                <h2 className="text-xl font-semibold text-white mt-6">2. API Key Usage</h2>
                <p>
                    Our service requires you to use your own Google Gemini API key. By using our service, you agree that you are responsible for any usage costs and for complying with Google's API terms of service. Your API key is stored only in your browser's local storage and is not transmitted to our servers. We are not liable for any misuse or charges related to your API key.
                </p>

                <AdBanner type="banner" />

                <h2 className="text-xl font-semibold text-white mt-6">3. Intellectual Property</h2>
                <p>
                    The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.
                </p>

                <h2 className="text-xl font-semibold text-white mt-6">4. Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service).
                </p>
                
                <h2 className="text-xl font-semibold text-white mt-6">5. Changes to These Terms and Conditions</h2>
                <p>
                    We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
                </p>
            </div>
        </div>
    );
};