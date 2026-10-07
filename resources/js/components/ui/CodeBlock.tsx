import { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
}

export default function CodeBlock({ code, language = 'html', filename }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-[10px] border border-[#334155] bg-[#0F172A] overflow-hidden my-4 shadow-xs">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#334155] bg-[#1E293B]/70 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80"></span>
                    {filename ? (
                        <span className="font-mono text-[#E2E8F0] ml-2 font-medium">{filename}</span>
                    ) : (
                        <span className="uppercase tracking-wider font-semibold text-[10px] ml-2 text-[#CBD5E1]">
                            {language}
                        </span>
                    )}
                </div>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium text-[11px]"
                    title="Salin kode"
                >
                    {copied ? (
                        <span className="text-[#10B981] font-bold">Tersalin ✓</span>
                    ) : (
                        <span>Salin Kode</span>
                    )}
                </button>
            </div>
            <pre className="p-4 text-xs font-mono text-[#E2E8F0] overflow-x-auto leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    );
}
