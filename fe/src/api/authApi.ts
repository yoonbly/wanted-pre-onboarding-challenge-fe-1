import axios from "axios";

interface Res {
  data: Data;
  status: number;
}
interface Data {
  token: string;
  message: string;
}

const userLogin = async (data: Record<string, string>) => {
  try {
    const res: Res = await axios.post("/users/login", data);
    localStorage.setItem("token", res.data.token);
    alert(res.data.message);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      alert(err.response.data.details);
    }
  }
};

const userCreate = async (data: Record<string, string>) => {
  try {
    const res: Res = await axios.post("/users/create", data);
    alert(res.data.message);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      alert(err.response.data.details);
    }
  }
};

export { userLogin, userCreate };
