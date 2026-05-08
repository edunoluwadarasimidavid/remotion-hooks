import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

/* ─────────────────────────── CONSTANTS ─────────────────────────── */
const GREEN = "#00ff41";
const GREEN_DIM = "rgba(0,255,65,0.15)";
const GREEN_GLOW = "rgba(0,255,65,0.4)";
const BG = "#050505";
const DARK_PANEL = "#0a0f0a";

/* ─────────────────────────── BACKGROUND ─────────────────────────── */
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const gridAlpha = interpolate(frame, [0, 60], [0.02, 0.08], {
    extrapolateRight: "clamp",
  });
  const pulse = interpolate(
    frame,
    [0, 900, 1800],
    [0.03, 0.07, 0.03]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: "hidden" }}>
      {/* Animated grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${GREEN_DIM} 1px, transparent 1px), linear-gradient(90deg, ${GREEN_DIM} 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: gridAlpha,
        }}
      />
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GREEN_GLOW}, transparent)`,
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(120px)",
          opacity: pulse,
        }}
      />
      {/* Scanline effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── TYPING TEXT ─────────────────────────── */
const TypingText: React.FC<{
  text: string;
  startFrame: number;
  speed?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  letterSpacing?: number;
}> = ({
  text,
  startFrame,
  speed = 1.5,
  color = GREEN,
  fontSize = 28,
  fontFamily = "'Courier New', monospace",
  letterSpacing = 1,
}) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.max(
    0,
    Math.floor((frame - startFrame) * speed)
  );
  const visible = text.slice(0, Math.min(charsToShow, text.length));
  const cursorBlink = Math.floor(frame / 10) % 2 === 0;
  const showCursor = charsToShow <= text.length;

  return (
    <span
      style={{
        color,
        fontSize,
        fontFamily,
        letterSpacing,
        fontWeight: 600,
        textShadow: `0 0 12px ${color}60`,
      }}
    >
      {visible}
      {showCursor && (
        <span style={{ opacity: cursorBlink ? 1 : 0, color }}>|</span>
      )}
    </span>
  );
};

/* ─────────────────────────── TERMINAL WINDOW ─────────────────────────── */
const Terminal: React.FC<{
  children: React.ReactNode;
  opacity: number;
  yOffset: number;
}> = ({ children, opacity, yOffset }) => {
  const frame = useCurrentFrame();
  const borderGlow = interpolate(frame, [0, 60], [0.2, 0.5], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${yOffset}px)`,
        width: 920,
        background: DARK_PANEL,
        borderRadius: 20,
        border: `2px solid ${GREEN}${Math.round(borderGlow * 255)
          .toString(16)
          .padStart(2, "0")}`,
        boxShadow: `0 0 30px ${GREEN_GLOW}, inset 0 0 30px rgba(0,255,65,0.03)`,
        overflow: "hidden",
        transition: "none",
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "16px 22px",
          borderBottom: `1px solid ${GREEN_DIM}`,
          background: "rgba(0,255,65,0.03)",
        }}
      >
        {[
          { color: "#ff5f56", shadow: "#ff5f5640" },
          { color: "#ffbd2e", shadow: "#ffbd2e40" },
          { color: "#27c93f", shadow: "#27c93f40" },
        ].map((dot, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: dot.color,
              boxShadow: `0 0 6px ${dot.shadow}`,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 12,
            fontSize: 16,
            color: "rgba(0,255,65,0.5)",
            fontFamily: "'Courier New', monospace",
            letterSpacing: 2,
          }}
        >
          termux ~
        </span>
      </div>
      {/* Terminal body */}
      <div style={{ padding: "26px 28px", minHeight: 80 }}>{children}</div>
    </div>
  );
};

/* ─────────────────────────── PROGRESS BAR ─────────────────────────── */
const ProgressBar: React.FC<{
  step: number;
  total: number;
}> = ({ step, total }) => {
  const pct = (step / total) * 100;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 80,
        right: 80,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <span
        style={{
          fontSize: 20,
          color: GREEN,
          fontFamily: "'Courier New', monospace",
          fontWeight: 700,
          textShadow: `0 0 10px ${GREEN}40`,
          minWidth: 60,
        }}
      >
        {step}/{total}
      </span>
      <div
        style={{
          flex: 1,
          height: 4,
          background: "rgba(0,255,65,0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${GREEN}, #00cc33)`,
            boxShadow: `0 0 10px ${GREEN}`,
            borderRadius: 2,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

/* ─────────────────────────── SCENE RENDERER ─────────────────────────── */
const Scene: React.FC<{
  start: number;
  end: number;
  stepNum: number;
  title: string;
  command?: string;
  extraLines?: string[];
  children?: React.ReactNode;
}> = ({ start, end, stepNum, title, command, extraLines, children }) => {
  const frame = useCurrentFrame();

  const sceneIn = interpolate(frame, [start, start + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const sceneOut = interpolate(frame, [end - 12, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.ease),
  });
  const opacity = Math.min(sceneIn, sceneOut);

  const slideIn = interpolate(frame, [start, start + 12], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const slideOut = interpolate(frame, [end - 12, end], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.ease),
  });
  const yOffset = opacity > 0 ? slideIn + slideOut : 0;

  const titleOpacity = interpolate(
    frame,
    [start + 5, start + 18],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const titleY = interpolate(
    frame,
    [start + 5, start + 18],
    [-20, 0],
    { extrapolateRight: "clamp" }
  );

  const cmdStart = start + 22;

  return (
    <AbsoluteFill
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        padding: "0 80px",
      }}
    >
      {/* Step label */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: `${GREEN}80`,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 10,
            textShadow: `0 0 10px ${GREEN}30`,
          }}
        >
          Step {stepNum}
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: 1,
            textShadow: `0 0 30px ${GREEN}40`,
            lineHeight: 1.2,
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          {title}
        </div>
      </div>

      {/* Terminal or custom content */}
      {children || (
        <Terminal opacity={titleOpacity} yOffset={titleY * 0.5}>
          {command && (
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: "#00cc33", fontSize: 24, fontWeight: 700 }}>
                $
              </span>{" "}
              <TypingText
                text={command}
                startFrame={cmdStart}
                speed={2}
                fontSize={26}
              />
            </div>
          )}
          {extraLines?.map((line, i) => (
            <div key={i} style={{ marginTop: 8 }}>
              <TypingText
                text={line}
                startFrame={cmdStart + (command?.length || 0) * 0.5 + i * 20}
                speed={2}
                fontSize={22}
                color={i === 0 ? "#aaa" : GREEN}
              />
            </div>
          ))}
        </Terminal>
      )}

      <ProgressBar step={stepNum} total={8} />
    </AbsoluteFill>
  );
};

