import { ACTION } from "../actions";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return state + action.payload;
    case ACTION.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default counterReducer;
