
//// api for Account
import { BASE_URL } from "../../../../constants/Url";
export const AdvocateSignup = async (accountDetails, uri1, uri2) => {
    try {
      
        // Creating FormData object to append images and other data
        const formData = new FormData();
        formData.append('files', {
            uri: uri1,
            type: 'image/jpg', // Adjust the type based on your image file type
            name: 'image1.jpg' // Adjust the name if needed
        });
        formData.append('files', {
            uri: uri2,
            type: 'image/jpg', // Adjust the type based on your image file type
            name: 'image2.jpg' // Adjust the name if needed
        });
        // Appending other account details
        formData.append('userName', accountDetails.username);
        formData.append('name', accountDetails.fullname);
        formData.append('email', accountDetails.email);
        formData.append('phone', accountDetails.phone);
        formData.append('password', accountDetails.password);
        formData.append('areasOfExpertise', accountDetails.expertise);
        formData.append('enrollmentNumber', accountDetails.registrationNumber);
        formData.append('durationOFPractice', accountDetails.experience);
        formData.append('bio', accountDetails.bio);
        formData.append('yearOfGraduation', accountDetails.yearOfGraduation);
        formData.append('dateOfBirth', accountDetails.dateOfBirth);
        formData.append('address', accountDetails.address);
        formData.append('nameOfUniversity', accountDetails.nameOfUniversity);
        
        const response = await fetch(`${BASE_URL}/advocate/signup`, {
            method: 'POST',
            headers: {
                // Don't set Content-Type, it will be set automatically by FormData
            },
            body: formData
        });

        const data = await response.json();
        console.log(data);
        
        if (data.message)
            return data.message; 
        else
            return data.response;
    } catch (error) {
        console.error('Error adding string:', error);
        throw error; 
    }
};
