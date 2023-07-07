import { useGetArtistsFullQuery } from "../../store/slices/api/artistsApi";
import LoadingElement from "../ui/LoadingElement";
import ArtistPost from "./ArtistPost";

const Artists = () => {
  const { data, isLoading } = useGetArtistsFullQuery(null);

  if (isLoading) return <LoadingElement />;
  if (!data) return <h1>No artists here.</h1>;

  return (
    <div className="container">
      {data.map((artist, index) => {
        return <ArtistPost key={artist._id} artist={artist} pos={index % 2} />;
      })}
    </div>
  );
};

export default Artists;
