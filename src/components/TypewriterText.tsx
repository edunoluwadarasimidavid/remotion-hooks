import { useCurrentFrame, interpolate } from "remotion";

const GREEN = "#39FF14";

interface TypewriterTextProps {
  text: string;
  startFrame: number;
  speed?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number | string;
  letterSpacing?: number;
  showCursor?: boolean;
  cursorChar?: string;
  lineHeight?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame,
  speed = 2,
  color = GREEN,
  fontSize = 28,
  fontFamily = "'JetBrains Mono', 'Courier New', monospace",
  fontWeight = 600,
  letterSpacing = 1,
  showCursor = true,
  cursorChar = "▋",
  lineHeight = 1.5,
}) => {
  const frame = useCurrentFrame();

  const charsToShow = Math.max(
    0,
    Math.min(Math.floor((frame - startFrame) * speed), text.length)
  );
  const visible = text.slice(0, charsToShow);
  const isComplete = charsToShow >= text.length;
  const cursorBlink = Math.floor(frame / 8) % 2 === 0;
  const showBlinkCursor = showCursor && (!isComplete || cursorBlink);

  return (
    <span
      style={{
        color,
        fontSize,
        fontFamily,
        fontWeight,
        letterSpacing,
        lineHeight,
        textShadow: `0 0 10px ${color}60`,
        display: "inline",
      }}
    >
      {visible}
      {showBlinkCursor && (
        <span
          style={{
            opacity: 1,
            color,
            textShadow: `0 0 8px ${color}`,
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};
