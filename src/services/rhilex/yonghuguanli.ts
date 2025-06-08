// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户登录 POST /api/v1/login */
export async function postLogin(
  body: {
    username: string;
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      beginAuthorize: number;
      description: string;
      endAuthorize: number;
      role: string;
      token: string;
      type: string;
      username: string;
    };
  }>('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户详情 GET /api/v1/users/detail */
export async function getUsersDetail(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      beginAuthorize: number;
      description: string;
      endAuthorize: number;
      role: string;
      token: string;
      type: string;
      username: string;
    };
  }>('/api/v1/users/detail', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户注销 POST /api/v1/users/logout */
export async function postUsersLogout(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/users/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 用户更新 PUT /api/v1/users/update */
export async function putUsersUpdate(
  body: {
    username: string;
    password1: string;
    password2: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/users/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
