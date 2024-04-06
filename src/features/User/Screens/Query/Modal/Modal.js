// api.js
import * as SecureStore from 'expo-secure-store';

// api for chat post
export const addStringAPI = async (newString) => {
    try {
        const token= await SecureStore.getItemAsync('authToken');
      // console.log(token);
        const response = await fetch(`http://localhost:3000/lawbot/getResponse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`,
                
            },
            body: JSON.stringify({ prompt: newString, chatId:1 }), 
        });


        const data = await response.json();
        console.log(data)
        console.log(data.message)
        if(data.message)
        return data.message; // Return the response data if needed
        
        else{
            return data.response;
        }
    } catch (error) {
        console.error('Error adding string:', error);
        throw error; // Rethrow the error to handle it where the API function is called
    }
};
