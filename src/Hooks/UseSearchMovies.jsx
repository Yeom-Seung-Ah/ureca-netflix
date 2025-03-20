import { useQuery } from "@tanstack/react-query";
import api from "./../utils/api";

const UseSearchMovies1 = ({ keyword }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}`)
    : api.get(`/movie/popular`);
};

export const UseSearchMovies2 = ({ keyword }) => {
  return useQuery({
    queryKey: ["movie-search", keyword],
    queryFn: () => UseSearchMovies1({ keyword }),
    select: (result) => result.data, //필요한것만 가져오기
  });
};
