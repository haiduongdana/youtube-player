import { configureStore } from "@reduxjs/toolkit";
import youtubeVideoReducer from "../redux/features/youtube-video/youtubeVideoSlice";

export const store = configureStore({
  reducer: {
    youtubeVideo: youtubeVideoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;