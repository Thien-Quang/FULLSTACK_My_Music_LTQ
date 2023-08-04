import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteAlbumByID, deleteArtistByID, deleteSongByID, getAllAlbums, getAllArtist, getAllSongs } from "../../api";
import { useStatevalue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { storage } from "../../config/firebase.config";
import { deleteObject, ref } from "firebase/storage";

const SongCard = ({ data, index,type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [{alertType, allArtists , allSongs, allAlbums, songIndex , isSongPlaying}, dispatch] = useStatevalue()

  const alertSuccess= () =>{
    dispatch({
      type:actionType.SET_ALERT_TYPE,
      alertType : "success"
    })
    setTimeout(() =>{
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : null
      })
    },6000)
  }
  const alertDanger = () =>{
    dispatch({
      type:actionType.SET_ALERT_TYPE,
      alertType : "danger"
    })

    setTimeout(() =>{
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : null
      })
    },6000)

  }


  const deleteData =(data) =>{
    /// DELETE SONG
    if(type === "song"){
      const deleref = ref(storage,data.imageURL);
      deleteObject(deleref).then(() => {})
      deleteSongByID(data._id).then((res) =>{
        if(res.data){
          alertSuccess();
          getAllSongs().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.song,
            });
          });
        }else{
          alertDanger();
        }
      })
    }
    //DELETE ALBUM
    if(type === "album"){
      const deleref = ref(storage,data.imageURL);
      deleteObject(deleref).then(() => {})

      deleteAlbumByID(data._id).then((res) =>{
        if(res.data){
          alertSuccess();
          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.album,
            });
          });
        }else{
          alertDanger();
        }
      })
    }

     //DELETE ARIST
     if(type === "artist"){
      const deleref = ref(storage,data.imageURL);
      deleteObject(deleref).then(() => {})

      deleteArtistByID(data._id).then((res) =>{
        if(res.data){
          alertSuccess();
          getAllArtist().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data.artist,
            });
          });
        }else{
          alertDanger();
        }
      })
    }


  }
  const addToContext =() =>{
    if(!isSongPlaying){
      dispatch({
        type :actionType.SET_ISSONG_PLAYING,
        isSongPlaying:true

      })
    }
     if(songIndex !== index){
      dispatch({
        type : actionType.SET_SONG_INDEX,
        songIndex : index,
      })
    }
   }
  return (
    <motion.div
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 
    shadow-md rounded-lg flex flex-col items-center"
     onClick={type ==='song' && addToContext}
     >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-center text-headingColor font-semibold my-4">
        {data.name.length > 20 ? `${data.name.slice(0, 20)}...` : data.name}
        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {data.artist.length > 20
              ? `${data.name.slice(0, 20)}...`
              : data.artist}
          </span>
        )}
      </p>
      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4 ">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-xl text-red-400 drop-shadow-md hover:text-red-600"
          onClick={() => setIsDelete(true)}>
          <RiDeleteBin2Line />
        </motion.i>
      </div>
      {isDelete &&(
      <motion.div
        className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-xl text-headingColor font-semibold text-center">
          Are you sure do you want to delete it ?
        </p>
        <div className="flex items-center justify-center gap-4">
          <motion.button
            className="px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer"
            whileTap={{ scale: 0.7 }}
            onClick={() =>deleteData(data)}
          >
            Yes
          </motion.button>
          <motion.button
            className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-green-500 cursor-pointer"
            whileTap={{ scale: 0.7 }}
            onClick={() => setIsDelete(false)}
          >
            No
          </motion.button>
        </div>
      </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
