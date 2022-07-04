import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Feed from '../components/Feed';

const Container = styled.div`
  max-width: 640px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Main() {
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState(undefined);

  useEffect(() => {
    fetch('/data/feed.json')
      .then((res) => res.ok && res.json())
      .then((feedData) => {
        setFeeds(feedData);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      {loading ? '' : feeds?.map((feed, i) => <Feed key={i} feed={feed} />)}
    </Container>
  );
}

export default Main;
