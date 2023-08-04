import React, { useEffect, useState } from "react";
import { useStatevalue } from "../context/StateProvider";
import {motion} from 'framer-motion'
import { RiPlayList2Fill } from "react-icons/ri";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { actionType } from "../context/reducer";
import { getAllSongs } from "../api";
import { IoMusicalNotes , IoArrowRedo } from "react-icons/io5";

const MusicPlayer = () => {
  const [{ allSongs, songIndex, isSongPlaying,miniPlayer}, dispatch] = useStatevalue();

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };
  const nextTrack = () =>{
    if(songIndex > allSongs.length -1 ){
      dispatch({
        type : actionType.SET_SONG_INDEX,
        songIndex: 0,
      })
    }else {
      dispatch({
        type : actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1,
    })
  }
}
  const previosTrack = () =>{
    if(songIndex === 0){
      dispatch({
        type : actionType.SET_SONG_INDEX,
        songIndex: 0,
      })
    }else {
      dispatch({
        type : actionType.SET_SONG_INDEX,
        songIndex: songIndex - 1,
    })
  }
  }

  const [isPlayList, setIsPlayList] = useState(false)
  return (
    <div className="w-full flex items-center justify-center gap-3 ">
      <div className={`w-full items-center gap-3 p-4 flex relative`}>
        <img
          src={allSongs[songIndex]?.imageURL}
          alt=""
          className="w-20 h-20 object-contain rounded-full bg-black"
        ></img>
        <div className=" flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold">
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }
          
          `}{" "}
            <span className="text-base">({allSongs[songIndex]?.album})</span>
          </p>
          <p className="text-textColor">
            {allSongs[songIndex]?.artist}{" "}
            <span className="text-sm text-textColor font-semibold">
              ({allSongs[songIndex]?.category})
            </span>
          </p>
          <motion.i
          whileTap={{scale : 0.8}}
          onClick={() => setIsPlayList(!isPlayList)}>

            <RiPlayList2Fill className="text-textColor hover:text-headingColor text-2xl"/>
          </motion.i>
        </div>
        <div className="flex-1">
        <AudioPlayer
        src={allSongs[songIndex]?.songURL}
        onPlay={() => console.log("is playing")}
        autoPlay={false}
        showSkipControls={true}
        onClickNext={nextTrack}
        onClickPrevious={previosTrack}
        >
        </AudioPlayer>

        </div>
        <div className="h-full flex items-center justify-center flex-col gap-3">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <div className="text-textColor hover:text-headingColor text-2xl cursor-pointer" >
              CLose
            </div>
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
        </div>
        {
          isPlayList && (
            <PlayListCard/>
          )
        }
        {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2 "
        >
          <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
            <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
            <img
              onClick={togglePlayer}
              src={allSongs[songIndex]?.imageURL}
              className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </div>
        </motion.div>
      )}
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
  },[])
  const setCurrentPlaySong = (index) =>{
    if(!isSongPlaying){
      dispatch({
        type : actionType.SET_ISSONG_PLAYING,
        isSongPlaying:true,
      })
    }
    if(songIndex !== index){
      dispatch({
        type : actionType.SET_SONG_INDEX,
        songIndex: index,
      })
    }
  }

  return(
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col
    overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary"
    >
      {allSongs.length > 0 ? (
        allSongs.map((music,index) => (
          <motion.div
          key={index}
          initial={{opacity: 0 , translateX: -50}}
          animate={{opacity: 1, translateX: 0}}
          transition={{duration: 0.3, delay: index * 0.1}}
          className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
          onClick={()=> setCurrentPlaySong(index)}
          >
          <IoMusicalNotes className="text-xanh group-hover:text-headingColor text-2xl cursor-pointer"/>
          <div className="flex items-start flex-col">
              <p className="text-lg text-dosang font-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-xanh">
                {music?.artist}{" "}
                <span className="text-sm text-xanh font-semibold">
                  ({music?.category})
                </span>
              </p>
              </div>
          </motion.div>
        ))
      ): <>

      </>}
    </div>
  )

}

export default MusicPlayer;
