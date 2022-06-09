import axios from "axios";
import { createContext, useReducer } from "react";
export const NewsContextAPI = createContext({});
const NewsContextWrapper = ({ children }) => {
  const initialState = {
    data: {},
    loading: false,
    error: "",
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: true };
      case "SUCCESS":
        return { ...state, data: action.payload, loading: false };
      case "ERROR":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const getNews = async (page = 1, pageSize = 6) => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=trade&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${pageSize}`
      );
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
      } else {
        dispatch({ type: "ERROR", payload: error.message });
      }
    }
  };
  return (
    <NewsContextAPI.Provider
      value={{
        state,
        getNews,
      }}
    >
      {children}
    </NewsContextAPI.Provider>
  );
};
export default NewsContextWrapper;
