import {
  faBookmark,
  faCommentDots,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import Comments from './Comments';

const Wrapper = styled.div`
  max-width: 470px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.border};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  div {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
  }
  div div:first-child {
    height: 2rem;
    width: 2rem;
    border-radius: 100%;
    background-color: ${(props) => props.theme.emptyBgColor};
  }
  svg {
    justify-self: center;
  }
`;
const Photo = styled.img`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100px;
  width: 100%;
  background-color: ${(props) => props.theme.emptyBgColor};
`;
const Controller = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-size: 20px;
  div:first-child {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`;
const Like = styled.div`
  display: flex;
  padding: 10px;
  font-size: 14px;
`;

export const splitEmail = (email) => email.split('@')[0];

function Feed({ feed, setCount }) {
  const handleOnLoad = (event) => {
    if (event) setCount((prev) => prev + 1);
  };

  return (
    <Wrapper>
      <Header>
        <div>
          <div></div>
          <div>{splitEmail(feed.name)}</div>
        </div>
        <FontAwesomeIcon icon={faEllipsis} />
      </Header>
      <Photo src={feed.photo} onLoad={handleOnLoad} />
      <Controller>
        <div>
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faCommentDots} />
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
        <div>
          <FontAwesomeIcon icon={faBookmark} />
        </div>
      </Controller>
      <Like>좋아요 {feed.like ?? 0}개</Like>
      <Comments comments={feed.comments} />
    </Wrapper>
  );
}

export default Feed;
