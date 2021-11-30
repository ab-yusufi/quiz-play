export const getAllUsers = async (userId, token) => {
    return await fetch(`/api/users/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}

export const blockUnblockUser = async (userId, token, user) => {
    return await fetch(`/api/user/block/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .catch(err => console.log(err))
} 