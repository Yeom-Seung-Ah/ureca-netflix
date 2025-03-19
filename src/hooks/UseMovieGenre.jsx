import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const useMovieGenre1 = () => {
  return api.get(`/genre/movie/list`);
};
export const useMovieGenre2 = () => {
  return useQuery({
    queryKey: ["movie-genre"],
    queryFn: useMovieGenre1,
    select: (result) => result.data.genres, //필요한것만 가져오기
    staleTime: 300000, //📍❓❓❓5분 동안 캐시된 데이터를 사용
  });
};
