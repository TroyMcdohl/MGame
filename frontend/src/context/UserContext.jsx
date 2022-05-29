import React from "react";

const UserContext = React.createContext({
  currentUser: "",
});

export const UserProvider = (props) => {
  const localUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
  };

  return (
    <UserContext.Provider value={{ currentUser: localUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
