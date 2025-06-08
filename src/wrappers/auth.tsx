import { Outlet } from 'umi';

export default () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    return (window.location.href = '/');
  } else {
    return <Outlet />;
  }
};
