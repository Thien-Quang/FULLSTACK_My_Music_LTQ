import React, { useEffect } from "react";
import { useStatevalue } from "../../context/StateProvider";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  getAllUsers,
} from "../../api";
import { bgColors } from "../../utils/styles";
import { actionType } from "../../context/reducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserSecret,
  faMusic,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

import { BiAlbum } from "react-icons/bi";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allAlbums, allArtists }, dispatch] =
    useStatevalue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }

    if (!allArtists) {
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      {/* prettier-ignore */}
      <DashboardCard icon={<FontAwesomeIcon icon={faUserSecret} className="text-3xl text-textColor" /> } name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<FontAwesomeIcon icon={faMusic}  className="text-3xl text-textColor" />} name={"Songs"} count={allSongs && allSongs.length > 0 ? allSongs.length : 0} />

      {/* prettier-ignore */}

      <DashboardCard icon={<FontAwesomeIcon icon={faMicrophone}   className="text-3xl text-textColor" />} name={"Artist"} count={allArtists?.length > 0 ? allArtists?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<BiAlbum className="text-3xl text-textColor" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
    </div>
  );
};

export default DashboardHome;
