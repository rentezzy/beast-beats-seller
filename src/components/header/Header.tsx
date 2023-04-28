import { useAppSelector } from "../../store/hooks";
import { useGetMeQuery } from "../../store/slices/authApi";

const Header = () => {
  const { isLoading } = useGetMeQuery(null);
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  useGetMeQuery(null);
  console.log(isLogined);
  return <div>{}</div>;
};

export default Header;
