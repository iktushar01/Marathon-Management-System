import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center">
          <img
            className="w-14"
            src="https://i.postimg.cc/MpXx3PwJ/stridez.png"
            alt="stridez-logo"
          />
          <div className="text-2xl font-bold text-yellow-400 ml-2">Stridez</div>
        </div>
    );
};

export default Logo;