import FilterForm from "./FilterForm";
import MusicFeed from "./Music/MusicFeed";
import Audio from "./audio/Audio";

const Store = () => {
  return (
    <div>
      <div className="container">
        <FilterForm />
        <MusicFeed />
        <Audio />
      </div>
    </div>
  );
};

export default Store;
