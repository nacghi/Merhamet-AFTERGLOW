import React from 'react';

interface NovelTextRendererProps {
  content: string;
  className?: string;
  isArabic?: boolean;
}

export const NovelTextRenderer: React.FC<NovelTextRendererProps> = ({
  content,
  className = '',
  isArabic = false,
}) => {
  if (!content) return null;

  // Split by double newlines into blocks
  const rawBlocks = content.split(/\n\s*\n/);

  return (
    <div
      className={`space-y-5 ${isArabic ? 'font-arabic text-right leading-loose text-lg' : 'novel-prose'} ${className}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {rawBlocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Divider / Scene Break (***, ---, ___, ✦)
        if (/^(\*{3,}|-{3,}|_{3,}|✦\s*✦\s*✦)/.test(trimmed)) {
          return (
            <div key={idx} className="my-8 flex items-center justify-center gap-2 text-[#7899c4]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e39264]/60" />
              <span className="w-2 h-2 rounded-full bg-[#7899c4]/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#e39264]/60" />
            </div>
          );
        }

        // H1 or H2 Heading (e.g. ## Title)
        if (trimmed.startsWith('# ')) {
          return (
            <h1
              key={idx}
              className={`font-bold text-2xl sm:text-3xl text-[#edf4fd] mt-6 mb-3 ${
                isArabic ? 'font-arabic' : 'font-display tracking-wide'
              }`}
            >
              {trimmed.replace(/^#\s+/, '')}
            </h1>
          );
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={idx}
              className={`font-bold text-xl sm:text-2xl text-[#edf4fd] mt-6 mb-2 ${
                isArabic ? 'font-arabic text-[#e39264]' : 'font-display'
              }`}
            >
              {trimmed.replace(/^##\s+/, '')}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={idx}
              className={`font-semibold text-lg text-[#dce7f5] mt-5 mb-2 ${
                isArabic ? 'font-arabic' : 'font-display'
              }`}
            >
              {trimmed.replace(/^###\s+/, '')}
            </h3>
          );
        }

        // Blockquote (starts with >)
        if (trimmed.startsWith('>')) {
          const quoteText = trimmed.replace(/^>\s*/gm, '');
          return (
            <blockquote
              key={idx}
              className={`my-6 p-4 rounded-xl bg-[#091124]/70 border-l-2 ${
                isArabic
                  ? 'border-r-2 border-l-0 border-[#e39264] text-right font-arabic'
                  : 'border-[#e39264] text-left font-serif'
              }`}
            >
              <p className="italic text-base sm:text-lg leading-relaxed text-[#c9dcef]">
                {quoteText}
              </p>
            </blockquote>
          );
        }

        // Standard Paragraph
        return (
          <p
            key={idx}
            className={`text-base sm:text-lg leading-relaxed text-[#d3e0ed] ${
              !isArabic && idx === 0 ? 'first-of-chapter' : ''
            } ${isArabic ? 'font-arabic' : 'font-serif'}`}
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};
