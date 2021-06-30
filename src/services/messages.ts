import { backendurl } from "../config";
import { IUser } from "../types";
import { getToken, setToken, setUser } from "./localstorage";

export const verify = async (): Promise<IUser | null> => {
  const token = getToken();
  console.log(token);
  if (token) {
    try {
      const res = await fetch(`${backendurl}/validate`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const res_1 = await res.json();
      return res_1;
    } catch (err) {
      return null;
    }
  } else {
    return Promise.resolve(null);
  }
};

export const detectLang = async (text: string): Promise<any[] | null> => {
  const token = getToken();
  console.log("...422...", text);
  if (token) {
    try {
      const body = JSON.stringify({ text });
      const res = await fetch(`${backendurl}/detect_language`, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
        method: "POST",
      });
      const res_1 = await res.json();
      console.log("detectLang...", res_1);
      return res_1;
    } catch (err) {
      console.log(err);
      return Promise.resolve(null);
    }
  } else {
    return Promise.resolve(null);
  }
};

export async function login(req: IUser): Promise<IUser | null> {
  try {
    const res = await fetch(`${backendurl}/login`, {
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const r = await res.json();
    console.log(r);
    if (r.id) {
      setUser(r);
      setToken(r.token);
      return r;
    } else {
      throw new Error("user not found");
    }
  } catch (err) {
    console.log(err);
    return Promise.resolve(null);
  }
}
