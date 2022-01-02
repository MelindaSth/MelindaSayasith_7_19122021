import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/';

export async function getAllUsers() {
  let users = [];
  const response = await axios.get(`${baseUrl}/users.json`, {
  });
  users = response.data;
  return users;
}