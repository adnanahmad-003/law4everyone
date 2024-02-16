// reducers.js

import { combineReducers } from 'redux';

const initialState = {
  strings: [],
};

const stringsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STRING':
      
      return {
        ...state,
        strings: [
          ...state.strings,
          { id: state.strings.length, value: action.payload },
        ]
         // Create a new state object with updated nextId
      };
      
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  strings: stringsReducer,
});

export default rootReducer;
