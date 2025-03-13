import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const params = useParams();

  return <div>{params.id}번 영화입니다~</div>;
};

export default MovieDetail;
