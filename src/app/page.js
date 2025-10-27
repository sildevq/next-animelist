import AnimeCard from "@/components/anime-card";

const HomePage = () => {
  return (
    <>
      {/* <div className="flex items-center gap-5">
    </div> */}
      <div className="flex flex-wrap gap-5">
        {[...Array(10)].map((_, index) => (
          <AnimeCard
            key={index}
            title="Бог Марс"
            rating="6.34"
            status="Вышло"
            image="https://shikimori.one/system/animes/original/3399.jpg?1711971157"
          />
        ))}
      </div>
    </>
  );
};
export default HomePage;
