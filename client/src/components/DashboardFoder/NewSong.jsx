import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../../config/firebase.config";
import { useStatevalue } from "../../context/StateProvider";

import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../../api";
import { actionType } from "../../context/reducer";
import FilterButtons from "../Filter/FilterButtons";
import { filterByLanguage, filters } from "../../utils/supportFunctions";

//import AlertSuccess from "./AlertSuccess";
//import AlertError from "./AlertError";

const NewSong = () => {
  const [songName, setSongName] = useState("");
  const [{ allArtists, allAlbums,allSongs,artistFilter , albumFilter , filterTerm ,languageFilter,alertType }, dispatch] = useStatevalue();


  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [audioImageCover, setAudioImageCover] = useState(null)
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [isAudioUploading, setIsAudioUploading] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null)
  const [artistUploadProgress, setArtistUploadProgress] = useState(0);
  const [isArtistUploading, setIsArtistUploading] = useState(false);
  const [artistName, setArtistName] = useState("")
  const [facebook, setFaceBook] = useState("")
  const [instagram, setInstagram] = useState("")


  const [albumImageCover, setAlbumImageCover] = useState(null)
  const [albumtUploadProgress, setAlbumUploadProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);
  const [albumName, setAlbumName] = useState("")
  


  const alertSuccess= () =>{
    dispatch({
      type:actionType.SET_ALERT_TYPE,
      alertType : "success"
    })
    setInterval(() =>{
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

    setInterval(() =>{
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : null
      })
    },6000)

  }
  useEffect(() => {
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
  });
  const deleteFileImage = (url, isImage) => {
    if (isImage) {
      setIsImageUploading(true);  
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => { 
      setSongImageCover(null);
      setIsImageUploading(false);
    });
    alertSuccess()
  };
  const deleteFileAudio = (url, isAudio) => {
  
    if (isAudio) {
      setIsAudioUploading(true);
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setAudioImageCover(null);
      setIsAudioUploading(false);
    });
    alertSuccess()
  };
  const deleteImageArtist = (url, isImage) => {
    if (isImage) {
      setIsArtistUploading(true);
     
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
     
      setArtistImageCover(null);
      setIsArtistUploading(false);
    });
    alertSuccess()
  };
  const deleteImageAlbum = (url, isImage) => {
    if (isImage) {
      setIsAlbumUploading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setAlbumImageCover(null);
      setIsAlbumUploading(false);
    });
    alertSuccess()
  };


  const saveSong = () =>{
    if(!songImageCover || !audioImageCover){
      alertDanger()

    }else{
      setIsAudioUploading(true)
      setIsImageUploading(true)

      const data = {
        name: songName,
        imageURL :songImageCover,
        songURL : audioImageCover,
        album : albumFilter,
        artist : artistFilter,
        language : languageFilter,
        category : filterTerm, 
      }
      saveNewSong(data).then(res =>{
        getAllSongs().then(songs =>{
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs : data.song
          })
        
        })
      })
      alertSuccess()
      setSongName(null)
      setIsAudioUploading(false)
      setIsImageUploading(false)
      setSongImageCover(null)
      setAudioImageCover(null)

      dispatch({type:actionType.SET_ARTIST_FILTER , artistFilter:null})
      dispatch({type:actionType.SET_LANGUAGE_FILTER , languageFilter:null})
      dispatch({type:actionType.SET_ALBUM_FILTER , albumFilter:null})
      dispatch({type:actionType.SET_FILTER_TERM , filterTerm:null})

    }
  }

  const saveArtist = () =>{
    if(!artistImageCover || !artistName || !facebook || !instagram){
      alertDanger()
    }else{
      setIsArtistUploading(true);
      const data ={
        name: artistName,
        imageURL : artistImageCover,
        facebook :facebook,
        instagram : instagram,
      }
      saveNewArtist(data).then(res =>{
        getAllArtist().then((data) => {
          dispatch({ 
            type: actionType.SET_ALL_ARTISTS,
             allArtists: data.artist,
            });
        })
      })
      alertSuccess()

      setIsArtistUploading(false)
      setArtistImageCover(null)
      setArtistName("")
      setFaceBook("")
      setInstagram("")

    }
  }

  const saveAlbum =() =>{
    if(!albumImageCover || !albumName){
      alertDanger()
    }else{
      const data = {
        name: albumName,
        imageURL : albumImageCover,
      }
      saveNewAlbum(data).then(res =>{
        getAllAlbums().then((data) => {
          dispatch({ 
            type: actionType.SET_ALL_ALBUMS,
             allAlbums: data.album 
            });
        })
      })
      alertSuccess()
      setIsAlbumUploading(false)
      setAlbumImageCover(null)
      setAlbumName("")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md ">
     
      <input
        type="text"
        placeholder="Song Name ........."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none 
        shadow-sm border border-gray-300 bg-transparent"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={allArtists} flag={"Artist"} />
        <FilterButtons filterData={allAlbums} flag={"Album"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filters} flag={"Category"} />
      </div>

      {/* Image updating */}

      <div className="bg-card backdrop-blur-md w-full  h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageUploading && <FileLoader progress={imageUploadProgress} />}
        {!isImageUploading && (
          <>
            {!songImageCover ? (
              <FileUpLoader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={songImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                ></img>
                <button
                  type="button"
                  className=" absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer
                 outline-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileImage(songImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* audio Updateting */}
      <div className="bg-card backdrop-blur-md w-full  h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAudioUploading && <FileLoader progress={audioUploadProgress} />}
        {!isAudioUploading && (
          <>
            {!audioImageCover ? (
              <FileUpLoader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadProgress}
                isLoading={setIsAudioUploading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <audio
                  src={audioImageCover}
                  controls
                  className="w-full h-full object-cover"
                  alt=""
                ></audio>
                <button
                  type="button"
                  className=" absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer
                 outline-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileAudio(audioImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-60 cursor-pointer p-4 ">
        {isImageUploading || isAudioUploading ? (
          <DisableButton/>
        ):(
          <motion.button whileTap={{scale : 0.75 }}
          className="px-8 py-2 w-full rounded-md text-white bg-red-500 hover:shadow-lg"
          onClick={saveSong}>
            Save
          </motion.button>
        )}
        
      </div>

    {/* update for artist */}
    <p className="text-xl font-semibold text-headingColor">Artist Details</p>
    <div className="bg-card backdrop-blur-md w-full  h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isArtistUploading && <FileLoader progress={artistUploadProgress} />}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
              <FileUpLoader
                updateState={setArtistImageCover}
                setProgress={setArtistUploadProgress}
                isLoading={setIsArtistUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={artistImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                ></img>
                <button
                  type="button"
                  className=" absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer
                 outline-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteImageArtist(artistImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* artist name */}
      <input
        type="text"
        placeholder="Artist Name ........."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none 
        shadow-sm border border-gray-300 bg-transparent"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
       {/* facebook */}
      <div className="flex items-center rounded-md shadow-sm border border-gray-300 w-full">
        
        <input
        type="text"
        placeholder="FaceBook url........."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none 
        shadow-sm border border-gray-300 bg-transparent"
        value={facebook}
        onChange={(e) => setFaceBook(e.target.value)}
      />
      </div>
      {/* instagram */}
      <div className="flex items-center rounded-md shadow-sm border border-gray-300 w-full">
        
        <input
        type="text"
        placeholder="Instagram url........."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none 
        shadow-sm border border-gray-300 bg-transparent"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
      />
      </div>
      <div className="flex items-center justify-center w-60 cursor-pointer p-4 ">
        {isArtistUploading? (
          <DisableButton/>
        ):(
          <motion.button whileTap={{scale : 0.75 }}
          className="px-8 py-2 w-full rounded-md text-white bg-red-500 hover:shadow-lg"
          onClick={saveArtist}>
            Save
          </motion.button>
        )}
        
      </div>

      {/* Album update */}
      <p className="text-xl font-semibold text-headingColor">Artist Details</p>
    <div className="bg-card backdrop-blur-md w-full  h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAlbumUploading && <FileLoader progress={albumtUploadProgress} />}
        {!isAlbumUploading && (
          <>
            {!albumImageCover ? (
              <FileUpLoader
                updateState={setAlbumImageCover}
                setProgress={setAlbumUploadProgress}
                isLoading={setIsAlbumUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={albumImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                ></img>
                <button
                  type="button"
                  className=" absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer
                 outline-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteImageAlbum(albumImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
       {/* artist name */}
       <input
        type="text"
        placeholder="Album Name ........."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none 
        shadow-sm border border-gray-300 bg-transparent"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />
      
      <div className="flex items-center justify-center w-60 cursor-pointer p-4 ">
        {isAlbumUploading? (
          <DisableButton/>
        ):(
          <motion.button whileTap={{scale : 0.75 }}
          className="px-8 py-2 w-full rounded-md text-white bg-red-500 hover:shadow-lg"
          onClick={saveAlbum}>
            Save Album
          </motion.button>
        )}
        
      </div>

    </div>
  );
};
export const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>
      </div>
    </div>
  );
};
export const DisableButton = () => {
  return(
    <button
          disabled
          type="button"
          class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          Loading...
        </button>
  )
}
export const FileUpLoader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const [{alertType} , dispatch] = useStatevalue()
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `${isImage ? "image" : "Audio"}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch({
          type:actionType.SET_ALERT_TYPE,
          alertType : "danger"
        })
        setInterval(() =>{
          dispatch({
            type : actionType.SET_ALERT_TYPE,
            alertType : null
          })
        },5000)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
        dispatch({
          type:actionType.SET_ALERT_TYPE,
          alertType : "success"
        })
        setInterval(() =>{
          dispatch({
            type : actionType.SET_ALERT_TYPE,
            alertType : null
          })
        },5000)
      }
    );
  };
  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to update {isImage ? "an image" : "an audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className="w-0 h-0"
        onChange={uploadFile}
      ></input>
    </label>
  );
};
export default NewSong;
