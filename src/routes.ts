import React from 'react';


export const routes = [
  {
    path: "/",
    component: React.lazy(() => import("./components/YoutubeVideoList/YoutubeVideoList"))
  },
  {
    path: "/video",
    component: React.lazy(() => import("./components/YoutubeVideoPlayerView/YoutubeVideoPlayerView"))
  }
]