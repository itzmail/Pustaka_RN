import {ADD_SONG, ADD_TOKEN, GET_TOKEN, INCREMENT, DECREMENT} from './types';

export function addSong(song) {
  return {
    type: ADD_SONG,
    payload: song,
  };
}

export const addToken = data => {
  return {
    type: ADD_TOKEN,
    payload: data,
  };
};

export const getToken = () => {
  return {
    type: GET_TOKEN,
  };
};

export const increment = numb => {
  return {
    type: INCREMENT,
    payload: numb,
  };
};

export const decrement = numb => {
  return {
    type: DECREMENT,
    payload: numb,
  };
};
