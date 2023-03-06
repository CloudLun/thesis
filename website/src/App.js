import React from "react";

import LandingPage from "./Page/LandingPage";
import AlbumsPage from "./Page/AlbumsPage";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] text-white bg-[#282828]">
      <LandingPage />
      <AlbumsPage />
    </div>
  );
}

export default App;
