import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  /* background-color: #130e19ce; */
`;

const Box = styled.div`
  color: ${({ theme }) => theme.text};
  z-index: 1;
  padding-bottom: 10px;
  width: fit-content;
  position: absolute;
  top: 50px;
  right: 17px;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  /* color: ${({ theme }) => theme.textSoft}; */
  color: #fd0404;
  font-weight: 600;
  font-size: 22px;
`;

const Logout = ({ setOpenlogout }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const hideLogout = () => {
    setOpenlogout(false);
  };
  const persistBtn = (e) => {
    // console.log("persistForm");
    // e.stopPropagation();
  };

  const handleLogout = () => {
    // localStorage.clear();
    dispatch(logout(currentUser));
    window.location.reload();
  };

  return (
    <Container onClick={hideLogout}>
      <Box onClick={persistBtn}>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </Container>
  );
};

export default Logout;
