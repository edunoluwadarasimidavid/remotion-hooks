import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { TypewriterText } from "../components/TypewriterText";

const GREEN = "#39FF14";
const CYAN = "#00e5ff";
const DARK_PANEL = "#111311";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Panel slides in from bottom
  const panelY = interpolate(frame, [0, 15], [300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });
  const panelOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Neon border glow pulses
  const glowPulse = interpolate(frame, [0, 30, 60], [0.3, 0.7, 0.3]);

  // Text fades in
  const textOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [10, 25], [20, 0], {
    extrapolateRight: "clamp",
  });

  // Icon pulse
  const iconScale = interpolate(
    frame,
    [15, 25, 35],
    [0.8, 1.1, 1],
    {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.4)),
    }
  );

  // Exit animation
  const exitOpacity = interpolate(frame, [48, 60], [1, 0], {
    extrapolateRight: "clamp",
  });
  const exitSlide = interpolate(frame, [48, 60], [0, -80], {
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.exp),
  });

  const combinedOpacity = Math.min(panelOpacity, exitOpacity);
  const combinedY = panelY + exitSlide;

  return (
    <AbsoluteFill>
      <Background />

      {/* DevTools Panel — fills screen like it's already open */}
      <AbsoluteFill
        style={{
          opacity: combinedOpacity,
          transform: `translateY(${combinedY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 50px",
        }}
      >
        {/* Large DevTools window */}
        <div
          style={{
            width: "100%",
            maxWidth: 960,
            height: 1500,
            background: DARK_PANEL,
            borderRadius: 24,
            border: `2px solid ${GREEN}${Math.round(glowPulse * 255)
              .toString(16)
              .padStart(2, "0")}`,
            boxShadow: `0 0 ${40 * glowPulse}px ${GREEN}40, inset 0 0 30px ${GREEN}06`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* DevTools header tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              padding: "0 20px",
              borderBottom: `1px solid ${GREEN}20`,
              background: `${GREEN}06`,
              height: 70,
            }}
          >
            {["Elements", "Console", "Network", "Sources"].map((tab, i) => (
              <div
                key={tab}
                style={{
                  padding: "10px 24px",
                  fontSize: 22,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: i === 1 ? GREEN : "#555",
                  fontWeight: 700,
                  letterSpacing: 1,
                  borderBottom: i === 1 ? `2.5px solid ${GREEN}` : "2.5px solid transparent",
                  textShadow: i === 1 ? `0 0 10px ${GREEN}` : "none",
                  opacity: interpolate(frame, [5 + i * 3, 12 + i * 3], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* DevTools body — console content */}
          <div
            style={{
              flex: 1,
              padding: "30px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              overflow: "hidden",
            }}
          >
            {/* Console line 1 */}
            <div
              style={{
                opacity: interpolate(frame, [12, 20], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <span style={{ color: "#555", fontSize: 20, fontFamily: "'JetBrains Mono', monospace" }}>
                {`>`}{" "}
              </span>
              <TypewriterText
                text='document.querySelector("h1")'
                startFrame={15}
                speed={2.5}
                fontSize={22}
                color="#aaa"
              />
            </div>
            {/* Console result */}
            <div
              style={{
                opacity: interpolate(frame, [30, 38], [0, 1], { extrapolateRight: "clamp" }),
                paddingLeft: 24,
              }}
            >
              <span style={{ color: CYAN, fontSize: 20, fontFamily: "'JetBrains Mono', monospace" }}>
                {`<h1 class="title">Hello World</h1>`}
              </span>
            </div>
            {/* Console line 2 */}
            <div
              style={{
                opacity: interpolate(frame, [38, 45], [0, 1], { extrapolateRight: "clamp" }),
                marginTop: 8,
              }}
            >
              <span style={{ color: "#555", fontSize: 20, fontFamily: "'JetBrains Mono', monospace" }}>
                {`>`}{" "}
              </span>
              <TypewriterText
                text='console.log("DevTools active")'
                startFrame={40}
                speed={2.5}
                fontSize={22}
                color="#aaa"
              />
            </div>
            {/* Console result 2 */}
            <div
              style={{
                opacity: interpolate(frame, [52, 58], [0, 1], { extrapolateRight: "clamp" }),
                paddingLeft: 24,
              }}
            >
              <span style={{ color: GREEN, fontSize: 20, fontFamily: "'JetBrains Mono', monospace" }}>
                DevTools active
              </span>
            </div>
          </div>
        </div>

        {/* Overlay text on the panel */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${iconScale})`,
            textAlign: "center",
            opacity: textOpacity,
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: `${GREEN}90`,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: 6,
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 14,
              textShadow: `0 0 20px ${GREEN}40`,
            }}
          >
            Mises Browser
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#fff",
              textShadow: `0 0 50px ${GREEN}60, 0 0 80px ${GREEN}30`,
              lineHeight: 1.1,
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: 3,
            }}
          >
            DevTools
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: GREEN,
              textShadow: `0 0 50px ${GREEN}`,
              lineHeight: 1.1,
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: 3,
            }}
          >
            on Android 🔥
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
