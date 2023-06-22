import FilterForm from "./FilterForm";
import MusicFeed from "./Music/MusicFeed";

const Store = () => {
  return (
    <div>
      <div className="container">
        <FilterForm />
        <MusicFeed />
      </div>
    </div>
  );
};

export default Store;
