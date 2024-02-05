import { combineReducers } from "redux";
import fetchImages from "./fetchImage";
import fetchSingleImage from "./fetchSingleImage";

const rootReducer = combineReducers({
  allImages: fetchImages,
  imageSingle: fetchSingleImage,
});

export default rootReducer;
