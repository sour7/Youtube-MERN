import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Upload from "./Upload";
import Logout from "./Logout";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
  border-radius: 50px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  padding: 0 15px;
  width: "100%";
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  // border: 2px solid red;
  display: flex;
  gap: 22px;
  font-weight: 500;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Avatar = styled.img`
  /* border: 2px solid red; */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [openlogout, setOpenlogout] = useState(false);
  const [qry, setQry] = useState("");
  const navigate = useNavigate();
  // console.log(currentUser.img);
  console.log("query", qry);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQry(e.target.value)}
            />
            <SearchOutlinedIcon
              onClick={() => navigate(`/search?q=${qry}`)}
              style={{ cursor: "pointer" }}
            />
          </Search>

          {!currentUser ? (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          ) : (
            <User>
              <VideoCallIcon
                style={{ fontSize: "34px", cursor: "pointer" }}
                onClick={() => setOpen(!open)}
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => setOpenlogout(!openlogout)}
              >
                <Avatar src={currentUser?.img} />
                <span>{currentUser?.name}</span>
              </div>
            </User>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
      {openlogout && <Logout setOpenlogout={setOpenlogout} />}
    </>
  );
};

export default Navbar;
