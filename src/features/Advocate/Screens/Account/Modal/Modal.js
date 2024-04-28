// api.js
import * as SecureStore from 'expo-secure-store';
import {BASE_URL} from './../../../../../constants/Url';

//// api for Account
export const updateAccount = async (accountDetails) => {
    try {
        const token= await SecureStore.getItemAsync('authToken');
      
        const response = await fetch(`${BASE_URL}/user/editProblem`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`,
                
            },
            body: JSON.stringify({ email: accountDetails.email,phone: accountDetails.phone, password: accountDetails.password,expertise: accountDetails.expertise,registrationNumber: accountDetails.registrationNumber,experience: accountDetails.experience,bio:accountDetails.bio}), 
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
