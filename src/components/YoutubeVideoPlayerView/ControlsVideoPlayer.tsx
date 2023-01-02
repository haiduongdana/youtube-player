import { PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons/lib/icons";
import { Slider } from "antd";
import "./ControlsVideoPlayer.css";
import spkearIcon from "../../assests/Speaker.png";
import { Link } from "react-router-dom";
import { secondsToDuration } from "../../helper/video.helper";

interface Props {
  handlePause: () => void,
  handlePlay: () => void,
  playing: boolean,
  volume: number,
  handleVolumeChange: (volume: number) => void,
  handleSeekChange: (seek: number) => void,
  currentSeek: number,
  totalDurationOfVideo: number
}

const ControlsVideoPlayer = ({
  handlePause, handlePlay, playing, volume, handleVolumeChange,
  handleSeekChange, currentSeek, totalDurationOfVideo }: Props) => {
  return (
    <div className="controls-video">
      <div className="player-icon">
        {playing && <PauseCircleFilled style={{ fontSize: "24px", color: "#6185BB" }} onClick={handlePause} />}
        {!playing && <PlayCircleFilled style={{ fontSize: "24px", color: "#6185BB" }} onClick={handlePlay} />}
      </div>
      <div className="controls-video__seek">
        <Slider tooltip={{ formatter: secondsToDuration as any }} value={currentSeek} min={0} max={totalDurationOfVideo} onChange={handleSeekChange} />
      </div>

      <div className="controls-video__volume-container">
        <div className="controls-video__spkear">
          <img src={spkearIcon} alt="" />
        </div>
        <div className="controls-video__volume">
          <Slider vertical value={volume} min={0} max={100} onChange={handleVolumeChange} />
        </div>
        <div className="hidden-shape"></div>
      </div>
      <Link className="controls-video__back-btn" to="/">
        BACK TO HOME
      </Link>
    </div>
  );
}

export default ControlsVideoPlayer;