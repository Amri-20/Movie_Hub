import { useEffect,useState } from "react"

function useLikedMovies() {
    const [likedMovies,setLikedMovies]=useState(()=>{
        try {
            const savedMovies=localStorage.getItem("likedMovies");
            return savedMovies?JSON.parse(savedMovies):[];
        } catch {
            return [];
        }
    });

    useEffect(()=>{
        localStorage.setItem("likedMovies",JSON.stringify(likedMovies));
    },[likedMovies]);

    const isLiked=(movieId)=>{
        return likedMovies.some((movie)=>movie.id===movieId)
    }

    const onToggleLike=(movie)=>{
        setLikedMovies((previousMovies)=>previousMovies.some((item)=>item.id===movie.id)?previousMovies.filter((item)=>item.id!==movie.id):[...previousMovies,movie]);
    };
  return {likedMovies,isLiked,onToggleLike}
}

export default useLikedMovies