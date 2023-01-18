import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #130e19ce;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  z-index: 1;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;

  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  // upload a video or img to google storage, and get URL
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);
  //<----ends of upload a video or img to google storage, and get URL

  // uploading video to backend
  const handleUpload = async (e) => {
    e.preventDefault();

    const res = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  const hideUpload = () => {
    setOpen(false);
  };
  const persistForm = (e) => {
    console.log("persistForm");
    e.stopPropagation();
  };

  return (
    <Container onClick={hideUpload}>
      <Box>
        <Wrapper onClick={(e) => persistForm(e)}>
          <Close onClick={() => setOpen(false)}>
            <CloseIcon />
          </Close>
          <Title>Upload a New Video</Title>
          <Label>Video:</Label>
          {videoPerc > 0 ? (
            "Uploading:" + videoPerc
          ) : (
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              required
            />
          )}
          <Input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            required={true}
          />
          <Desc
            placeholder="Description"
            name="desc"
            rows={8}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Separate the tags with commas."
            onChance={handleTags}
          />
          <Label>Thumbnails:</Label>
          {imgPerc > 0 ? (
            "Uploading:" + imgPerc + "%"
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
        </Wrapper>
        <Button onClick={handleUpload}>Upload</Button>
      </Box>
    </Container>
  );
};

export default Upload;
