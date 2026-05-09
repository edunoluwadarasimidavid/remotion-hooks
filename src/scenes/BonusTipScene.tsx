import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { NeonText } from "../components/NeonText";
import { TypewriterText } from "../components/TypewriterText";
import { GlitchTransition } from "../components/GlitchTransition";

const GREEN = "#39FF14";
const CYAN = "#00e5ff";
const DARK_PANEL = "#111311";

export const BonusTipScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [220, 240], [1, 0], {
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Glitch highlight box pulse
  const pulseScale = interpolate(
    frame,
    [0, 120, 240],
    [1, 1.03, 1],
    { extrapolateRight: "clamp" }
  );
  const pulseGlow = interpolate(
    frame,
    [0, 120, 240],
    [0.3, 0.8, 0.3],
    { extrapolateRight: "clamp" }
  );

  // Element highlight box animation
  const highlightOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });
  const highlightScale = interpolate(
    frame,
    [40, 55],
    [0.95, 1],
    {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.3)),
    }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <Background />
      <GlitchTransition startFrame={0} duration={12} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "50px 50px 30px",
          gap: 16,
        }}
      >
        {/* Bonus label */}
        <div
          style={{
            opacity: interpolate(frame, [3, 12], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [3, 12], [-10, 0], { extrapolateRight: "clamp" })}px)`,
            fontSize: 24,
            color: `${CYAN}80`,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: 8,
            textTransform: "uppercase",
            fontWeight: 700,
            textShadow: `0 0 15px ${CYAN}40`,
          }}
        >
          Bonus Tip
        </div>

        {/* Title */}
        <NeonText
          text="Quick Inspect"
          startFrame={8}
          color="cyan"
          fontSize={58}
          glowIntensity={0.7}
          glitch
        />

        {/* Divider */}
        <div
          style={{
            width: interpolate(frame, [18, 28], [0, 200], { extrapolateRight: "clamp" }),
            height: 2,
            background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
            borderRadius: 1,
            boxShadow: `0 0 8px ${CYAN}`,
          }}
        />

        {/* Main content area */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* Phone mockup with element highlight */}
          <div
            style={{
              transform: `scale(${pulseScale})`,
              width: 400,
              height: 560,
              borderRadius: 36,
              border: `2.5px solid ${CYAN}${Math.round(pulseGlow * 255)
                .toString(16)
                .padStart(2, "0")}`,
              boxShadow: `0 0 ${35 * pulseGlow}px ${CYAN}35`,
              background: "#111",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Mock webpage content */}
            <div
              style={{
                padding: "50px 20px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                height: "100%",
              }}
            >
              {/* Fake webpage header */}
              <div style={{ height: 20, width: "60%", background: "#222", borderRadius: 6 }} />
              <div style={{ marginTop: 6, height: 12, width: "90%", background: "#1a1a1a", borderRadius: 4 }} />
              <div style={{ height: 12, width: "80%", background: "#1a1a1a", borderRadius: 4 }} />

              {/* Highlighted element — the clickable target */}
              <div
                style={{
                  marginTop: 16,
                  height: 80,
                  background: "#1a1a1a",
                  borderRadius: 10,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    color: "#555",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {"<button>Click me</button>"}
                </span>

                {/* Glowing highlight box around element */}
                <div
                  style={{
                    position: "absolute",
                    inset: 6,
                    border: `2px solid ${GREEN}`,
                    borderRadius: 8,
                    boxShadow: `0 0 20px ${GREEN}60, inset 0 0 15px ${GREEN}15`,
                    opacity: highlightOpacity,
                    transform: `scale(${highlightScale})`,
                    animation: "none",
                  }}
                >
                  {/* Corner accents */}
                  <div style={{ position: "absolute", top: -4, left: -4, width: 12, height: 12, borderTop: `2px solid ${GREEN}`, borderLeft: `2px solid ${GREEN}` }} />
                  <div style={{ position: "absolute", top: -4, right: -4, width: 12, height: 12, borderTop: `2px solid ${GREEN}`, borderRight: `2px solid ${GREEN}` }} />
                  <div style={{ position: "absolute", bottom: -4, left: -4, width: 12, height: 12, borderBottom: `2px solid ${GREEN}`, borderLeft: `2px solid ${GREEN}` }} />
                  <div style={{ position: "absolute", bottom: -4, right: -4, width: 12, height: 12, borderBottom: `2px solid ${GREEN}`, borderRight: `2px solid ${GREEN}` }} />
                </div>
              </div>

              <div style={{ marginTop: 6, height: 12, width: "85%", background: "#1a1a1a", borderRadius: 4 }} />
              <div style={{ height: 12, width: "70%", background: "#1a1a1a", borderRadius: 4 }} />
            </div>

            {/* Context menu popup */}
            <div
              style={{
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 180,
                background: "#1a1a1a",
                borderRadius: 12,
                border: `1.5px solid ${GREEN}40`,
                boxShadow: `0 0 25px ${GREEN}20`,
                padding: "8px 0",
                opacity: interpolate(frame, [80, 95], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              {["Copy", "Share", "Inspect"].map((item, i) => (
                <div
                  key={item}
                  style={{
                    padding: "10px 18px",
                    fontSize: 15,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: item === "Inspect" ? GREEN : "#aaa",
                    fontWeight: item === "Inspect" ? 700 : 400,
                    background: item === "Inspect" ? `${GREEN}12` : "transparent",
                    borderRadius: 6,
                    margin: "0 6px",
                    opacity: interpolate(frame, [85 + i * 5, 95 + i * 5], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Typewriter instruction */}
          <div
            style={{
              textAlign: "center",
              maxWidth: 700,
              opacity: interpolate(frame, [110, 125], [0, 1], { extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(frame, [110, 125], [15, 0], { extrapolateRight: "clamp" })}px)`,
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: "#fff",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                lineHeight: 1.4,
                textShadow: `0 0 20px ${GREEN}30`,
              }}
            >
              Long-press any element
              <span style={{ color: GREEN, textShadow: `0 0 15px ${GREEN}` }}> → Inspect</span>
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 18,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              No menu navigation needed
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            maxWidth: 600,
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: "auto",
            paddingTop: 20,
          }}
        >
          <span
            style={{
              fontSize: 18,
              color: CYAN,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              minWidth: 50,
              textShadow: `0 0 8px ${CYAN}40`,
            }}
          >
            ★
          </span>
          <div
            style={{
              flex: 1,
              height: 3,
              background: `${CYAN}15`,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(90deg, ${GREEN}, ${CYAN})`,
                boxShadow: `0 0 8px ${CYAN}`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
