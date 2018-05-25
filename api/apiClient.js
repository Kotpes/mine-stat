import axios from 'axios';

/**
 * Fetching data for scpecified miner 
 * @param {string} id 
 * @param {string} apiEndpoint 
 */

export async function getMiner(id, apiEndpoint) {
  try {
    const response = await axios.get(`${apiEndpoint}/miner/${id}/dashboard`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export async function getMinerPayouts(id, apiEndpoint) {
  try {
    const response = await axios.get(`${apiEndpoint}/miner/${id}/payouts`);    
    return response.data
  } catch (error) {
    console.error(error);
  }
}
