import React, { useReducer } from "react";

export const Context = React.createContext();

function reducer(action, state) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
