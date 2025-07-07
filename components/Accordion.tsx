import React, { useState } from 'react';
import { IconChevronDown } from './Icon';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-700/50 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left text-slate-200 hover:text-cyan-400 focus:outline-none transition-colors"
            >
                <span className="font-semibold text-base">{title}</span>
                <IconChevronDown
                    className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="pb-4 pt-1 text-slate-300 text-sm leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );
};