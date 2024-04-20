import { AiOutlineUser } from "react-icons/ai";
import { SlHandbag } from "react-icons/sl";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { RiMenuUnfoldLine } from "react-icons/ri";
import SliderMenu from "./SliderMenu";
import Location from "./Location";
import Search from "./Search";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  //states
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

  return (
    <div className="navbar_container">
      <div className="wrapper">
        <div className="left">
          <div className="slider_menu">
            <RiMenuUnfoldLine
              onClick={() => setToggleSideMenu((prev) => !prev)}
            />
            <SliderMenu
              toggleSideMenu={toggleSideMenu}
              setToggleSideMenu={setToggleSideMenu}
            />
          </div>

          <img src={Logo} alt="LOGO" onClick={() => navigate("/")} />
        </div>
        <div className="center">
          <div className="navbar_location">
            <Location />
          </div>

          <div className="navbar_search">
            <Search />
          </div>
        </div>
        <div className="right">
          <ul>
            <li>
              <AiOutlineUser
                onClick={() => navigate("/my-account/dashboard")}
              />
            </li>
            <li>$0.00</li>
            <li>
              <SlHandbag />
              <span>5</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
