import { useCurrentFrame, interpolate, Easing } from "remotion";

const GREEN = "#39FF14";

interface TapIndicatorProps {
  x: string | number;
  y: string | number;
  startFrame: number;
  color?: string;
  size?: number;
}

export const TapIndicator: React.FC<TapIndicatorProps> = ({
  x,
  y,
  startFrame,
  color = GREEN,
  size = 60,
}) => {
  const frame = useCurrentFrame();

  const ringScale = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [0.5, 2.5],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.exp),
    }
  );
  const ringOpacity = interpolate(
    frame,
    [startFrame, startFrame + 8, startFrame + 15],
    [0.8, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const dotScale = interpolate(
    frame,
    [startFrame, startFrame + 6, startFrame + 12],
    [0, 1, 0.6],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.5)),
    }
  );
  const dotOpacity = interpolate(
    frame,
    [startFrame + 10, startFrame + 20],
    [1, 0],
    { extrapolateRight: "clamp" }
  );

  const xVal = typeof x === "string" ? x : `${x}px`;
  const yVal = typeof y === "string" ? y : `${y}px`;

  return (
    <div
      style={{
        position: "absolute",
        left: xVal,
        top: yVal,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Expanding ring */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          boxShadow: `0 0 15px ${color}60`,
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          opacity: ringOpacity,
          left: 0,
          top: 0,
        }}
      />
      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          width: size * 0.35,
          height: size * 0.35,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 12px ${color}`,
          transform: `translate(-50%, -50%) scale(${dotScale})`,
          opacity: dotOpacity,
          left: 0,
          top: 0,
        }}
      />
    </div>
  );
};
