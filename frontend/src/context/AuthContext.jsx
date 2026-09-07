import {
  useEffect,
  useState
} from "react";

import { AuthContext } from "./auth-context";



export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  const [loading] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);





  const login = (data) => {


    const {
      user,
      token
    } = data;



    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );


    localStorage.setItem(
      "token",
      token
    );


    setUser(user);


  };





  const logout = () => {


    localStorage.removeItem(
      "user"
    );


    localStorage.removeItem(
      "token"
    );


    setUser(null);


  };





  return (

    <AuthContext.Provider

      value={{
        user,
        login,
        logout,
        loading
      }}

    >

      {children}

    </AuthContext.Provider>

  );

};