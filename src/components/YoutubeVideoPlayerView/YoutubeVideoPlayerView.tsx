import { useRef, useState } from 'react';
import { OnProgressProps } from 'react-player/base';
import ReactPlayer from 'react-player/youtube';
import { useDispatch, useSelector } from 'react-redux';
import { markVideoPlayed } from '../../redux/features/youtube-video/youtubeVideoSlice';
import { RootState } from '../../redux/store';
import ControlsVideoPlayer from './ControlsVideoPlayer';
import "./YoutubeVideoPlayerView.css";

const YoutubeVideoPlayerView = () => {
  const dispatch = useDispatch();
  const videoRef = useRef<any>();
  const videoWatching = useSelector((state: RootState) => state.youtubeVideo.videoWatching);
  const [volume, setVolume] = useState(1);
  const [volumeBar, setVolumeBar] = useState(100);
  const [currentSeek, setCurrentSeek] = useState(0);
  const [totalDurationOfVideo, setTotalDurationOfVideo] = useState(0);
  const [isPlay, setIsPlay] = useState(false);


  const handlePlay = () => {
    if(videoWatching) {
      if(totalDurationOfVideo === 0) {
        setTotalDurationOfVideo(videoRef.current.getDuration())
      }
      setIsPlay(true);
      dispatch(markVideoPlayed(videoWatching.id));
    }
  };

  const handleOnProgress = (state: OnProgressProps) => {
    setCurrentSeek(state.playedSeconds)
  };

  const handleVolumeChange = (volume: number) => {
    setVolume(volume / 100)
    setVolumeBar(volume)
  }

  const handlePause = () => {
    setIsPlay(false);
  };

  const handleSeekChange = (seek: number) => {
    setCurrentSeek(seek)
    videoRef.current.seekTo(seek)
  };

  return (
    <div className="video-container">
      {videoWatching &&
        <ReactPlayer
          onPlay={handlePlay}
          onPause={handlePause}
          ref={videoRef}
          volume={volume}
          playing={isPlay}
          controls={false}
          onProgress={handleOnProgress}
          url={`http://www.youtube.com/embed/${videoWatching.id}`} />
      }
      <ControlsVideoPlayer
        currentSeek={currentSeek}
        playing={isPlay}
        volume={volumeBar}
        handlePause={handlePause}
        handlePlay={handlePlay}
        handleSeekChange={handleSeekChange}
        totalDurationOfVideo={totalDurationOfVideo}
        handleVolumeChange={handleVolumeChange}
      />
    </div>
  )
};

export default YoutubeVideoPlayerView;
