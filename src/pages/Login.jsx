import { faAppleWhole, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { errorMessages, regex } from '../const';
import { getUsers, useAuthState } from '../context/AuthContext';

const Container = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.blurBgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  max-width: 450px;
  background-color: ${(props) => props.theme.blurBgColor};
`;
const Section = styled.section`
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'white')};
  border: ${(props) => (props.hasBorder ? props.theme.border : '')};
  margin-bottom: 14px;
  padding: ${(props) => (props.hasXPadding ? '0 40px' : '20px 40px')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    color: ${(props) => props.theme.colorSky};
    font-weight: 500;
  }
`;
const Title = styled.h1`
  color: ${(props) => props.theme.logoColor};
  font-size: 2.5rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Error = styled.div`
  color: ${(props) => props.theme.warningColor};
  position: absolute;
  top: -20px;
  font-size: 12px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
`;
const Input = styled.input`
  margin-bottom: 10px;
  height: 2rem;
  padding: 0 10px;
  border: ${(props) =>
    props.validation ? props.theme.border : '1px solid red'};
  border-radius: 3px;
  background-color: #f4f4f4;
  ::placeholder {
    font-weight: 600;
  }
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.validation ? props.theme.btnBgColor : props.theme.blurBtnBgColor};
  color: ${(props) => props.theme.btnColor};
  border-radius: 3px;
  height: 2rem;
  font-size: 1rem;
  margin-bottom: 30px;
`;
const Seperator = styled.div`
  font-size: 14px;
  position: relative;
  margin-bottom: 50px;
  border-bottom: ${(props) => props.theme.border};
  width: 100%;
  span {
    position: absolute;
    left: 50%;
    translate: -50%;
    top: -0.3rem;
    background-color: ${(props) => props.theme.bgColor};
    width: 50px;
    text-align: center;
  }
`;

const CustomText = styled.p`
  color: ${(props) => props.textColor};
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '')};
  margin-bottom: ${(props) => (props.marginSm ? '1rem' : '2rem')};
  :last-child {
    margin-bottom: 0;
  }
  svg {
    fill: ${(props) => props.textColor};
    margin-right: 6px;
  }
  a {
    color: inherit;
  }
`;

const LinkAppStore = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-around;
  width: 100%;
  a {
    border-radius: 5px;
    padding: 5px;
    background-color: black;
    display: grid;
    grid-template-columns: 30px 100px;
    align-items: center;
    svg {
      grid-row-start: 1;
      grid-row-end: 3;
      width: 25px;
      height: 25px;
      path {
        color: white;
      }
    }
    p,
    span {
      color: white;
      margin: auto;
    }
    span {
      font-size: 14px;
    }
    p {
      font-size: 12px;
      font-weight: 300;
    }
  }
`;

function Login() {
  const [validationState, setValidationState] = useState({
    id: null,
    password: null,
  });
  const [error, setError] = useState(null);
  const { login } = useAuthState();

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const hasValue = (value) => !!value;
  const validAccountId = (users, id) => {
    const index = users.findIndex((user) => user.id === id);
    return index === -1 ? null : index;
  };
  const matchPassword = (dbPassword, inputPassword) =>
    dbPassword === inputPassword;

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = event.target.id.value;
    const password = event.target.password.value;
    const loginState = { id, password, isLogin: true };

    const users = getUsers();
    if (!users) {
      if (hasValue(id) && hasValue(password)) login([loginState]);
      return setError('ID와 비밀번호가 바르지 않습니다');
    }

    let newUserInfo = [];

    const accountId = validAccountId(users, id);
    if (!accountId) {
      newUserInfo = [...users, loginState];
      login(newUserInfo);
      return;
    }

    const correctPassword = matchPassword(users[accountId]?.password, password);
    if (correctPassword) {
      users[accountId].isLogin = true;
      newUserInfo = [...users, loginState];
      login(newUserInfo);
    } else {
      return setError('ID와 비밀번호가 바르지 않습니다');
    }
  };

  const checkValidation = (regex, value) => regex.test(value);

  const onChangeInput = (event, ref) => {
    setError(null);
    ref.current.value = event.target.value;
    const { name, value } = ref.current;

    const validation = checkValidation(regex[name], value);
    if (!validation) setError(errorMessages[name]);
    // 밸리드 통과 안되면 validationState 업데이트 돼 렌더링 발생
    setValidationState((prev) => ({ ...prev, [name]: validation }));
  };

  return (
    <Container>
      <Wrapper>
        <Section hasBorder>
          <Title>Instagram</Title>
          <Form
            onSubmit={(event) =>
              validationState.id &&
              validationState.password &&
              handleSubmit(event)
            }
          >
            <Error>{error ? error : ''}</Error>
            <Input
              name="id"
              type={'text'}
              placeholder="전화번호, 사용자 이름 또는 이메일"
              onChange={(event) => onChangeInput(event, emailRef)}
              validation={error === null || validationState.id}
              ref={emailRef}
            />
            <Input
              name="password"
              type={'password'}
              placeholder="비밀번호"
              onChange={(event) => onChangeInput(event, passwordRef)}
              validation={error === null || validationState.password}
              ref={passwordRef}
            />
            <Button
              type="submit"
              validation={validationState.id && validationState.password}
            >
              로그인
            </Button>
          </Form>
          <Seperator>
            <span>또는</span>
          </Seperator>
          <CustomText textColor="#385185">
            <Link to="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
              Facebook으로 로그인
            </Link>
          </CustomText>
          <CustomText textColor="#6686A4" fontSize="12px">
            <Link to="">비밀번호를 잊으셨나요?</Link>
          </CustomText>
        </Section>
        <Section hasBorder>
          <p>
            계정이 없으신가요? <Link to="">가입하기</Link>
          </p>
        </Section>
        <Section bgColor="transparent" hasXPadding>
          <CustomText marginSm>앱을 다운로드하세요</CustomText>
          <LinkAppStore>
            <Link to="">
              <FontAwesomeIcon icon={faAppleWhole} />
              <span>App store에서</span>
              <p> 다운로드하기</p>
            </Link>
            <Link to="">
              <FontAwesomeIcon icon={faPlay} />
              <p>다운로드하기</p>
              <span>Google Play</span>
            </Link>
          </LinkAppStore>
        </Section>
      </Wrapper>
    </Container>
  );
}

export default Login;
