import { IUser } from "../types"
import { verify } from "./messages"


export function isAuthenticated(): Promise<IUser | null> {
  if (getToken()) return verify()
  return Promise.resolve(null)
}

export function setToken(token: string) {
  localStorage.setItem("token", token)
}
export function setRefreshToken(token: string) {
  localStorage.setItem("refreshToken", token)
}
export function getToken() {
  return localStorage.getItem("token")
}
export function getRefreshToken() {
  return localStorage.getItem("refreshToken")
}

export function getMobileNumber() {
  return localStorage.getItem("mobileNumber")
}
export function setMobileNumber(mobileNumber: string) {
  return localStorage.setItem("mobileNumber", mobileNumber)
}

export function getUser(): IUser | null  {
  const item = localStorage.getItem('user')
  return item ? JSON.parse(item) : null
}
export function setUser(user: IUser)  {
  localStorage.setItem('user', JSON.stringify(user))
}
export function removeLS(item: string)  {
  localStorage.removeItem(item)
}

