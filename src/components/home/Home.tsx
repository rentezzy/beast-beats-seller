import { useGetAppInfoQuery } from "../../store/slices/api/appApi";
import Ticker from "../ui/Ticker";

const Home = () => {
  const { data, isSuccess } = useGetAppInfoQuery(null);

  return (
    <div>
      <Ticker text={isSuccess ? data.ticker : ""} />
    </div>
  );
};

export default Home;
