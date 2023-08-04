import React, { useState } from "react";
import { Logo } from "../assets/img";
import { NavLink, useNavigate } from "react-router-dom";

import { isActiveStyle, isNotActiveStyle } from "../utils/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

import { useStatevalue } from "../context/StateProvider";

import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";

import { motion } from "framer-motion";

const Header = () => {
  const [{ user }, dispatch] = useStatevalue();
  const navigate = useNavigate();

  const [isMenu, setIsMenu] = useState(false);

  const logOut = () => {
    const firebaseAuth = getAuth(app);

    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (
    <div className="sticky top-0 z-[100] w-4/5 border border-solid shadow-lg mt-2 border-dosang rounded-sm bg-primary">
    <header className=" flex items-center w-full p-4 md:py-2 md:-px-6 ">
      <NavLink to={"/"}>
        <img src={Logo} alt="Logo" className="w-28 h-16" />
      </NavLink>
      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/Music"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Musics
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/Premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Premium
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/Contact"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
      <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
        <img
          src={user?.user.imageURL}
          alt=""
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-dosang text-lg">
            {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-purpleRed font-normal">
            Premium Member.
            <FontAwesomeIcon
              icon={faCrown}
              className="text-sm -ml-1 text-yellow-500"
            />
          </p>
        </div>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 50 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 flex flex-col py-2 pl-12 top-[-1px] right-0 w-275 gap-4 bg-card border shadow-lg rounded-lg backdrop-blur-sm"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out ">
                Profile
              </p>
            </NavLink>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out ">
              My Favourites
            </p>

            <hr />

            {user?.user?.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out ">
                    Dashboard
                  </p>
                </NavLink>
                <hr />
              </>
            )}
          

            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out "
              onClick={logOut}
            >
              Log Out
            </p>
          </motion.div>
        )}
      </div>
    </header>
    </div>
  );
};

export default Header;
