import { FormattedMessage, history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，你访问的页面不存在"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        <FormattedMessage id="button.homePage" />
      </Button>
    }
  />
);

export default NoFoundPage;
