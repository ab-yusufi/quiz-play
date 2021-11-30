export const createQuiz = async (quiz, userId, token) => {
  return await fetch(`/api/quiz/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(quiz),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const publicPrivateQuiz = async (quizId, userId, token) => {
  return await fetch(`/api/quiz/public/${quizId}/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
  .catch(err => console.log(err));
}

export const getQuizByUser = async (user_id, token) => {
  return await fetch(`/api/quizes/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteQuiz = async (quizId, userId, token) => {
  return await fetch(`/api/quiz/${quizId}/${userId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
