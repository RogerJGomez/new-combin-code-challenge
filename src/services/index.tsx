import axios from "axios";
import { Member } from "../types";

export const authService = async (): Promise<boolean> => {
  const response = await axios.post("http://localhost:8081/auth", {
    username: "sarah",
    password: "connor",
  });

  if (response.status >= 200 && response.status <= 300) {
    const { token } = response.data;
    localStorage.setItem("token", token);
    return true;
  }
  return false;
};

export const getMembersService = async (): Promise<Member[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:8081/api/members", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status >= 200 && response.status <= 300) {
    return response.data as Member[];
  }
  return [];
};

export const addMemberService = async (
  member: Member
): Promise<Member | null> => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://localhost:8081/api/members",
    { ...member },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status >= 200 && response.status <= 300) {
    return response.data as Member;
  }

  return null;
};
