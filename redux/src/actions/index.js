export const ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  SIGN_IN: "sign_in",
};

export const increment = (numb) => {
  return {
    type: ACTION.INCREMENT,
    payload: numb,
  };
};
export const decrement = () => {
  return {
    type: ACTION.DECREMENT,
  };
};

export const changeSign = () => {
  return {
    type: ACTION.SIGN_IN,
  };
};
