import axios from "axios";
import authService from "../api/auth";

const API_URL = "http://localhost:5000/api/polls";

// Create Poll
const createPoll = async (pollData) => {
  const token = authService.getAuthToken();
  const response = await axios.post(`${API_URL}/create`, pollData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get My Polls
const getMyPolls = async () => {
  const token = authService.getAuthToken();
  const response = await axios.get(`${API_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get Poll Details
const getPollDetails = async (pollId) => {
  const response = await axios.get(`${API_URL}/${pollId}`);
  return response.data;
};

//Delete Poll
const deletePoll = async (pollId) => {
  const token = authService.getAuthToken();
  const response = await axios.delete(`${API_URL}/${pollId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//Get Poll Results
const getPollResults = async (pollId) => {
  const token = authService.getAuthToken();
  const response = await axios.get(`${API_URL}/${pollId}/results`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Export Poll CSV
const exportPollCSV = async (pollId) => {
  const token = authService.getAuthToken();
  const response = await axios.get(`${API_URL}/${pollId}/export`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob",
  });
  return response.data;
};

export default {
  createPoll,
  getMyPolls,
  getPollDetails,
  deletePoll,
  getPollResults,
  exportPollCSV,
};
