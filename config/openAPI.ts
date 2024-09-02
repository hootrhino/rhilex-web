import { defineConfig } from '@umijs/max';
import { join } from 'path';

const openAPIConfig: Parameters<typeof defineConfig>[0]['openAPI'] = [
  {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath: join(__dirname, '../api/rhilex.openapi.json'),
    mock: false,
    projectName: 'rhilex',
  },
];

export default openAPIConfig;
