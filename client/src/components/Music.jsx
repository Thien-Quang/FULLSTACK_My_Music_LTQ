import React, { useEffect } from "react";
import Header from "./Header";
import { useStatevalue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";
import { IoMusicalNotes } from "react-icons/io5";
import {bgMusic}  from '../assets/video'

const Music = () => {
  const [{ allSongs }, dispatch] = useStatevalue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center bg-primary h-screen">
      <Header />
      <div className="w-full h-auto flex justify-center items-center m-4">
        <div className="w-3/5 grid grid-cols-2 h-650 gap-4 bg-dotham">
          <div className="flex justify-center items-center">
            <div className="w-340 h-340 rounded-full border border-dosang">
              <video
                src={bgMusic}
                type="video/mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover rounded-full"
              ></video>
            </div>
          </div>
          <div className="p-4 flex items-center justify-center">
            <PlayListCard />
          </div>
        </div>
      </div>
    </div>
  );
};
export const PlayListCard = () => {
  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStatevalue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);
  const setCurrentPlaySong = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  return (
    <div className="gap-2 py-2 w-full h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-xanh">
      {allSongs && allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNotes className="text-dosang group-hover:text-headingColor text-2xl cursor-pointer" />
            <div className="flex items-start flex-col">
              <p className="text-lg text-dosang font-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-dosang">
                {music?.artist}{" "}
                <span className="text-sm text-dosang font-semibold">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default Music;
