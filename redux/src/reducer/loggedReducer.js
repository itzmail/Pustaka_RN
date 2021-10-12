import { ACTION } from "../actions";

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case ACTION.SIGN_IN:
      return !state;
    default:
      return state;
  }
};

export default loggedReducer;