/* ═══════════════════════════ MAIN VIDEO ═══════════════════════════ */
export const ReactAndroidShort: React.FC = () => {
  const frame = useCurrentFrame();

  /* ─── HOOK (0-3s / frames 0-90) ─── */
  const hookOpacity = interpolate(frame, [0, 12, 72, 90], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const hookScale = interpolate(frame, [0, 15], [0.85, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });
  const hookGlow = interpolate(frame, [0, 45, 90], [0.3, 0.8, 0.3]);

  /* ─── CTA (54-60s / frames 1620-1800) ─── */
  const ctaOpacity = interpolate(frame, [1620, 1650], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaPulse = interpolate(
    frame,
    [1650, 1725, 1800],
    [0.95, 1.05, 0.95]
  );

  return (
    <AbsoluteFill>
      <Background />

      {/* ══════ HOOK SCENE ══════ */}
      <AbsoluteFill
        style={{
          opacity: hookOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          transform: `scale(${hookScale})`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: `${GREEN}80`,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 24,
            textShadow: `0 0 15px ${GREEN}40`,
            opacity: interpolate(frame, [8, 20], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Did You Know?
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.15,
            textShadow: `0 0 ${40 * hookGlow}px ${GREEN}${Math.round(
              hookGlow * 200
            )
              .toString(16)
              .padStart(2, "0")}`,
            maxWidth: 950,
          }}
        >
          You can create a{" "}
          <span style={{ color: GREEN, textShadow: `0 0 40px ${GREEN}` }}>
            React project
          </span>{" "}
          on your Android phone
          <span
            style={{
              fontSize: 56,
              marginLeft: 8,
              display: "inline-block",
              animation: "none",
            }}
          >
            <TypingText text=" 🤯" startFrame={45} speed={1} fontSize={56} />
          </span>
        </div>
        <div
          style={{
            marginTop: 40,
            width: 80,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
            borderRadius: 2,
            boxShadow: `0 0 15px ${GREEN}`,
            opacity: interpolate(frame, [25, 40], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        />
      </AbsoluteFill>

      {/* ══════ STEP 1: Install Termux (3-10s) ══════ */}
      <Scene
        start={90}
        end={300}
        stepNum={1}
        title="Install Termux from F-Droid"
        command="Open F-Droid app"
        extraLines={[
          "Search: Termux",
          "Tap Install",
          "",
          " Tip: Get it from f-droid.org",
        ]}
      />

      {/* ══════ STEP 2: pkg update (10-17s) ══════ */}
      <Scene
        start={300}
        end={510}
        stepNum={2}
        title="Update Packages"
        command="pkg update && pkg upgrade"
        extraLines={[" Press Y when prompted", "", " This updates the package list"]}
      />

      {/* ══════ STEP 3: pkg install nodejs (17-24s) ══════ */}
      <Scene
        start={510}
        end={720}
        stepNum={3}
        title="Install Node.js"
        command="pkg install nodejs"
        extraLines={[" Press Y to confirm", "", " This installs Node + npm"]}
      />

      {/* ══════ STEP 4: npm create vite (24-33s) ══════ */}
      <Scene
        start={720}
        end={990}
        stepNum={4}
        title="Create Vite Project"
        command="npm create vite@latest my-app"
        extraLines={["", " This scaffolds a new project"]}
      />

      {/* ══════ STEP 5: Select React + JS (33-39s) ══════ */}
      <Scene start={990} end={1170} stepNum={5} title="Select React & JavaScript">
        <Terminal
          opacity={interpolate(frame, [995, 1010], [0, 1], {
            extrapolateRight: "clamp",
          })}
          yOffset={interpolate(frame, [995, 1010], [20, 0], {
            extrapolateRight: "clamp",
          })}
        >
          <div>
            <TypingText
              text="? Select a framework:"
              startFrame={1010}
              speed={2.5}
              color="#888"
              fontSize={22}
            />
          </div>
          <div style={{ marginTop: 6 }}>
            <TypingText
              text="> React"
              startFrame={1050}
              speed={2}
              color={GREEN}
              fontSize={24}
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <TypingText
              text="? Select a variant:"
              startFrame={1080}
              speed={2.5}
              color="#888"
              fontSize={22}
            />
          </div>
          <div style={{ marginTop: 6 }}>
            <TypingText
              text="> JavaScript"
              startFrame={1110}
              speed={2}
              color={GREEN}
              fontSize={24}
            />
          </div>
        </Terminal>
      </Scene>

      {/* ══════ STEP 6: cd my-app (39-42s) ══════ */}
      <Scene
        start={1170}
        end={1260}
        stepNum={6}
        title="Enter Project Folder"
        command="cd my-app"
        extraLines={["", " You're now inside the project"]}
      />

      {/* ══════ STEP 7: npm install (42-49s) ══════ */}
      <Scene
        start={1260}
        end={1470}
        stepNum={7}
        title="Install Dependencies"
        command="npm install"
        extraLines={[
          "",
          " Installing react, react-dom, vite...",
          "",
          " Done in ~30 seconds",
        ]}
      />

      {/* ══════ STEP 8: npm run dev (49-54s) ══════ */}
      <Scene
        start={1470}
        end={1620}
        stepNum={8}
        title="Start Dev Server"
        command="npm run dev"
        extraLines={[
          "",
          "  VITE v5.0  ready in 2.3s",
          "",
          "  Local: http://localhost:5173",
          "  Your React app is live! 🚀",
        ]}
      />

      {/* ══════ CTA SCENE (54-60s) ══════ */}
      <AbsoluteFill
        style={{
          opacity: ctaOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: `${GREEN}80`,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 30,
            textShadow: `0 0 15px ${GREEN}40`,
            opacity: interpolate(frame, [1630, 1660], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Want More?
        </div>

        <div
          style={{
            transform: `scale(${ctaPulse})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.15,
              textShadow: `0 0 50px ${GREEN}50`,
              maxWidth: 950,
              marginBottom: 30,
              opacity: interpolate(frame, [1640, 1680], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            Full video on my{" "}
            <span style={{ color: GREEN, textShadow: `0 0 40px ${GREEN}` }}>
              channel!
            </span>
            <span
              style={{
                fontSize: 60,
                marginLeft: 8,
              }}
            >
              {" "}
              <TypingText text="🔗" startFrame={1680} speed={0.5} fontSize={60} />
            </span>
          </div>
        </div>

        <div
          style={{
            width: 100,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
            borderRadius: 2,
            boxShadow: `0 0 15px ${GREEN}`,
            marginBottom: 30,
            opacity: interpolate(frame, [1660, 1690], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        />

        <div
          style={{
            display: "flex",
            gap: 24,
            opacity: interpolate(frame, [1680, 1720], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {["LIKE", "SUBSCRIBE", "COMMENT"].map((tag, i) => (
            <div
              key={i}
              style={{
                fontSize: 20,
                color: GREEN,
                fontFamily: "'Courier New', monospace",
                letterSpacing: 3,
                fontWeight: 700,
                padding: "10px 22px",
                border: `1.5px solid ${GREEN}50`,
                borderRadius: 10,
                background: `${GREEN}08`,
                textShadow: `0 0 10px ${GREEN}30`,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 60,
            fontSize: 20,
            color: "rgba(0,255,65,0.3)",
            fontFamily: "'Courier New', monospace",
            letterSpacing: 4,
            opacity: interpolate(frame, [1700, 1750], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          @SmartTechProgramming
        </div>
      </AbsoluteFill>

      {/* ═══ Corner frame decorations ═══ */}
      {[
        {
          top: 40,
          left: 40,
          borderTop: `2px solid ${GREEN}60`,
          borderLeft: `2px solid ${GREEN}60`,
        },
        {
          top: 40,
          right: 40,
          borderTop: `2px solid ${GREEN}60`,
          borderRight: `2px solid ${GREEN}60`,
        },
        {
          bottom: 40,
          left: 40,
          borderBottom: `2px solid ${GREEN}60`,
          borderLeft: `2px solid ${GREEN}60`,
        },
        {
          bottom: 40,
          right: 40,
          borderBottom: `2px solid ${GREEN}60`,
          borderRight: `2px solid ${GREEN}60`,
        },
      ].map((s, i) => (
        <div
          key={i}
          style={{ position: "absolute", width: 60, height: 60, ...s }}
        />
      ))}
    </AbsoluteFill>
  );
};
