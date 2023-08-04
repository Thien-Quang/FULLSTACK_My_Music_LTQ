import React, { useEffect } from "react";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";
import { getAllAlbums, getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportFunctions";
import FilterButtons from "./FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";

const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm, allArtists, allAlbums }, dispatch] = useStatevalue();

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
  }, []);

  const updateFilter = (value) => {
    const filterTerm = value;
  
    // Kiểm tra xem filterTerm có phải là trống không
    if (filterTerm === '') {
      return;
    }

    // Gửi hành động đến bộ giảm
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: filterTerm,
    });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({type:actionType.SET_ARTIST_FILTER , artistFilter:null})
    dispatch({type:actionType.SET_LANGUAGE_FILTER , languageFilter:null})
    dispatch({type:actionType.SET_ALBUM_FILTER , albumFilter:null})
    dispatch({type:actionType.SET_FILTER_TERM , filterTerm:null})
  };
  return (
    <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
      <FilterButtons filterData={allArtists} flag={"artist"} />

      <div className=" flex items-center gap-6 mx-4">
        {filters?.map((data) => (
          <p
            key={data.id}
            onClick={() => updateFilter(data.value)}
            className={`text-base ${
              data.value === filterTerm ? "font-semibold" : "font-normal"
            } text-white cursor-pointer hover:font-semibold transition-all duration-100 ease-in-out`}
          >
            {data.name}
          </p>
        ))}
      </div>

      <FilterButtons filterData={allAlbums} flag={"albums"} />

      <FilterButtons filterData={filterByLanguage} flag={"language"} />

      <motion.i
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.75 }}
        onClick={clearAllFilter}
      >
        <MdClearAll className="text-textColor text-xl cursor-pointer" />
      </motion.i>
    </div>
  );
};

export default Filter;