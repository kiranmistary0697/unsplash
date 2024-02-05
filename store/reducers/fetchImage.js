import {
  FETCH_IMAGE_FAILURE,
  FETCH_IMAGE_SUCCESS,
  FETCH_IMAGE_REQUEST,
} from "../actionTypes";

const initialState = {
  loading: false,
  images: [],
  error: "",
};

const fetchImages = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload,
        error: "",
      };
    case FETCH_IMAGE_FAILURE:
      return {
        loading: false,
        images: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchImages;
