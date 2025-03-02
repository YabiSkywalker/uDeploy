import axios from 'axios';

const API_URL = 'http://localhost:8000';

const postData = async (zone) => {
  try {
    const response = await axios.post(
      `${API_URL}/harness/getHarnessDefaults?zone=${encodeURIComponent(zone)}`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error to handle it in the component
  }
};

export default postData;

