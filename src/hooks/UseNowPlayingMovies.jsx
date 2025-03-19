import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const useNowPlayingMovies1 = () => {
  return api.get(`/movie/now_playing`);
};
export const useNowPlayingMovies2 = () => {
  return useQuery({
    queryKey: ["movie-now-playing"],
    queryFn: useNowPlayingMovies1,
    select: (result) => result.data, //필요한것만 가져오기
  });
};
