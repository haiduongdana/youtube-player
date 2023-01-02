import { secondsToDuration } from "../../helper/video.helper";
import { YoutubeVideo, videoWatching } from "../../redux/features/youtube-video/youtubeVideoSlice";
import { useDispatch, useSelector } from 'react-redux';
import "./YoutubeVideoList.css";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const YoutubeVideoList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
	const youtubeVideos = useSelector((state: RootState) => state.youtubeVideo.videos)

  const onVideoClicked = (video: YoutubeVideo) => {
    dispatch(videoWatching(video))
    navigate("/video")
  }

  return (
    <div>
      <h2 className="youtube-videos-title">Videos</h2>
      <div className="youtube-video-list">
        {youtubeVideos.map(v =>
          <div key={v.id} className="youtube-video-card">
            <div className="youtube-video-card__thumbnail-container" onClick={() => onVideoClicked(v)}>
              <img className="youtube-video-card__thumbnail-img" src={v.thumbnailUrl} alt={v.title} />
            </div>
            <div className="youtube-video-card__info">
              <h3 className="youtube-video-card__title" onClick={() => onVideoClicked(v)}>{v.title}</h3>
              <span className="youtube-video-card__duration-title">Duration</span>
              <span className="youtube-video-card__duration-time">{secondsToDuration(v.duration)}</span>
              { v.played && <span className="youtube-video-card__played">PLAYED</span> }
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default YoutubeVideoList;