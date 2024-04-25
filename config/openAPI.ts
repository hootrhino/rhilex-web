import { join } from 'path';
import { defineConfig } from 'umi';

const openAPIConfig: Parameters<typeof defineConfig>[0]['openAPI'] = [
  {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath: join(__dirname, '../api/rhilex.openapi.json'),
    mock: false,
    projectName: 'rulex',
  },
];

export default openAPIConfig;
