import { Howl, Howler } from "howler";
import { useAppSelector } from "../../../store/hooks";

const Audio = () => {
  const currentTrack = useAppSelector((state) => state.musics.currentTrack);
  const isPlaying = useAppSelector((state) => state.musics.isPlaying);

  if (!currentTrack) return <></>;

  const audio = new Howl({
    src: [`${process.env.REACT_APP_MAIN_API}music/music/${currentTrack._id}`],
    html5: true,
    format: ["mp3"],
  });
  audio.play();

  return <div>Audio</div>;
};

export default Audio;
