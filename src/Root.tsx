import { Composition } from "remotion";
import { InspectShort } from "./InspectShort";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InspectShort"
        component={InspectShort}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
