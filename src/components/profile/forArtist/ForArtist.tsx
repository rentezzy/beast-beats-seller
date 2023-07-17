import { RestrictTo } from "../../../utils/Protect";

const ForArtist = () => {
  return (
    <div>
      <RestrictTo roles={["artist"]} />
    </div>
  );
};

export default ForArtist;
