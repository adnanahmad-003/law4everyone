// api.js
import * as SecureStore from 'expo-secure-store';

// api for Case post
export const addCaseAPI = async (postData) => {
    try {
        const token= await SecureStore.getItemAsync('authToken');
       //console.log(token);
        const response = await fetch(`http://localhost:3000/user/postProblem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`,
                
            },
            body: JSON.stringify({ title: postData.queryTitle, description:postData.queryDetails,status:postData.status,deadline:postData.endDate}), 
        });


        const data = await response.json();
        console.log(data)
        if(data.message)
        return data.message; 
        
        else{
            return data.response;
        }
    } catch (error) {
        console.error('Error adding string:', error);
        throw error; 
    }
};

//// api for Case post
export const updateCaseAPI = async (postData) => {
    try {
        const token= await SecureStore.getItemAsync('authToken');
       //console.log(token);
       const id = postData.queryId;
        const response = await fetch(`http://localhost:3000/user/editProblem/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`,
                
            },
            body: JSON.stringify({ title: postData.queryTitle, description:postData.queryDetails,status:postData.status,deadline:postData.endDate}), 
        });


        const data = await response.json();
        console.log(data)
        if(data.message)
        return data.message; 
        
        else{
            return data.response;
        }
    } catch (error) {
        console.error('Error adding string:', error);
        throw error; 
    }
};
