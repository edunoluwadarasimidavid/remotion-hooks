import { AbsoluteFill, Sequence } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { TitleScene } from "./scenes/TitleScene";
import { StepScene } from "./scenes/StepScene";
import { BonusTipScene } from "./scenes/BonusTipScene";
import { CTAScene } from "./scenes/CTAScene";

const CYAN = "#00e5ff";
const GREEN = "#39FF14";

export const InspectShort: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* ══════ HOOK: DevTools already open (0-2s, frames 0-60) ══════ */}
      <Sequence from={0} durationInFrames={60}>
        <HookScene />
      </Sequence>

      {/* ══════ TITLE: Glitch in (2-4s, frames 60-120) ══════ */}
      <Sequence from={60} durationInFrames={60}>
        <TitleScene />
      </Sequence>

      {/* ══════ STEP 1: Open Mises, navigate (4-12s, frames 120-360) ══════ */}
      <Sequence from={120} durationInFrames={240}>
        <StepScene
          stepNum={1}
          title="Open Mises Browser"
          instruction="Launch Mises and navigate to any website you want to inspect"
          typewriterLines={[
            { text: "$ Launch Mises Browser", startDelay: 20, color: GREEN },
            { text: "$ Tap the URL bar", startDelay: 55 },
            { text: "$ Type: example.com", startDelay: 95, color: CYAN },
            { text: "", startDelay: 140 },
            { text: "Tip: visit mises://inspect", startDelay: 155, color: CYAN },
            { text: "     for direct access", startDelay: 175 },
          ]}
          showPhone
          phoneContent="browser"
          tapLocation={{ x: "50%", y: 90 }}
          tapStartFrame={60}
        />
      </Sequence>

      {/* ══════ STEP 2: Three-dot menu → DevTools (12-20s, frames 360-600) ══════ */}
      <Sequence from={360} durationInFrames={240}>
        <StepScene
          stepNum={2}
          title="Open Developer Tools"
          instruction="Tap the three-dot menu and select Developer Tools"
          typewriterLines={[
            { text: "$ Tap the menu icon", startDelay: 20, color: GREEN },
            { text: "$ (three dots top-right)", startDelay: 50 },
            { text: "$ Select Developer Tools", startDelay: 100, color: CYAN },
          ]}
          showPhone
          phoneContent="menu"
          tapLocation={{ x: "85%", y: 50 }}
          tapStartFrame={40}
        />
      </Sequence>

      {/* ══════ STEP 3: DevTools slides up (20-28s, frames 600-840) ══════ */}
      <Sequence from={600} durationInFrames={240}>
        <StepScene
          stepNum={3}
          title="DevTools Panel Opens"
          instruction="The panel slides up from the bottom of the screen"
          typewriterLines={[
            { text: "$ Panel slides up", startDelay: 20, color: GREEN },
            { text: "$ Full Chrome DevTools!", startDelay: 65, color: CYAN },
            { text: "", startDelay: 110 },
            { text: "Tabs available:", startDelay: 125 },
            { text: "  Elements  Console", startDelay: 145, color: CYAN },
            { text: "  Network   Sources", startDelay: 170, color: CYAN },
          ]}
          showPhone
          phoneContent="devtools-tabs"
          highlightTabs={["Elements", "Console", "Network"]}
        />
      </Sequence>

      {/* ══════ STEP 4: Console tab (28-36s, frames 840-1080) ══════ */}
      <Sequence from={840} durationInFrames={240}>
        <StepScene
          stepNum={4}
          title="Use the Console"
          instruction="Run JavaScript directly on any website"
          typewriterLines={[
            { text: "$ Tap the Console tab", startDelay: 20, color: GREEN },
            { text: "", startDelay: 60 },
            { text: "Try this command:", startDelay: 75 },
          ]}
          terminalLines={[
            '> console.log("Hello from Android")',
            "Hello from Android",
            "",
            "> document.querySelector('h1')",
            "<h1>...</h1>",
          ]}
          showPhone
          phoneContent="console"
        />
      </Sequence>

      {/* ══════ STEP 5: Network tab (36-44s, frames 1080-1320) ══════ */}
      <Sequence from={1080} durationInFrames={240}>
        <StepScene
          stepNum={5}
          title="Monitor Network"
          instruction="See every request the page makes in real time"
          typewriterLines={[
            { text: "$ Tap the Network tab", startDelay: 20, color: GREEN },
            { text: "$ Watch requests load", startDelay: 60 },
            { text: "$ Check status codes", startDelay: 100, color: CYAN },
            { text: "", startDelay: 140 },
            { text: "200 OK → Success", startDelay: 160, color: GREEN },
            { text: "404 → Not Found", startDelay: 185 },
          ]}
          showPhone
          phoneContent="network"
        />
      </Sequence>

      {/* ══════ BONUS TIP (44-52s, frames 1320-1560) ══════ */}
      <Sequence from={1320} durationInFrames={240}>
        <BonusTipScene />
      </Sequence>

      {/* ══════ CTA (52-60s, frames 1560-1800) ══════ */}
      <Sequence from={1560} durationInFrames={240}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
