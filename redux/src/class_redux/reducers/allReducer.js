import {
  ADD_SONG,
  ADD_TOKEN,
  GET_TOKEN,
  DECREMENT,
  INCREMENT,
} from '../actions/types';

const initialState = {
  songs: [
    {title: 'I love redux'},
    {title: 'The redux song'},
    {title: 'Run to the redux hill'},
  ],
};

const token = {
  token: 'asdfoasiudfoaisdfjoaisjf',
};

export const songList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SONG:
      return {
        songs: [action.payload, ...state.songs],
      };
    default:
      return state;
  }
};

export const tokenUser = (state = token, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return state;
    case GET_TOKEN:
      return (state.token = action.payload);
    default:
      return state;
  }
};

export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};
