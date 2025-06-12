import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router';

const GoogleLogin = ({redirect}) => {
    const { googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleGooleLogin = () =>{
        googleSignIn()
        .then(result => {
            console.log(result)
            navigate(redirect || "/");
        })
        .catch(error =>{
            console.log(error)
        })
    }
    return (
        <div>
            {/* Google Login */}
          <div className="text-center">
            <button
            onClick={handleGooleLogin}
              type="button"
              className="flex items-center gap-2 justify-center border-2 border-yellow-400 py-2 w-full rounded hover:bg-yellow-50 transition"
            >
              <FcGoogle size={22} />
              Sign in with Google
            </button>
          </div>
        </div>
    );
};

export default GoogleLogin;