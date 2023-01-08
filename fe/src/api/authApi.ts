import axios from "axios";

type ResponseType = Record<string, any>;

export const userLogin = async (data: Record<string, string>) => {
  try {
    const res: ResponseType = await axios.post("/users/login", data);
    localStorage.setItem("token", res.data.token);
    alert(res.data.message);
    window.location.replace("/");
  } catch (err: any) {
    alert(err.response.data.details);
  }
};

export const userCreate = async (data: Record<string, string>) => {
  try {
    const res: ResponseType = await axios.post("/users/create", data);
    alert(res.data.message);
    window.location.replace("/auth");
  } catch (err: any) {
    alert(err.response.data.details);
  }
};
