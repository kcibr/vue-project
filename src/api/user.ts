import axios from './'

export interface LoginData {
    account: string;
    password: string;
}

export interface LoginRes {
    token: string;
}
export function doLogin (data: LoginData) {
  return axios.get('/user/login', data)
}
