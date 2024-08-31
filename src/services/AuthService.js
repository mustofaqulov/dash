class AuthServices {
  login = async ({ username, password }) => {
    try {
      const response = await fetch(`http://localhost:1111/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Login yoki parol noto'g'ri");
      }
    } catch (err) {
      return false;
    }
  };
  logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
  };
}

export const authService = new AuthServices();
