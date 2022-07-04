import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Feed from '../components/Feed';

const Container = styled.div`
  max-width: 640px;
  width: 100%;
  display: ${(props) => (props.isLoading ? 'none' : 'flex')};
  flex-direction: column;
  gap: 20px;
`;
const Loading = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: spin 1s linear infinite;
  font-size: 30px;
  position: fixed;
  top: 50%;
`;

function Main() {
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(true);
  const [count, setCount] = useState(0);

  const numberOfFeed = feeds?.length ?? 0;

  useEffect(() => {
    fetch('/data/feed.json')
      .then((res) => res.ok && res.json())
      .then((feedData) => {
        setFeeds(feedData);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (count > 0 && count === numberOfFeed) {
      setImageLoading(false);
    }
  }, [count]);

  return (
    <>
      <Container isLoading={imageLoading}>
        {loading
          ? ''
          : feeds?.map((feed, i) => (
              <Feed key={i} feed={feed} setCount={setCount} />
            ))}
      </Container>
      {imageLoading && (
        <Loading>
          <FontAwesomeIcon icon={faSpinner} />
        </Loading>
      )}
    </>
  );
}

export default Main;
