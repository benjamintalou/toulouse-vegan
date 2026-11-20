/** Renders text where `**mots**` become `<strong>`, styled by `className`. */
export function Emphasis({
  text,
  className = "font-bold",
}: {
  text: string;
  className?: string;
}) {
  return text.split("**").map((part, index) =>
    index % 2 ? (
      <strong key={index} className={className}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
