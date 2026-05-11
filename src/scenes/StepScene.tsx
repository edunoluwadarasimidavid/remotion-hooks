import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { NeonText } from "../components/NeonText";
import { TypewriterText } from "../components/TypewriterText";
import { PhoneMockup } from "../components/PhoneMockup";
import { TapIndicator } from "../components/TapIndicator";
import { GlitchTransition } from "../components/GlitchTransition";

const GREEN = "#39FF14";
const CYAN = "#00e5ff";
const DARK_PANEL = "#111311";

interface StepSceneProps {
  stepNum: number;
  title: string;
  instruction: string;
  typewriterLines?: Array<{ text: string; startDelay: number; color?: string }>;
  showPhone?: boolean;
  phoneContent?: "browser" | "devtools-tabs" | "console" | "network" | "menu";
  tapLocation?: { x: string | number; y: string | number };
  tapStartFrame?: number;
  highlightTabs?: string[];
  terminalLines?: string[];
}

export const StepScene: React.FC<StepSceneProps> = ({
  stepNum,
  title,
  instruction,
  typewriterLines = [],
  showPhone = true,
  phoneContent = "browser",
  tapLocation,
  tapStartFrame = 30,
  highlightTabs = [],
  terminalLines = [],
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [220, 240],
    [1, 0],
    { extrapolateRight: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  const slideIn = interpolate(frame, [0, 10], [50, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  // Progress bar
  const progress = (stepNum / 5) * 100;

  return (
    <AbsoluteFill style={{ opacity }}>
      <Background />
      <GlitchTransition startFrame={0} duration={10} />

      <AbsoluteFill
        style={{
          transform: `translateY(${slideIn}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "50px 50px 30px",
          gap: 16,
        }}
      >
        {/* Step label */}
        <div
          style={{
            opacity: interpolate(frame, [3, 10], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [3, 10], [-10, 0], { extrapolateRight: "clamp" })}px)`,
            fontSize: 22,
            color: `${GREEN}70`,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
            textShadow: `0 0 10px ${GREEN}30`,
          }}
        >
          Step {stepNum}
        </div>

        {/* Title */}
        <NeonText
          text={title}
          startFrame={5}
          fontSize={52}
          glowIntensity={0.7}
        />

        {/* Instruction */}
        <div
          style={{
            opacity: interpolate(frame, [12, 22], [0, 1], { extrapolateRight: "clamp" }),
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'JetBrains Mono', monospace",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
            letterSpacing: 1,
          }}
        >
          {instruction}
        </div>

        {/* Divider */}
        <div
          style={{
            width: interpolate(frame, [18, 30], [0, 200], { extrapolateRight: "clamp" }),
            height: 2,
            background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
            borderRadius: 1,
            boxShadow: `0 0 8px ${GREEN}`,
          }}
        />

        {/* Phone + content area */}
        <div
          style={{
            display: "flex",
            gap: 30,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flex: 1,
            minHeight: 0,
          }}
        >
          {showPhone && (
            <div style={{ position: "relative" }}>
              <PhoneMockup startFrame={15}>
                {phoneContent === "browser" && <BrowserScreen frame={frame} />}
                {phoneContent === "devtools-tabs" && <DevToolsTabsScreen frame={frame} highlightTabs={highlightTabs} />}
                {phoneContent === "console" && <ConsoleScreen frame={frame} />}
                {phoneContent === "network" && <NetworkScreen frame={frame} />}
                {phoneContent === "menu" && <MenuScreen frame={frame} />}
              </PhoneMockup>
              {tapLocation && (
                <TapIndicator
                  x={tapLocation.x}
                  y={tapLocation.y}
                  startFrame={tapStartFrame}
                />
              )}
            </div>
          )}

          {/* Terminal / typewriter area */}
          <div
            style={{
              flex: 1,
              maxWidth: 520,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              alignSelf: "center",
            }}
          >
            {/* Typewriter lines */}
            {typewriterLines.map((line, i) => (
              <div
                key={i}
                style={{
                  opacity: interpolate(
                    frame,
                    [line.startDelay, line.startDelay + 6],
                    [0, 1],
                    { extrapolateRight: "clamp" }
                  ),
                }}
              >
                {line.text.startsWith("$") ? (
                  <span style={{ color: GREEN, fontSize: 24, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                    ${" "}
                    <TypewriterText
                      text={line.text.slice(2)}
                      startFrame={line.startDelay + 3}
                      speed={2.5}
                      color={line.color || CYAN}
                      fontSize={24}
                    />
                  </span>
                ) : (
                  <TypewriterText
                    text={line.text}
                    startFrame={line.startDelay}
                    speed={2.5}
                    color={line.color || "#aaa"}
                    fontSize={22}
                  />
                )}
              </div>
            ))}

            {/* Terminal window */}
            {terminalLines.length > 0 && (
              <div
                style={{
                  opacity: interpolate(frame, [25, 35], [0, 1], { extrapolateRight: "clamp" }),
                  transform: `translateY(${interpolate(frame, [25, 35], [15, 0], { extrapolateRight: "clamp" })}px)`,
                  background: DARK_PANEL,
                  borderRadius: 14,
                  border: `1.5px solid ${GREEN}25`,
                  padding: "18px 20px",
                  boxShadow: `0 0 20px ${GREEN}10`,
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                    paddingBottom: 10,
                    borderBottom: `1px solid ${GREEN}15`,
                  }}
                >
                  {[
                    { c: "#ff5f56" },
                    { c: "#ffbd2e" },
                    { c: "#27c93f" },
                  ].map((dot, i) => (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: dot.c,
                      }}
                    />
                  ))}
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 13,
                      color: `${GREEN}50`,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    mises
                  </span>
                </div>
                {terminalLines.map((line, i) => (
                  <div key={i} style={{ marginTop: i > 0 ? 6 : 0 }}>
                    <TypewriterText
                      text={line}
                      startFrame={35 + i * 15}
                      speed={2.5}
                      color={i === 0 ? CYAN : i === terminalLines.length - 1 ? GREEN : "#888"}
                      fontSize={18}
                    />
                  </div>
                ))}
              </div>
            )}
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
              color: GREEN,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              minWidth: 50,
              textShadow: `0 0 8px ${GREEN}40`,
            }}
          >
            {stepNum}/5
          </span>
          <div
            style={{
              flex: 1,
              height: 3,
              background: `${GREEN}15`,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${GREEN}, ${CYAN})`,
                boxShadow: `0 0 8px ${GREEN}`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ─── Phone screen contents ─── */

const BrowserScreen: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#0e0e0e",
      display: "flex",
      flexDirection: "column",
      padding: "40px 16px 16px",
      gap: 12,
    }}
  >
    {/* Address bar */}
    <div
      style={{
        height: 42,
        background: "#1a1a1a",
        borderRadius: 22,
        border: `1.5px solid ${GREEN}20`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: `${GREEN}40`,
        }}
      />
      <span
        style={{
          fontSize: 14,
          color: "#666",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        example.com
      </span>
    </div>
    {/* Page content mockup */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, padding: "10px 4px" }}>
      <div style={{ height: 24, width: "70%", background: "#222", borderRadius: 6 }} />
      <div style={{ height: 14, width: "100%", background: "#1a1a1a", borderRadius: 4 }} />
      <div style={{ height: 14, width: "90%", background: "#1a1a1a", borderRadius: 4 }} />
      <div style={{ height: 14, width: "95%", background: "#1a1a1a", borderRadius: 4 }} />
      <div style={{ marginTop: 10, height: 120, width: "100%", background: "#1a1a1a", borderRadius: 8 }} />
      <div style={{ marginTop: 6, height: 14, width: "80%", background: "#1a1a1a", borderRadius: 4 }} />
      <div style={{ height: 14, width: "60%", background: "#1a1a1a", borderRadius: 4 }} />
    </div>
    {/* Three-dot menu indicator */}
    <div
      style={{
        position: "absolute",
        top: 52,
        right: 20,
        display: "flex",
        gap: 3,
        opacity: interpolate(frame, [20, 30], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: GREEN,
          }}
        />
      ))}
    </div>
  </div>
);

const DevToolsTabsScreen: React.FC<{ frame: number; highlightTabs?: string[] }> = ({
  frame,
  highlightTabs = [],
}) => {
  const tabs = ["Elements", "Console", "Network", "Sources", "Application"];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: DARK_PANEL,
        display: "flex",
        flexDirection: "column",
        padding: "40px 0 0",
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${GREEN}15`,
          overflow: "hidden",
        }}
      >
        {tabs.map((tab, i) => {
          const isHighlighted = highlightTabs.includes(tab);
          const tabOpacity = interpolate(frame, [10 + i * 4, 18 + i * 4], [0, 1], {
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={tab}
              style={{
                opacity: tabOpacity,
                padding: "10px 12px",
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                color: isHighlighted ? GREEN : "#555",
                borderBottom: isHighlighted ? `2px solid ${GREEN}` : "2px solid transparent",
                textShadow: isHighlighted ? `0 0 8px ${GREEN}` : "none",
                background: isHighlighted ? `${GREEN}08` : "transparent",
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>
      {/* Panel body */}
      <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ height: 16, width: "80%", background: "#1a1a1a", borderRadius: 4 }} />
        <div style={{ height: 16, width: "60%", background: "#1a1a1a", borderRadius: 4 }} />
        <div style={{ marginTop: 8, height: 16, width: "90%", background: "#1a1a1a", borderRadius: 4 }} />
        <div style={{ height: 16, width: "70%", background: "#1a1a1a", borderRadius: 4 }} />
        {/* Highlighted element row */}
        <div
          style={{
            marginTop: 12,
            height: 40,
            background: `${GREEN}10`,
            border: `1px solid ${GREEN}30`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            opacity: interpolate(frame, [30, 40], [0, 1], { extrapolateRight: "clamp" }),
            boxShadow: `0 0 12px ${GREEN}15`,
          }}
        >
          <span style={{ fontSize: 12, color: CYAN, fontFamily: "'JetBrains Mono', monospace" }}>
            {"<div class=\"hero\">"}
          </span>
        </div>
      </div>
    </div>
  );
};

const ConsoleScreen: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: DARK_PANEL,
      display: "flex",
      flexDirection: "column",
      padding: "40px 14px 14px",
      gap: 12,
    }}
  >
    {/* Console prompt */}
    <div style={{ opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateRight: "clamp" }) }}>
      <span style={{ color: "#555", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
        {`>`}{" "}
      </span>
      <span style={{ color: CYAN, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
        console.log(&quot;Hello from Android&quot;)
      </span>
    </div>
    {/* Output */}
    <div
      style={{
        paddingLeft: 18,
        opacity: interpolate(frame, [25, 35], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      <span style={{ color: GREEN, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
        Hello from Android
      </span>
    </div>
    {/* More console output */}
    <div style={{ marginTop: 8, opacity: interpolate(frame, [38, 48], [0, 1], { extrapolateRight: "clamp" }) }}>
      <span style={{ color: "#555", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
        {`>`}{" "}
      </span>
      <span style={{ color: "#888", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
        document.title
      </span>
    </div>
    <div
      style={{
        paddingLeft: 18,
        opacity: interpolate(frame, [50, 58], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      <span style={{ color: "#aaa", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
        &quot;Example Domain&quot;
      </span>
    </div>
  </div>
);

const NetworkScreen: React.FC<{ frame: number }> = ({ frame }) => {
  const requests = [
    { name: "index.html", status: 200, size: "12.4 KB", time: "234ms" },
    { name: "style.css", status: 200, size: "8.1 KB", time: "189ms" },
    { name: "app.js", status: 200, size: "45.2 KB", time: "312ms" },
    { name: "api/data", status: 200, size: "2.8 KB", time: "156ms" },
    { name: "image.png", status: 304, size: "0 B", time: "98ms" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: DARK_PANEL,
        display: "flex",
        flexDirection: "column",
        padding: "40px 0 0",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          padding: "8px 12px",
          borderBottom: `1px solid ${GREEN}10`,
          gap: 8,
          opacity: interpolate(frame, [5, 12], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {["Name", "Status", "Size", "Time"].map((h) => (
          <span
            key={h}
            style={{
              fontSize: 11,
              color: "#555",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              flex: h === "Name" ? 2 : 1,
            }}
          >
            {h}
          </span>
        ))}
      </div>
      {/* Request rows */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {requests.map((req, i) => (
          <div
            key={req.name}
            style={{
              display: "flex",
              padding: "7px 12px",
              borderBottom: "1px solid #1a1a1a",
              opacity: interpolate(frame, [12 + i * 8, 20 + i * 8], [0, 1], {
                extrapolateRight: "clamp",
              }),
              transform: `translateX(${interpolate(frame, [12 + i * 8, 20 + i * 8], [-20, 0], {
                extrapolateRight: "clamp",
              })}px)`,
            }}
          >
            <span
              style={{
                flex: 2,
                fontSize: 12,
                color: "#aaa",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {req.name}
            </span>
            <span
              style={{
                flex: 1,
                fontSize: 12,
                color: req.status === 200 ? GREEN : "#ffbd2e",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
              }}
            >
              {req.status}
            </span>
            <span
              style={{
                flex: 1,
                fontSize: 12,
                color: "#666",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {req.size}
            </span>
            <span
              style={{
                flex: 1,
                fontSize: 12,
                color: "#666",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {req.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MenuScreen: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#0e0e0e",
      display: "flex",
      flexDirection: "column",
      padding: "40px 16px 16px",
      position: "relative",
    }}
  >
    {/* Address bar */}
    <div
      style={{
        height: 42,
        background: "#1a1a1a",
        borderRadius: 22,
        border: `1.5px solid ${GREEN}20`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        marginBottom: 12,
      }}
    >
      <span style={{ fontSize: 14, color: "#666", fontFamily: "'JetBrains Mono', monospace" }}>
        example.com
      </span>
    </div>
    {/* Menu overlay */}
    <div
      style={{
        position: "absolute",
        top: 100,
        right: 16,
        width: 200,
        background: "#1a1a1a",
        borderRadius: 12,
        border: `1px solid ${GREEN}20`,
        boxShadow: `0 0 20px rgba(0,0,0,0.5)`,
        padding: "8px 0",
        opacity: interpolate(frame, [15, 25], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(frame, [15, 25], [-10, 0], { extrapolateRight: "clamp" })}px)`,
      }}
    >
      {["New tab", "Bookmarks", "History", "Developer Tools", "Settings"].map((item, i) => (
        <div
          key={item}
          style={{
            padding: "10px 16px",
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            color: item === "Developer Tools" ? GREEN : "#aaa",
            fontWeight: item === "Developer Tools" ? 700 : 400,
            background: item === "Developer Tools" ? `${GREEN}10` : "transparent",
            opacity: interpolate(frame, [20 + i * 4, 28 + i * 4], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
);
