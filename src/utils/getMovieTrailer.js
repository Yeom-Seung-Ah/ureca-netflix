import api from "./api"; // 기존에 작성한 Axios 인스턴스

export const getMovieTrailer = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`, {
      params: {
        language: "ko", //필요시 언어 변경
      },
    });

    const videos = response.data.results;

    if (videos.length > 0) {
      // 'Trailer' 타입 비디오를 찾음
      let video = videos.find((video) => video.type === "Trailer");

      // 'Trailer' 비디오가 없으면, 'Clip'이나 다른 비디오 타입을 찾음
      if (!video) {
        video = videos.find((video) => video.type === "Clip");
      }

      // 'Clip'도 없다면, 메이킹 영상이나 인터뷰를 찾을 수 있음
      if (!video) {
        video = videos.find(
          (video) =>
            video.type === "Behind the Scenes" || video.type === "Interview"
        );
      }

      // 비디오가 있을 경우, 해당 비디오 URL을 반환
      if (video) {
        const videoUrl = `https://www.youtube.com/watch?v=${video.key}`;
        console.log("Video URL:", videoUrl);
        return videoUrl;
      }
    }

    console.log("No suitable video found.");
    return null;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};
