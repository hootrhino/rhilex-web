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
    data: { description: string; role: string; token: string; username: string };
  }>('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户列表 用户列表 GET /api/v1/users */
export async function getUsers(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { role?: string; username?: string; description?: string }[];
  }>('/api/v1/users', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户创建 POST /api/v1/users */
export async function postUsers(
  body: {
    username: string;
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户删除 DELETE /api/v1/users */
export async function deleteUsers(
  body: {
    username: string;
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/users', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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
    password: string;
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
