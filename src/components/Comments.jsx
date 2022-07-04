import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { getLoginUser } from '../context/AuthContext';
import { splitEmail } from './Feed';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: ${(props) => props.theme.border};
`;
const Comment = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 14px;
  span:first-child {
    font-weight: 600;
    margin-right: 10px;
  }
`;

const CommentForm = styled.form`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  svg {
    position: absolute;
    font-size: 20px;
  }
  input {
    padding: 0 40px;
    width: 100%;
  }
  button {
    position: absolute;
    right: 10px;
    color: ${(props) => props.theme.colorSky};
    font-weight: 500;
    background-color: transparent;
  }
`;

function Comments({ comments }) {
  const [commentState, setCommentState] = useState(comments);
  const user = getLoginUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = event.currentTarget.message.value;
    setCommentState((prev) => [...prev, { name: user.id, message }]);
    event.currentTarget.message.value = '';
  };

  return (
    <>
      <Wrapper>
        {commentState.map((comment, i) => (
          <Comment key={i}>
            <span>{splitEmail(comment.name)}</span>
            <span>{comment.message}</span>
          </Comment>
        ))}
      </Wrapper>
      <CommentForm onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faSmile} />
        <input type="text" name="message" placeholder="댓글달기..." />
        <button type="submit">게시</button>
      </CommentForm>
    </>
  );
}

export default Comments;
