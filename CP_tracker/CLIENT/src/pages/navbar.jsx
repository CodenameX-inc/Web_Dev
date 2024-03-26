import React from "react";

const navbar = () => {
  return (
    <div className="flex flex-col items-center min-h-screen overflow-auto">
      <div className="flex flex-col items-center justify-center w-full bg-black bg-opacity-80 p-8">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="flex items-center">
            <div className="mr-2.5 flex items-start overflow-hidden bg-cover">
              <img
                id="logoImg"
                src="./assets/logo.png"
                alt="logo"
                className="w-9 h-9"
              />
            </div>
            <span className="text-white text-xs font-bold">
              WebStack essentials
            </span>
          </div>
          ...
        </div>
        ...
      </div>
    </div>
  );
};

export default navbar;
