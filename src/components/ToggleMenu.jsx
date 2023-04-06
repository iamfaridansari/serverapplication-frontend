import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { FaBars, FaTimes } from "react-icons/fa";

const ToggleMenu = () => {
  const { menu, setMenu, navbar } = useContext(AppContext);
  const toggleMenu = () => {
    navbar.current.classList.toggle("active");
    setMenu(!menu);
  };
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menu]);
  return (
    <button
      className="d-lg-none button"
      style={{ zIndex: "20" }}
      onClick={toggleMenu}
    >
      {menu ? <FaTimes /> : <FaBars />}
    </button>
  );
};

export default ToggleMenu;
