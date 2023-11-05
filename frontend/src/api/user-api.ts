import { API_BASE_URL, ENDPOINTS, FM, HEADER_TYPE } from "shared-library/src/declarations/constants.js";
import { User } from "shared-library/src/declarations/types.js";

export const registerUser = async (input: User) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.register}`, {
      method: "POST",
      headers: HEADER_TYPE,
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json;
  } catch (error) {
    throw (error as Error).message;
  }
};

export const loginUser = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.login}`, {
      method: "POST",
      headers: HEADER_TYPE,
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData: { message: string } = data;
      throw new Error(errorData.message);
    }

    if (rememberMe) {
      localStorage.setItem("token", data.token);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", data.token);
      localStorage.removeItem("token");
    }

    console.log(data);

    return data;
  } catch (error) {
    throw (error as Error).message;
  }
};

export const getAuthorisedUser = async () => {
  try {
    const rememberedToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");

    const token = sessionToken || rememberedToken;
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.authoriseUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    sessionStorage.setItem("userData", JSON.stringify(data));
    console.log("userData", data);

    return data;
  } catch (error) {
    console.error("Error in getAuthorisedUser:", error);
    throw new Error(FM.default);
  }
};


export const getUserSessionData = (): User => {
  const userData =
    sessionStorage.getItem("userData");
  return JSON.parse(userData!);
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.getAllUsers}`, {
      headers: HEADER_TYPE,
    });
    const data = await response.json();

    if (!response.ok) {
      const error = data.error || FM.default;
      throw new Error(error);
    }

    return data;
  } catch (error: any) {
    throw new Error(FM.default);
  }
};
