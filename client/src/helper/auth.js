export const register = async (user) => {
  return await fetch(`/api/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const login = async (user) => {
  return await fetch(`/api/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("quiz-jwt", JSON.stringify(data));
    next();
  }
};

export const logout = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("quiz-jwt");
    next();

    return await fetch(`/api/logout`, {
      method: "GET",
    })
      .then((res) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("quiz-jwt")) {
    return JSON.parse(localStorage.getItem("quiz-jwt"));
  } else {
    return false;
  }
};
