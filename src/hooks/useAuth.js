import { useMemo } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

const useAuth = () => {
  const [cookies, , removeCookie] = useCookies(["jwt_token"]);

  let user = null;
  try {
    user = jwt_decode(cookies?.jwt_token);
    const currentTime = new Date().getTime() / 1000;
    if (currentTime > user.exp) {
      removeCookie("jwt_token", { path: "/", domain: ".yitao.io" });
      user = null;
    }
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
