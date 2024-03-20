// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 重启系统 POST /api/v1/firmware/reboot */
export async function postFirmwareReboot(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/firmware/reboot', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 恢复出厂 POST /api/v1/firmware/recoverNew */
export async function postFirmwareRecoverNew(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/firmware/recoverNew', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 重启固件 POST /api/v1/firmware/restartRulex */
export async function postFirmwareRestartRulex(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/firmware/restartRulex', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 立即更新 POST /api/v1/firmware/upgrade */
export async function postFirmwareUpgrade(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/firmware/upgrade', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 查看更新日志 GET /api/v1/firmware/upgradeLog */
export async function getFirmwareUpgradeLog(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/firmware/upgradeLog', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 上传最新版 POST /api/v1/firmware/upload */
export async function postFirmwareUpload(body: {}, file?: File, options?: { [key: string]: any }) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<{ code: number; msg: string; data: string }>('/api/v1/firmware/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 查看密钥 GET /api/v1/firmware/vendorKey */
export async function getFirmwareVendorKey(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      device_id?: string;
      authorize_admin?: string;
      authorize_password?: string;
      begin_authorize?: number;
      end_authorize?: number;
      mac?: string;
      license?: string;
    };
  }>('/api/v1/firmware/vendorKey', {
    method: 'GET',
    ...(options || {}),
  });
}
