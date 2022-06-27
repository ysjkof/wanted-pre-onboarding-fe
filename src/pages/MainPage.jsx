import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as EmoticonIcon } from '../icons/emoticon_icon.svg';

function MainPage() {
  const [feedData, setFeedData] = useState([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const imageLoadingStatus = useRef({});

  useEffect(() => {
    fetch('data/feed.json')
      .then((res) => res.json())
      .then((data) => setFeedData(data));
  }, []);

  function checkLoadingFinished() {
    for (const key in imageLoadingStatus.current) {
      if (!key) return;
    }
    setLoadingFinished(true);
  }
  function saveComment(comment, articleID) {
    if (comment)
      setFeedData(
        feedData.map((e) =>
          e.articleID === articleID
            ? {
                ...e,
                comments: e.comments.concat({
                  userID: localStorage.getItem('loggedInUser'),
                  content: comment,
                }),
              }
            : e
        )
      );
  }
  return (
    <main>
      <div className={`loading_veil ${loadingFinished ? 'hide' : ''}`}>
        <div> Loading... </div>
      </div>
      <div className="MainFeed">
        {feedData.map((e) => {
          imageLoadingStatus.current[e.articleID] = false;
          return (
            <Card
              key={e.articleID}
              properties={e}
              imageLoadingStatus={imageLoadingStatus.current[e.articleID]}
              checkLoadingFinished={checkLoadingFinished}
              saveComment={(comment) => {
                saveComment(comment, e.articleID);
              }}
            />
          );
        })}
      </div>
    </main>
  );
}

export default MainPage;

function Card({
  properties,
  imageLoadingStatus,
  checkLoadingFinished,
  saveComment,
}) {
  const [commentInput, setCommentInput] = useState('');
  const saveCommentButton = useRef();

  function commentInputHandle(e) {
    setCommentInput(e.target.value);
  }

  return (
    <div className="Card">
      <section className="top">
        <div className="profile_thumbnail">
          <div className="circle">
            {properties.profileThumbnail ? (
              <img src={properties.profileThumbnail} />
            ) : null}{' '}
          </div>
        </div>
        <div className="post_username">
          <span>{properties.userID}</span>
        </div>
        <div className="actions_ellipsis"></div>
      </section>
      <section className="body">
        <img
          src={properties.imageURL}
          alt=""
          onLoad={() => {
            imageLoadingStatus = true;
            checkLoadingFinished();
          }}
        />
      </section>
      <section className="bottom">
        <div className="functions">
          <div className="heart icon"></div>
          <div className="speech_bubble icon"></div>
          <div className="message icon"></div>
          <div className="bookmark icon"></div>
        </div>
        <div className="likes">좋아요 {properties.likes}개</div>
        <div className="comments">
          {properties.comments.map((e, i) => (
            <div className="comment" key={i}>
              <span className="username">{e.userID}</span>
              <span className="content">{e.content}</span>
            </div>
          ))}
        </div>
        <div className="comment_input_box">
          <div className="emoticon">
            <EmoticonIcon />
          </div>
          <input
            type="text"
            value={commentInput}
            onChange={commentInputHandle}
            placeholder="댓글 달기..."
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing === false && e.key === 'Enter') {
                saveCommentButton.current.click();
              }
            }}
          />
          <button
            ref={saveCommentButton}
            className={`post_comment_button ${commentInput ? '' : 'disabled'}`}
            onClick={(e) => {
              e.stopPropagation();
              saveComment(commentInput);
              setCommentInput('');
            }}
          >
            게시
          </button>
        </div>
      </section>
    </div>
  );
}
