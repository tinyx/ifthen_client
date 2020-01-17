import { useMemo } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

const useAuth = () => {
  const [cookies, , removeCookie] = useCookies(["jwt_token"]);
  let user = null;
  try {
    user = jwt_decode(cookies?.jwt_token);
  } catch (error) {}
  return {
    jwt: cookies?.jwt_token,
    user: useMemo(() => user, [cookies?.jwt_token]),
    logout: () => {
      removeCookie("jwt_token", { path: "/", domain: ".yitao.io" });
    }
  };
};

export default useAuth;
