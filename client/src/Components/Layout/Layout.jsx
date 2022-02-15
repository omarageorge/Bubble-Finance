import { Fragment } from 'react';
import TopNav from '../TopNav/TopNav';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <TopNav />
      {children}
    </Fragment>
  );
};

export default Layout;
