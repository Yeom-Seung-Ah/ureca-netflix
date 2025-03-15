import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const useTopRatedMovies1=()=>{
    return api.get(`/movie/top_rated`);
}

export const useTopRatedMovies2=()=>{
    return useQuery({
        queryKey:['movie-top_rated'],
        queryFn: useTopRatedMovies1,
        select:(result)=>result.data, //필요한것만 가져오기
    })
}
