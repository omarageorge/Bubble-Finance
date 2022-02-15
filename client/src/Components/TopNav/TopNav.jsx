import { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaPaperPlane, FaPlus } from 'react-icons/fa';

import Avator from '../Avator/Avator';
import { Title } from '../Text/Text';
import { Context } from '../../Context/Context';

import style from './TopNav.module.scss';
import { Logout } from '../../Context/Actions';

const TopNav = () => {
  const { user, dispatch } = useContext(Context);

  const [menuActive, setMenuActive] = useState(false);

  const menuRef = useRef(null);

  const handleClick = () => {
    setMenuActive((prev) => !prev);
    menuRef.current.classList.toggle('nav-toggle');
  };

  return (
    <nav id={style.wrapper}>
      <span id={style.icon} onClick={handleClick}>
        {menuActive ? <FaTimes /> : <FaBars />}
      </span>

      <div id={style.menu} className='' ref={menuRef}>
        <span id={style.name}>
          <Title>{user.name}</Title>
        </span>

        <ul id={style.options}>
          <Link to='/home' className={style.option} onClick={handleClick}>
            <FaHome />
            <span>Home</span>
          </Link>

          <Link to='/send' className={style.option} onClick={handleClick}>
            <FaPaperPlane />
            <span>Send</span>
          </Link>

          <Link to='/deposit' className={style.option} onClick={handleClick}>
            <FaPlus />
            <span>Deposit</span>
          </Link>

          <span
            id={style.logout}
            className={style.option}
            onClick={() => {
              handleClick();
              dispatch(Logout());
            }}
          >
            Log out
          </span>
        </ul>
      </div>

      <Avator url='/avator.jpg' />
    </nav>
  );
};

export default TopNav;
