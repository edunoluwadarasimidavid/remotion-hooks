import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const GREEN = "#39FF14";
const BG = "#0a0a0a";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame, [0, 900, 1800], [0.03, 0.07, 0.03]);
  const gridAlpha = interpolate(frame, [0, 60], [0.02, 0.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: "hidden" }}>
      {/* Green grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${GREEN}${Math.round(gridAlpha * 255).toString(16).padStart(2, "0")} 1px, transparent 1px), linear-gradient(90deg, ${GREEN}${Math.round(gridAlpha * 255).toString(16).padStart(2, "0")} 1px, transparent 1px)`,
          backgroundSize: "55px 55px",
        }}
      />
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GREEN}15, transparent 70%)`,
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(100px)",
          opacity: pulse,
        }}
      />
      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
          pointerEvents: "none",
          zIndex: 100,
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
          zIndex: 101,
        }}
      />
    </AbsoluteFill>
  );
};
