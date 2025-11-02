import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/appwrite";

interface GlobalContextType {
  isLoggedIn: boolean;
  user: any | null;
  loading: boolean;
  setUser: (user: any) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  user: null,
  loading: true,
  setUser: () => {},
  setIsLoggedIn: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        setUser,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
