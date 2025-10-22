"use client";

import { useParams } from "next/navigation";

const Anime = () => {
  const { id } = useParams();
  return <div>Anime {id}</div>;
};
export default Anime;
