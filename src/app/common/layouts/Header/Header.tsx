import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosCube } from "react-icons/io";
import { Button, Flex } from 'antd';
import useUrl from '../../../core/hooks/useUrl';
import { ROUTES } from '../../../core/enums/routerPath';

const Header: React.FC = () => {
  const url = useUrl();
  console.log('url', url);

  return (
    <header>
      {/** Navbar 區域 */}
      <nav>
        <ul>
          {/** Logo */}
          <Link to="/">
            <IoIosCube />
          </Link>
          {/** Features */}
          <li>
            <Flex gap="large">
              <Link to={ROUTES.FEATURES__FIND_JOBS}>Find Jobs</Link>
              <Link to={ROUTES.FEATURES__SALARY_INFORMATION}>Salary Information</Link>
              <Link to={ROUTES.FEATURES__CREATE_YOUR_CV}>Create Your CV</Link>
              <Link to={ROUTES.FEATURES__FAQ}>FAQ</Link>
            </Flex>
          </li>
          {/** i8n Toggle */}

          {/** Login Button */}
          <li>
            <Button type="primary" className="btn-primary-outline" shape="round" size="large">Login</Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
