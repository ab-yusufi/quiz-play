export const createAttempt = async (quizId, userId, token, score) => {
    return await fetch(`/api/attempt/${quizId}/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(score)
    }).then(res => res.json())
    .catch(err => console.log(err))
}