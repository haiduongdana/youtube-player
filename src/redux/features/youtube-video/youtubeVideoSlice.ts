import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { findIndex, remove } from "lodash";

export interface YoutubeVideo {
  id: string,
  title: string,
  thumbnailUrl: string,
  duration: number,
  played: boolean
};

type YoutubeVideos = {
  videos: YoutubeVideo[],
  videoWatching: YoutubeVideo|null
};

const initialState: YoutubeVideos = {
  videos: [],
  videoWatching: null
};

export const youtubeVideoSlice = createSlice({
  name: 'youtubeVideo',
  initialState,
  reducers: {
    addVideoes: (state, action: PayloadAction<YoutubeVideo[]>) => {
      state.videos = [...action.payload]
    },
    videoWatching: (state, action: PayloadAction<YoutubeVideo>) => {
      state.videoWatching = action.payload
    },
    addVideo: (state, action: PayloadAction<YoutubeVideo>) => {
      state.videos.push({ ...action.payload })
    },
    removeVideo: (state, action: PayloadAction<string>) => {
      state.videos = remove(state.videos, (v) => v.id === action.payload)
    },
    editVideoTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
      const indexVideoEditing = findIndex(state.videos, ['id', action.payload.id])
      if (indexVideoEditing >= 0) {
        const newVideoEdited = {
          ...state.videos[indexVideoEditing],
          title: action.payload.title
        }
        state.videos = [...state.videos.slice(0, indexVideoEditing), newVideoEdited, ...state.videos.slice(indexVideoEditing + 1)]
      }
    },
    clearAllVideos: (state) => {
      state.videos = initialState.videos
    },
    markVideoPlayed:  (state, action: PayloadAction<string>) => {
      const indexVideoEditing = findIndex(state.videos, ['id', action.payload])
      if (indexVideoEditing >= 0) {
        const newVideoEdited = {
          ...state.videos[indexVideoEditing],
          played: true
        }
        state.videos = [...state.videos.slice(0, indexVideoEditing), newVideoEdited, ...state.videos.slice(indexVideoEditing + 1)]
      }
    }
  },
});

export const { addVideoes, addVideo, removeVideo, editVideoTitle, clearAllVideos, markVideoPlayed, videoWatching } = youtubeVideoSlice.actions;

export default youtubeVideoSlice.reducer;