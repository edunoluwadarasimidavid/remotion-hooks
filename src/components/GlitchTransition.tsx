import { AbsoluteFill, useCurrentFrame, interpolate, random } from "remotion";

const GREEN = "#39FF14";
const CYAN = "#00e5ff";

interface GlitchTransitionProps {
  startFrame?: number;
  duration?: number;
  intensity?: number;
}

export const GlitchTransition: React.FC<GlitchTransitionProps> = ({
  startFrame = 0,
  duration = 12,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();

  const relFrame = frame - startFrame;
  if (relFrame < 0 || relFrame > duration) return null;

  const opacity = interpolate(
    relFrame,
    [0, 3, duration - 3, duration],
    [0, 0.8, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Generate pseudo-random strips based on frame
  const strips = Array.from({ length: 20 }, (_, i) => {
    const seed = i * 137 + relFrame * 7;
    const y = (seed * 7919) % 100;
    const height = ((seed * 6271) % 4) + 1;
    const offsetX = (((seed * 5051) % 40) - 20) * intensity;
    const colorShift = (seed * 3011) % 3;
    const color = colorShift === 0 ? GREEN : colorShift === 1 ? CYAN : "#ff0040";
    const stripOpacity = ((seed * 4073) % 50 + 30) / 100;

    return { y, height, offsetX, color, stripOpacity };
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        pointerEvents: "none",
        zIndex: 200,
        background: "rgba(10,10,10,0.3)",
      }}
    >
      {strips.map((strip, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${strip.offsetX}%`,
            top: `${strip.y}%`,
            width: "120%",
            height: `${strip.height}%`,
            background: strip.color,
            opacity: strip.stripOpacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
