import axios from "axios";

type ResponseType = Record<string, any>;
class CustomError_Class extends Error {
  response?: {
    data: any;
  };
}

const userLogin = async (data: Record<string, string>) => {
  try {
    const res: ResponseType = await axios.post("/users/login", data);
    localStorage.setItem("token", res.data.token);
    alert(res.data.message);
    window.location.replace("/");
  } catch (err: unknown) {
    if (err instanceof CustomError_Class) {
      alert(err?.response?.data.details);
    }
  }
};

const userCreate = async (data: Record<string, string>) => {
  try {
    const res: ResponseType = await axios.post("/users/create", data);
    alert(res.data.message);
    window.location.replace("/auth/login");
  } catch (err: unknown) {
    if (err instanceof CustomError_Class) {
      alert(err?.response?.data.details);
    }
  }
};

export { userLogin, userCreate };
