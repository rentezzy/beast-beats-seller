import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useGetMeQuery } from "../store/slices/api/authApi";

const Protect = () => {
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const { isUninitialized } = useGetMeQuery(null);
  const navigate = useNavigate();
  if (!isLogined && !isUninitialized) navigate("/signup");
  return <></>;
};

export default Protect;
