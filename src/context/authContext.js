import React, { useContext, useReducer } from "react";
import { setToken, getToken, deleteToken } from "@constant";
import { getProfile } from "@services/user";
import toast from "react-hot-toast";

const SIGN_OUT = "SIGN_OUT";
const SIGN_IN = "SIGN_IN";
const UPDATE = "UPDATE";

const Context = React.createContext();

export const useAuth = () => {
  const user = useContext(Context);
  return user;
};

const initialState = {
  auth: false,
  firstName: "",
  lastName: "",
  username: "",
  mobile: "",
  profile: "",
  _id: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return { ...state, ...action.payload };
    }
    case SIGN_OUT: {
      deleteToken();
      return initialState;
    }
    case UPDATE: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export const Provider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);

  const signIn = (data) => {
    dispatch({ type: SIGN_IN, payload: { ...data, auth: true } });
  };

  const signOut = (history) => {
    dispatch({ type: SIGN_OUT });
    history.push("/login");
  };

  const updateUser = (data) => {
    dispatch({ type: UPDATE, payload: { ...data, auth: true } });
  };

  const getUser = async () => {
    try {
      const { data } = await getProfile();

      dispatch({ type: UPDATE, payload: { ...data.data, auth: true } });
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
      setTimeout(() => {
        signOut();
      }, 100);
    }
  };

  return (
    <Context.Provider
      value={{ ...value, signIn, signOut, updateUser, getUser }}
    >
      {children}
    </Context.Provider>
  );
};
