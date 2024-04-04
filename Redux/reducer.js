// reducers.js

import { combineReducers } from 'redux';

const initialState = {
  strings: [],
  user: {
    userName: '',
    location: '',
    email: '',
    phone: ''
  },
  queries: [],
};
const stringsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STRING':
      const { newString, newResponse } = action.payload;
      return {
        ...state,
        strings: [
          ...state.strings,
          { id: state.strings.length, question: newString, answer: newResponse },
        ],
      };
    default:
      return state;
  }
};
const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload
      };
      case 'UPDATE_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};

const dealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_QUERY':
      const { title, description, endDate,status } = action.payload;
      return {
        ...state,
        queries: [
          ...state.queries,
          {
            id: state.queries.length,
            title: title,
            description: description,
            endDate: endDate,
            status: status, 
          },
        ],
      };
      case 'UPDATE_QUERY':
        const { queryId, newTitle, newDetails, newEndDate, newStatus } = action.payload;
        return {
          ...state,
          queries: state.queries.map(query =>
            query.id === queryId ? { 
              ...query, 
              title: newTitle,
              description: newDetails,
              endDate: newEndDate,
              status: newStatus 
            } : query
          ),
        };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  strings:stringsReducer,
  user: userReducer,
  deals: dealsReducer,
});

export default rootReducer;
