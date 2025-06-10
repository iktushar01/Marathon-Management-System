import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";

const UserAvatar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Link to="/profileinfo">
        <div className="flex items-center gap-2 cursor-pointer">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User profile"
              className="w-12 h-12 rounded-full object-cover border border-yellow-400"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default UserAvatar;
