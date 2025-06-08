import { FormattedMessage, history } from '@umijs/max';
import { Button } from 'antd';

const NoFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-8xl font-bold text-gray-800">403</h1>
      <p className="mt-4 text-lg text-gray-600">
        <FormattedMessage id="page.403.subTitle" />
      </p>
      <Button type="primary" className="mt-6" onClick={() => history.push('/')}>
        <FormattedMessage id="button.homePage" />
      </Button>
    </div>
  </div>
);

export default NoFoundPage;
