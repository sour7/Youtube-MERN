import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;
const Tags = styled.div`
  display: flex;
  gap: 7px;
  padding: 7px;
`;
const TagName = styled.span`
  font-size: 11px;
  padding: 5px 18px;
  border-radius: 7px;
  border: 1px solid #bbb;
  background: #bbb;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      <Tags>
        <TagName>All</TagName>
        <TagName>Technology</TagName>
        <TagName>Entertainment</TagName>
        <TagName>Space</TagName>
      </Tags>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
