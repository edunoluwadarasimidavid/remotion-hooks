import { useCurrentFrame, interpolate } from "remotion";

const GREEN = "#39FF14";
const CYAN = "#00e5ff";

interface PhoneMockupProps {
  children?: React.ReactNode;
  startFrame?: number;
  glowColor?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  startFrame = 0,
  glowColor = GREEN,
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [startFrame, startFrame + 10], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const borderGlow = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [0.2, 0.5],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        width: 420,
        height: 780,
        borderRadius: 44,
        border: `2.5px solid ${glowColor}${Math.round(borderGlow * 255)
          .toString(16)
          .padStart(2, "0")}`,
        boxShadow: `0 0 30px ${glowColor}30, inset 0 0 20px ${glowColor}08`,
        background: "#111111",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 160,
          height: 32,
          background: "#0a0a0a",
          borderRadius: "0 0 20px 20px",
          zIndex: 10,
        }}
      />
      {/* Side button */}
      <div
        style={{
          position: "absolute",
          right: -3,
          top: 120,
          width: 4,
          height: 60,
          background: "#222",
          borderRadius: 2,
        }}
      />
      {/* Screen content */}
      <div
        style={{
          position: "absolute",
          inset: 8,
          borderRadius: 36,
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {children}
      </div>
    </div>
  );
};
