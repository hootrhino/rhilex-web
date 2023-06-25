import { defineConfig } from 'umi';
import { join } from 'path';

const openAPIConfig: Parameters<typeof defineConfig>[0]['openAPI'] = [
  {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath: join(__dirname, 'RULEX-CORE-API.openapi.json'),
    mock: false,
    projectName: 'rulex',
  },
];

export default openAPIConfig;
