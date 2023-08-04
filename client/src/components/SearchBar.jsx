import React from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStatevalue();
  console.log("serachTerm" ,searchTerm);

  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };

  return (
    <div className="w-full my-4 h-16 bg-dotham flex items-center justify-center">
      <div className="w-full gap-4 p-4 md:w-2/3 bg-[#fceeee] shadow-xl mt-12 rounded-md flex items-center border border-xanh">
        <IoSearch className="text-2xl text-textColor" />
        <input
          type="text"
          value={searchTerm}
          className="w-full h-full bg-transparent text-lg text-[#993399] border-none outline-none "
          placeholder="Search here ...."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;