import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useGetMeQuery } from "../store/slices/api/authApi";
import { Roles } from "../types/auth.types";

export const Protect = () => {
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const { isUninitialized } = useGetMeQuery(null);
  if (!isLogined && !isUninitialized) return <Navigate to={"/signup"} />;
  return null;
};

interface IRestrictTo {
  roles: Roles[];
}

export const RestrictTo: React.FC<IRestrictTo> = ({ roles }) => {
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const { data, isUninitialized } = useGetMeQuery(null);
  if ((!isLogined && !isUninitialized) || !roles.includes(data!.role))
    return <Navigate to={"/signup"} />;
  return null;
};
