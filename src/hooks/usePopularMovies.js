import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const usePopularMovies1=()=>{
    return api.get(`/movie/popular`);
}

export const usePopularMovies2=()=>{
    return useQuery({
        queryKey:['movie-popular'],
        queryFn: usePopularMovies1,
        select:(result)=>result.data, //필요한것만 가져오기
    })
}