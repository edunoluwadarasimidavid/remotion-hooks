import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { NeonText } from "../components/NeonText";
import { GlitchTransition } from "../components/GlitchTransition";

const GREEN = "#39FF14";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [48, 60], [1, 0], {
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Step label fades in first
  const stepOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const stepY = interpolate(frame, [5, 15], [15, 0], {
    extrapolateRight: "clamp",
  });

  // Progress line animates
  const lineWidth = interpolate(frame, [15, 35], [0, 300], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <Background />
      <GlitchTransition startFrame={0} duration={15} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "0 80px",
        }}
      >
        {/* Step label */}
        <div
          style={{
            opacity: stepOpacity,
            transform: `translateY(${stepY}px)`,
            fontSize: 24,
            color: `${GREEN}70`,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
            textShadow: `0 0 10px ${GREEN}30`,
          }}
        >
          How To
        </div>

        {/* Main title with glitch */}
        <NeonText
          text="Inspect Any Website"
          startFrame={10}
          fontSize={72}
          glitch
          glowIntensity={0.8}
        />
        <NeonText
          text="on Mises Browser"
          startFrame={18}
          color="cyan"
          fontSize={72}
          glitch
          glowIntensity={0.8}
        />

        {/* Divider line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
            borderRadius: 2,
            boxShadow: `0 0 10px ${GREEN}`,
            marginTop: 10,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            opacity: interpolate(frame, [25, 40], [0, 1], {
              extrapolateRight: "clamp",
            }),
            marginTop: 10,
            fontSize: 26,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: 2,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Full Chrome DevTools on your Android phone
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
