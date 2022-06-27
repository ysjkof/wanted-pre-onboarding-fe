import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../images/logo.png';

function LoginPage() {
  const [user, setUser] = useState({ id: '', pw: '' });
  const [userInputValid, setUserInputValid] = useState({
    id: false,
    pw: false,
  });
  const navigate = useNavigate();
  const loginButton = useRef();

  useEffect(() => {
    checkValidity();
  }, [user]);

  function login() {
    if (!userInputValid.id || !userInputValid.pw) return;
    fetch('userDB/users.json')
      .then((res) => res.json())
      .then((data) =>
        data.forEach((e) => {
          if (e.id === user.id && e.pw === user.pw) {
            localStorage.setItem('loggedInUser', e.userName);
            navigate('/main');
          } else
            window.alert(
              '로그인 실패: 입력하신 아이디가 존재하지 않거나, 올바른 패스워드가 아닙니다.'
            );
        })
      );
  }
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function checkValidity() {
    setUserInputValid({
      id:
        user.id &&
        user.id.match(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        ),
      pw:
        user.pw &&
        user.pw.match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()\-=_+[\]\\;',./{}|:"<>?`~]).{8,}$/
        ),
    });
  }

  return (
    <div className="login_box">
      <div className="title">
        <img src={logo} alt="" />
      </div>
      <div
        className={`input_container ${
          user.id && !userInputValid.id ? 'invalid' : ''
        }`}
      >
        <input
          type="text"
          className="id"
          name="id"
          value={user.id}
          placeholder="아이디"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') loginButton.current.click();
          }}
        />
      </div>
      <div
        className={`input_container ${
          user.pw && !userInputValid.pw ? 'invalid' : ''
        }`}
      >
        <input
          type="password"
          className="pw"
          name="pw"
          value={user.pw}
          placeholder="비밀번호"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') loginButton.current.click();
          }}
        />
      </div>
      <button
        onClick={login}
        className={userInputValid.id && userInputValid.pw ? 'validated' : null}
        ref={loginButton}
      >
        로그인
      </button>
    </div>
  );
}

export default LoginPage;
