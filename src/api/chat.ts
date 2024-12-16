import { apiConfig } from './apiConfig';

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getCloudinaryData = async (query: string): Promise<string> => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/cloudinary-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching Cloudinary data:', error);
    throw error;
  }
};

