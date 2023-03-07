import React from "react";

import LandingPage from "./Page/LandingPage";
import AlbumsPage from "./Page/AlbumPage/AlbumsPage";
import CountryPage from "./Page/CountryPage/CountryPage";



function App() {
  return (
    <div className="w-[100vw] h-[100vh] first-letter: text-white bg-[#282828]">
      {/* <LandingPage /> */}
      <AlbumsPage />
      <CountryPage />
    </div>
  );
}

export default App;
