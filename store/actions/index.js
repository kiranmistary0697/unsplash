import {
  FETCH_IMAGE_REQUEST,
  FETCH_IMAGE_SUCCESS,
  FETCH_IMAGE_FAILURE,
  FETCH_SINGLE_IMAGE_REQUEST,
  FETCH_SINGLE_IMAGE_SUCCESS,
  FETCH_SINGLE_IMAGE_FAILURE,
} from "../actionTypes";
import axios from "axios";

const clientId = process.env.NEXT_PUBLIC_ACCESS_KEY;

const fetchImageRequest = () => {
  return {
    type: FETCH_IMAGE_REQUEST,
  };
};

export const fetchImageSuccess = (image) => {
  return {
    type: FETCH_IMAGE_SUCCESS,
    payload: image,
  };
};

export const fetchImageFailure = (error) => {
  return {
    type: FETCH_IMAGE_FAILURE,
    payload: error,
  };
};

const fetchSingleImageRequest = () => {
  return {
    type: FETCH_SINGLE_IMAGE_REQUEST,
  };
};

const fetchSingleImageSuccess = (image) => {
  return {
    type: FETCH_SINGLE_IMAGE_SUCCESS,
    payload: image,
  };
};

export const fetchSingleImageFailure = (error) => {
  return {
    type: FETCH_SINGLE_IMAGE_FAILURE,
    payload: error,
  };
};

export const fetchSingleImage = () => {
  return async (dispatch) => {
    try {
      console.log("SINGLE API");
      const clientId = process.env.NEXT_PUBLIC_ACCESS_KEY;
      const imageId = "_XLmDKEvxrk";
      const response = await axios.get(
        `https://api.unsplash.com/photos/${imageId}`,
        {
          headers: {
            Authorization: `Client-ID ${clientId}`,
          },
        }
      );
      const image = response.data;
      dispatch(fetchSingleImageSuccess(image));
    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchSingleImageFailure(errorMsg));
    }
  };
};

export const fetchImage = (limit) => {
  console.log("FETCH IMG");
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos?page=${limit}&client_id=${clientId}`
      );
      const image = response.data;
      dispatch(fetchImageSuccess(image));
    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchImageFailure(errorMsg));
    }
  };
};
