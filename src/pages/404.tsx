import { FormattedMessage, getIntl, getLocale, history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle={getIntl(getLocale()).formatMessage({ id: 'page.404.subTitle' })}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        <FormattedMessage id="button.homePage" />
      </Button>
    }
  />
);

export default NoFoundPage;
