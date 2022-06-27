import React, { useState } from 'react';
import { Routes, Link, useNavigate } from 'react-router-dom';

//images
import { ReactComponent as HomeIcon } from '../icons/home.svg';
import { ReactComponent as MessagesIcon } from '../icons/messages.svg';
import { ReactComponent as PostIcon } from '../icons/post.svg';
import { ReactComponent as ExploreIcon } from '../icons/explore.svg';
import { ReactComponent as LikesIcon } from '../icons/likes.svg';
import profile from '../images/profile.png';
import logo from '../images/logo.png';
import { ReactComponent as SearchIcon } from '../icons/search_icon.svg';

function NavigationBar() {
  const [dropdownShow, setDropdownShow] = useState(false);
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <nav className="NavigationBar">
      <div className="logo">
        <img src={logo} alt="Instagram" />
      </div>
      <div className="search_bar">
        <div className="search_icon">
          <SearchIcon />
        </div>
        <input className="search_input" type="text" placeholder="검색" />
      </div>
      <ul className="links">
        <Link to="/">
          <li className="icon">
            <HomeIcon />
          </li>
        </Link>
        <Link to="/messages">
          <li className="icon">
            <MessagesIcon />
          </li>
        </Link>
        <Link to="/post">
          <li className="icon">
            <PostIcon />
          </li>
        </Link>
        <Link to="/explore">
          <li className="icon">
            <ExploreIcon />
          </li>
        </Link>
        <Link to="/likes">
          <li className="icon">
            <LikesIcon />
          </li>
        </Link>
        <li
          className="profile_icon"
          onClick={(e) => {
            setDropdownShow(!dropdownShow);
          }}
        >
          <img src={profile} alt="" height={24} width={24} />
          <div className={`profile dropdown ${dropdownShow ? 'show' : ''}`}>
            <ul>
              <li>프로필 설정</li>
              <li onClick={logout}>로그아웃</li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
