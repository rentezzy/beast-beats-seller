import { useGetArtistsFullQuery } from "../../store/slices/api/artistsApi";
import LoadingElement from "../ui/LoadingElement";
import ArtistPost from "./ArtistPost";

const Artists = () => {
  const { data, isLoading } = useGetArtistsFullQuery(null);

  if (isLoading) return <LoadingElement />;
  if (!data) return <h1>No artists here.</h1>;

  return (
    <div className="container">
      {data.map((artist) => {
        return <ArtistPost key={artist._id} artist={artist} />;
      })}
    </div>
  );
};

export default Artists;
