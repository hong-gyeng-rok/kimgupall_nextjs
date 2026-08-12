type SimpleMarkdownProps = {
  text?: string | null;
};

function renderInlineMarkdown(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export default function SimpleMarkdown({ text }: SimpleMarkdownProps) {
  const paragraphs = text
    ?.split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!paragraphs || paragraphs.length === 0) return null;

  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{renderInlineMarkdown(paragraph)}</p>
      ))}
    </div>
  );
}
