import { useCurrentFrame, interpolate, Easing } from "remotion";

const GREEN = "#39FF14";
const CYAN = "#00e5ff";

interface NeonTextProps {
  text: string;
  startFrame?: number;
  color?: "green" | "cyan" | "white";
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number | string;
  letterSpacing?: number;
  glitch?: boolean;
  glowIntensity?: number;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

export const NeonText: React.FC<NeonTextProps> = ({
  text,
  startFrame = 0,
  color = "green",
  fontSize = 48,
  fontFamily = "'Bebas Neue', 'Impact', 'Arial Narrow', sans-serif",
  fontWeight = 700,
  letterSpacing = 4,
  glitch = false,
  glowIntensity = 0.5,
  align = "center",
  style,
}) => {
  const frame = useCurrentFrame();

  const colorMap = {
    green: GREEN,
    cyan: CYAN,
    white: "#ffffff",
  };
  const c = colorMap[color];

  const slideIn = interpolate(frame, [startFrame, startFrame + 8], [-60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });
  const fadeIn = interpolate(
    frame,
    [startFrame, startFrame + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Glitch effect — rapid horizontal offset flickers
  const glitchOffset =
    glitch && frame > startFrame + 10
      ? interpolate(
          frame,
          [startFrame + 10, startFrame + 12, startFrame + 14, startFrame + 16],
          [0, 8, -6, 0],
          { extrapolateRight: "clamp" }
        )
      : 0;

  const glitchOpacity =
    glitch && frame > startFrame && frame < startFrame + 20
      ? interpolate(
          frame,
          [startFrame + 8, startFrame + 9, startFrame + 10, startFrame + 11],
          [1, 0.3, 1, 0.6],
          { extrapolateRight: "clamp" }
        )
      : 1;

  // Color separation for glitch
  const showGlitchLayer = glitch && frame > startFrame && frame < startFrame + 18;

  return (
    <div
      style={{
        position: "relative",
        opacity: fadeIn * glitchOpacity,
        transform: `translateY(${slideIn}px) translateX(${glitchOffset}px)`,
        textAlign: align,
        ...style,
      }}
    >
      {/* Glitch layer — cyan offset */}
      {showGlitchLayer && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            color: CYAN,
            fontSize,
            fontFamily,
            fontWeight,
            letterSpacing,
            textTransform: "uppercase",
            textShadow: `0 0 ${20 * glowIntensity}px ${CYAN}80`,
            opacity: 0.6,
            transform: `translateX(3px)`,
            clipPath: "inset(20% 0 60% 0)",
            zIndex: 1,
          }}
        >
          {text}
        </div>
      )}
      {/* Glitch layer — red offset */}
      {showGlitchLayer && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            color: "#ff0040",
            fontSize,
            fontFamily,
            fontWeight,
            letterSpacing,
            textTransform: "uppercase",
            textShadow: `0 0 ${20 * glowIntensity}px #ff004080`,
            opacity: 0.5,
            transform: `translateX(-3px)`,
            clipPath: "inset(60% 0 10% 0)",
            zIndex: 1,
          }}
        >
          {text}
        </div>
      )}
      {/* Main text */}
      <div
        style={{
          color: c,
          fontSize,
          fontFamily,
          fontWeight,
          letterSpacing,
          textTransform: "uppercase",
          textShadow: `0 0 ${20 * glowIntensity}px ${c}80, 0 0 ${40 * glowIntensity}px ${c}40`,
          lineHeight: 1.1,
          position: "relative",
          zIndex: 2,
        }}
      >
        {text}
      </div>
    </div>
  );
};
