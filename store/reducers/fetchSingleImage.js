import {
  FETCH_SINGLE_IMAGE_FAILURE,
  FETCH_SINGLE_IMAGE_SUCCESS,
  FETCH_SINGLE_IMAGE_REQUEST,
} from "../actionTypes";

const initialState = {
  loading: false,
  image: [],
  error: "",
};

const fetchSingleImage = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SINGLE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        image: action.payload,
        error: "",
      };
    case FETCH_SINGLE_IMAGE_FAILURE:
      return {
        loading: false,
        image: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchSingleImage;
