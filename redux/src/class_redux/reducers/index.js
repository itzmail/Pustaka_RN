import {combineReducers} from 'redux';
import {songList, tokenUser, counterReducer} from './songReducers';

const AllReducer = combineReducers({
  counter: counterReducer,
  songs: songList,
  token: tokenUser,
});

export default AllReducer;
