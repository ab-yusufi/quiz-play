export const createAttempt = async (quizId, userId, token, score) => {
  return await fetch(`/api/attempt/${quizId}/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(score),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getAttemptsByUser = async (userId, token, user) => {
  return await fetch(`/api/attempts/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  });
};

export const getAttemptsByQuiz = async ( quizId) => {
    return await fetch(`/api/attempts/quiz/${quizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json())
    .catch(err => console.log(err))
};