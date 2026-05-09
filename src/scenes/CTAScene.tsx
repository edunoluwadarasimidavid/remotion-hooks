import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { NeonText } from "../components/NeonText";
import { GlitchTransition } from "../components/GlitchTransition";

const GREEN = "#39FF14";
const CYAN = "#00e5ff";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Line 1 animation
  const line1Opacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line1Y = interpolate(frame, [15, 30], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  // Arrow animation — bounces upward continuously
  const arrowBounce = interpolate(
    frame,
    [35, 45, 55],
    [0, -15, 0],
    { extrapolateRight: "repeat" }
  );
  const arrowOpacity = interpolate(frame, [35, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Line 2 animation (comes after line 1)
  const line2Opacity = interpolate(frame, [80, 95], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [80, 95], [25, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  // Logo pulse
  const logoScale = interpolate(
    frame,
    [100, 115, 130, 145, 160, 175, 190, 205, 220, 235],
    [0.9, 1.05, 0.95, 1.03, 0.97, 1.02, 0.98, 1.01, 0.99, 1],
    { extrapolateRight: "clamp" }
  );
  const logoGlow = interpolate(
    frame,
    [100, 140, 180, 220],
    [0.3, 0.7, 0.5, 0.8],
    { extrapolateRight: "clamp" }
  );
  const logoOpacity = interpolate(frame, [95, 110], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Corner decorations fade in
  const cornerOpacity = interpolate(frame, [120, 140], [0, 0.5], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <Background />
      <GlitchTransition startFrame={0} duration={15} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 70px",
          gap: 24,
        }}
      >
        {/* Line 1 — Full tutorial CTA */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 34,
              color: "#fff",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              lineHeight: 1.4,
              maxWidth: 850,
              textShadow: `0 0 20px ${GREEN}30`,
            }}
          >
            Watch the full tutorial on
          </div>
          <NeonText
            text="Smart Tech Programming"
            startFrame={20}
            fontSize={48}
            glowIntensity={0.9}
          />
          {/* Upward arrow */}
          <div
            style={{
              marginTop: 16,
              opacity: arrowOpacity,
              transform: `translateY(${arrowBounce}px)`,
              fontSize: 48,
              color: GREEN,
              textShadow: `0 0 25px ${GREEN}`,
              lineHeight: 1,
            }}
          >
            👆
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: interpolate(frame, [65, 80], [0, 250], { extrapolateRight: "clamp" }),
            height: 2,
            background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
            borderRadius: 1,
            boxShadow: `0 0 10px ${GREEN}`,
            opacity: interpolate(frame, [65, 80], [0, 1], { extrapolateRight: "clamp" }),
          }}
        />

        {/* Line 2 — Follow CTA */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              lineHeight: 1.4,
              maxWidth: 750,
            }}
          >
            Follow for more Android dev tips
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 10,
            opacity: interpolate(frame, [100, 115], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {["LIKE", "SUBSCRIBE", "SHARE"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 18,
                color: GREEN,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: 3,
                fontWeight: 700,
                padding: "10px 24px",
                border: `1.5px solid ${GREEN}40`,
                borderRadius: 10,
                background: `${GREEN}08`,
                textShadow: `0 0 10px ${GREEN}30`,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Logo / Channel branding */}
        <div
          style={{
            marginTop: 40,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Hexagonal logo mark */}
          <div
            style={{
              width: 80,
              height: 80,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: `2.5px solid ${GREEN}`,
                borderRadius: 20,
                transform: "rotate(45deg)",
                boxShadow: `0 0 ${25 * logoGlow}px ${GREEN}${Math.round(logoGlow * 200)
                  .toString(16)
                  .padStart(2, "0")}`,
              }}
            />
            <div
              style={{
                fontSize: 28,
                color: GREEN,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 900,
                textShadow: `0 0 15px ${GREEN}`,
                zIndex: 2,
              }}
            >
              ST
            </div>
          </div>

          <div
            style={{
              fontSize: 22,
              color: `${GREEN}80`,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: 5,
              textTransform: "uppercase",
              fontWeight: 700,
              textShadow: `0 0 15px ${GREEN}40`,
            }}
          >
            Smart Tech Programming
          </div>
        </div>
      </AbsoluteFill>

      {/* Corner frame decorations */}
      {[
        { top: 40, left: 40 },
        { top: 40, right: 40 },
        { bottom: 40, left: 40 },
        { bottom: 40, right: 40 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 50,
            height: 50,
            borderTop: `2px solid ${GREEN}${Math.round(cornerOpacity * 128)
              .toString(16)
              .padStart(2, "0")}`,
            borderLeft: `2px solid ${GREEN}${Math.round(cornerOpacity * 128)
              .toString(16)
              .padStart(2, "0")}`,
            opacity: cornerOpacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
