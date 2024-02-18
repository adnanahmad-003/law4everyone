// api.js

const BASE_URL = 'https://chatbot'; // Replace this with your actual API endpoint

export const addStringAPI = async (newString) => {
    try {
        const response = await fetch(`${BASE_URL}/lawbot/getResponse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
            body: JSON.stringify({ string: newString }), // Assuming your API expects a JSON body with a 'string' property
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // Return the response data if needed
    } catch (error) {
        console.error('Error adding string:', error);
        throw error; // Rethrow the error to handle it where the API function is called
    }
};
