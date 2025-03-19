import { useQuery } from "@tanstack/react-query";
import api from "./../utils/api";

const useUpcomingMovies1 = () => {
  return api.get(`/movie/upcoming`);
};
export const useUpcomingMovies2 = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: useUpcomingMovies1,
    select: (result) => result.data, //필요한것만 가져오기
  });
};
