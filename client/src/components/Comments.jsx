import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import SendIcon from "@mui/icons-material/Send";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [cmnt, setCmnt] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId, cmnt]);

  // console.log("comments", comments);

  //TODO: ADD NEW COMMENT FUNCTIONALITY
  const addComment = async () => {
    try {
      await axios.post(`/comments`, {
        userId: currentUser._id,
        videoId: videoId,
        desc: cmnt,
      });
      //console.log("res", res.data);
      setCmnt(" ");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(comments.sort((a, b) => (b.createdAt < b.createdAt ? 1 : -1)));

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input
          value={cmnt}
          placeholder="Add a comment..."
          onChange={(e) => setCmnt(e.target.value)}
        />
        <SendIcon style={{ color: "gray" }} onClick={addComment} />
      </NewComment>
      {comments
        .sort((a, b) => b.createdAt < a.createdAt)
        .map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </Container>
  );
};

export default Comments;
