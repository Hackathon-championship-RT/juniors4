import { registerUser } from "../data/source/network/apiService";

export async function createUser() {
  const username = generateRandomUsername();
  const response = await registerUser(username);

  return { username: username, token: response };
}

function generateRandomUsername() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    result += letters[randomIndex];
  }

  return result;
}
