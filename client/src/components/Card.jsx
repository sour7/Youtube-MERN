import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  /* border: 2px solid red; */
  width: ${(props) => props.type !== "sm" && "295px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 5px;
`;

const Image = styled.img`
  /* border: 2px solid red; */
  width: ${(props) => (props.type === "sm" ? "120px" : "100%")};
  height: ${(props) => (props.type === "sm" ? "100px" : "180px")};
  background-color: #999;
  flex: 1;
  border-radius: 7px;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 4px;
`;

const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);
  // console.log("channel", channel);
  // console.warn("video", video);
  // console.log("type", type);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video?.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel?.img} />
          <Texts>
            {video.title.length > 16 ? (
              <Title>{video.title.slice(0, 28)}...</Title>
            ) : (
              <Title>{video.title}</Title>
            )}
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video.views} views •<span>{format(video.createdAt)}</span>
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
