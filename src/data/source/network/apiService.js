import config from "../../../../public/config/api_config.json" assert { type: "json" };

export async function getLeaderboard(level) {
  const url = `${config.baseUrl}/leaderboard/${level}/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function registerUser(username) {
  const url = `${config.baseUrl}/register/`;
  const data = { username: username };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData.token);
    return responseData.token;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Если нужно обработать ошибку в вызывающем коде
  }
}

export async function submitLeaderboardData(score, level) {
  const url = `${config.baseUrl}/leaderboard/put_data/`;
  const data = { score: score, level: level };
  const token = localStorage.getItem("token");

  console.log("Token " + token);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
