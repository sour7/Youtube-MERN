import React, { useState } from "react";
import styled from "styled-components";
import YouTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  // flex: 1.4;

  background-color: ${({ theme }) => theme.bgLighter};
  // height: 90vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  width: fit-content;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const MenuOption = styled.div`
  height: 90vh;
  // padding-right:2px
  overflow: hidden;

  &:hover {
    overflow: auto;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 20px;
  }
`;

const Text = styled.p`
  font-size: 12px;
  padding-right: 5px;
`;

const CopyText = styled.p`
  margin-top: 14px;
  font-size: 11px;
  color: grey;
  margin-bottom: 10px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const [close, setClose] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleMenu = () => {
    setClose(!close);
  };

  return (
    <Container>
      <Wrapper>
        <div
          style={{
            display: "flex",

            gap: "10px",
          }}
        >
          <MenuIcon onClick={handleMenu} style={{ cursor: "pointer" }} />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <div
                style={{ display: "flex", gap: "6px", alignItems: "center" }}
              >
                <Img src={YouTube} />
                <h2 style={{ display: close ? "none" : "block" }}>YouTube</h2>
              </div>
            </Logo>
          </Link>
        </div>

        <MenuOption>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <HomeIcon />
              <p style={{ display: close ? "none" : "block" }}>Home</p>
            </Item>
          </Link>
          <Link
            to="/trends"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>
              <ExploreOutlinedIcon />
              <p style={{ display: close ? "none" : "block" }}>Explore</p>
            </Item>
          </Link>
          <Link
            to="/subscription"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>
              <SubscriptionsOutlinedIcon />
              <p style={{ display: close ? "none" : "block" }}>Subscriptions</p>
            </Item>
          </Link>
          <Hr />
          <Item>
            <VideoLibraryOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>Library</p>
          </Item>
          <Item>
            <HistoryOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>History</p>
          </Item>
          <Hr />
          {!currentUser && (
            <>
              <Login style={{ display: close ? "none" : "block" }}>
                Sign in to like videos,
                <br /> comment, and subscribe.
                <Link to="signin" style={{ textDecoration: "none" }}>
                  <Button>
                    <AccountCircleOutlinedIcon />
                    SIGN IN
                  </Button>
                </Link>
              </Login>
              <Hr />
            </>
          )}
          <Title style={{ display: close ? "none" : "block" }}>
            BEST OF YOUTUBE
          </Title>
          <Item>
            <LibraryMusicOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>Music</p>
          </Item>
          <Item>
            <SportsBasketballOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>Sports</p>
          </Item>
          <Item>
            <SportsEsportsOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>Gaming</p>
          </Item>
          <Item>
            <MovieOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>Movies</p>
          </Item>
          <Item>
            <ArticleOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>News</p>
          </Item>
          <Item>
            <LiveTvOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>Live</p>
          </Item>
          <Hr />

          <Item>
            <SettingsOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>Settings</p>
          </Item>
          <Item>
            <FlagOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>Report</p>
          </Item>
          <Item>
            <HelpOutlineOutlinedIcon />
            <p style={{ display: close ? "none" : "block" }}>Help</p>
          </Item>
          <Item onClick={() => setDarkMode(!darkMode)}>
            <SettingsBrightnessOutlinedIcon />
            <div style={{ display: close ? "none" : "block" }}>
              {darkMode ? "Light" : "Dark"} Mode
            </div>
          </Item>
          <Hr />
          <div style={{ display: close ? "none" : "block" }}>
            <Text>
              About Press Copyright Contact <br /> us Creator Advertise <br />{" "}
              Developers
              <br /> <br />
              Terms Privacy Policy & Safety <br /> How YouTube works <br /> Test
              new features
            </Text>
            <CopyText>
              © 2023 Google LLC
              <br />
              Made by sourabh
            </CopyText>
          </div>
        </MenuOption>
      </Wrapper>
    </Container>
  );
};

export default Menu;
