import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import rootReducer from "./reducers";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

//
// const masterReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     console.log(state,"+++++++",action);
//     const nextState = {
//       ...state,
//       allImages: {
//         images: [{}],
//       },
//       singleImage: {
//         image: [state.singleImage?.image, action.payload?.singleImage?.image],
//       },
//     };
//     return nextState;
//   } else {
//     return rootReducer(state, action);
//   }
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case HYDRATE:
//       // Attention! This will overwrite client state! Real apps should use proper reconciliation.
//       return {...state, ...action.payload};
//     case 'TICK':
//       return {...state, tick: action.payload};
//     default:
//       return state;
//   }
// };

// creating store
export const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;
// const initStore = () => {
//   return createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middleware))
//   );
// };

export const wrapper = createWrapper(makeStore);
