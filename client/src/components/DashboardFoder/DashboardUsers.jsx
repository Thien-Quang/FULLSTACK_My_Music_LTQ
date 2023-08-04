import React, { useEffect, useState } from "react";
import { useStatevalue } from "../../context/StateProvider";
import { changingUserRole, getAllUsers, removeUser } from "../../api";
import {actionType} from "../../context/reducer"
import moment from "moment";
import { motion } from "framer-motion";
import {MdDeleteForever} from "react-icons/md"


export const DashboardUserCard = ({ data, idex }) => {
  console.log(data);
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");
  const [{ user, allUsers}, dispatch] = useStatevalue();
  const [isUserRoleUpdate, setIsUserRoleUpdate] = useState(false);

  useEffect(() => {
    
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, []);

  const updateUserRole = (userId, role) =>{
     setIsUserRoleUpdate(false);
      changingUserRole(userId,role).then((res) =>{
        if(res){
          getAllUsers().then((data) => {
            dispatch({
              type : actionType.SET_ALL_USERS,
              allUsers : data.data
            })
          })
        }
      })
  }
  const deleteUser = (userId) => {
      removeUser(userId).then((res) =>{
        if(res){
          getAllUsers().then((data) => {
            dispatch({
              type : actionType.SET_ALL_USERS,
              allUsers : data.data
            })
          })
        }
      })
  }
  return (
    <motion.div
      className="relative w-full rounded-md flex items-center justify-center py-4
      bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      {data._id !== user?.user._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-100"
          onClick={() => deleteUser(data._id)}
        >
          <MdDeleteForever className="text-xl text-red-400 hover:text-red-500" />
        </motion.div>
      )}

      {/* {user image} */}
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img
          src={data.imageURL}
          referrerPolicy="no-referrer"
          alt=""
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      {/* user name */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email_verfied ? "true" : "false"}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {createdAt}
      </p>

      <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor  text-center">{data.role}</p>

        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="text-[12px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md "
            onClick={() => setIsUserRoleUpdate(true)}
          >
            {data.role === "admin" ? "member" : "admin"}
          </motion.p>
        )}
        {isUserRoleUpdate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-6 right-4 p-4 flex flex-col gap-4 bg-white shadow-xl rounded-md"
          >
            <p className="text-textColor text-sm font-semibold ">
              Bạn có thật sự muốn thay đổi thành :
              <span>{data.role === "admin" ? " Member" : " Admin"} </span> ?{" "}
            </p>
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-400 text-black hover:shadow-md"
                onClick={() =>
                  updateUserRole(
                    data._id,
                    data.role === "admin" ? "member" : "admin"
                  )
                }
              >
                YES
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-400 text-black hover:shadow-md"
                onClick={() => setIsUserRoleUpdate(false)}
              >
                NO
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStatevalue();

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div
        className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 
    flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3"
      >
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count :{allUsers?.length > 0 ? allUsers?.length : 0}
            </span>
            {/* {filtereUsers ? filtereUsers?.length : allUsers?.length} */}
          </p>
        </div>

        <div className="w-full min-w-[750px] flex items-center justify-between">
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Created</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>{" "}
        </div>
        {allUsers &&
          allUsers?.map((data, i) => (
            <DashboardUserCard data={data} key={data._id} index={i} />
          ))}
      </div>
    </div>
  );
};

export default DashboardUsers;
