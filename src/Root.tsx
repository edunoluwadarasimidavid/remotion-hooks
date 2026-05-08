import { Composition } from "remotion";
import { ReactAndroidShort } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReactAndroidShort"
        component={ReactAndroidShort}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
