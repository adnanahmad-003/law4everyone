// actions.js

  export const addString = (newString, newResponse) => ({
    type: 'ADD_STRING',
    payload: { newString, newResponse }, 
  });


export const setUserData = (userData) => ({
  type: 'SET_USER_DATA',
  payload: userData,
});

export const updateLocation = (location) => {
  return {
    type: 'UPDATE_LOCATION',
    payload: location,
  };
};
// add query
export const addQuery = (title, description, endDate , status) => ({
  type: 'ADD_QUERY',
  payload: {
    title,
    description,
    endDate,
    status,
  },
});
//update query
export const updateQuery = (queryId, newTitle, newDetails, newEndDate, newStatus) => ({
  type: 'UPDATE_QUERY',
  payload: {
    queryId,
    newTitle,
    newDetails,
    newEndDate,
    newStatus,
  },
});


//advocate id
export const addAdvocateId = (advocateId) => ({
  type: 'ADD_ADVOCATE_ID',
  payload: advocateId,
});

//user id
export const addUserId = (userId) => ({
  type: 'ADD_USER_ID',
  payload: userId,
});

