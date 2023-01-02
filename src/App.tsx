
import {
	BrowserRouter as Router,
	Routes, Route
} from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { routes } from "./routes";
import { getRecommendations } from "./services";
import { addVideoes, YoutubeVideo } from "./redux/features/youtube-video/youtubeVideoSlice";
import Loading from "./components/Loading/Loading";
import A from "./App.module.css";


function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		getRecommendations().then((response) => {
			if (response.error) {
				return;
			}
			const videosFiltered = response.recommendationsList.filter((info) => info.position >= 0 && info.position < 100) as any[];
			const videoMapped: YoutubeVideo[] = videosFiltered.map(v => ({
				id: v.metadata!.sid,
				title: v.metadata!.title,
				duration: v.metadata!.duration,
				thumbnailUrl: v.metadata!.thumbnailUrl,
				played: false
			}));
			dispatch(addVideoes(videoMapped))
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className={A.app}>
			<Router>
				<Routes>
					{routes.map((route => <Route
						key={route.path}
						path={route.path}
						element={
							<Suspense fallback={<Loading />}>
								<route.component />
							</Suspense>
						}
					/>))}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
