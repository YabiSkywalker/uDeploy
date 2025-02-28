import axios from 'axios';

const API_URL = 'https://bandera-svc.yabi.dev';

// Login function
// Login function with proper headers
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log(response.data.token);
      return response.data.token;
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};



// get all tickets
export const getAllTickets = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/tickets/getAllTickets`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*',
      },
    });

    return response.data; // Return the ticket data
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw new Error('Failed to fetch tickets');
  }
};
