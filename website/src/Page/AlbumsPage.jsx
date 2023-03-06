import React, {useState} from "react";
import Nav from "../Component/Nav";

import { albums } from "../Data/albums";

const AlbumsPage = () => {
  const [selectValue, setSelectValue] = useState(2022);
  const onChange = (event) => {
    setSelectValue(event.target.value);
  };

  let filterAlbums =
    selectValue && albums.filter((album) => album.year === parseInt(selectValue));

  return (
    <div className="flex flex-col w-[100%] h-[100%]">
      <Nav onChange={onChange} selectValue ={selectValue}/>
      <div className="grid grid-cols-10 grid-rows-10 flex-1 pt-[0px] w-[100%] overflow-scroll">
        {filterAlbums.map((album, index) => {
          return (
            <div
              key={index}
              className="relative w-[100%] h-[10%] transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] cursor-pointer "
            >
              <div className="">
                <img src={album.cover} alt="" className="w-full h-[140px]" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-[10px] h-[140px] bg-black/80  text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="text-[12px] font-bold tracking-[0.5px]">
                  {album.album}
                </div>
                <div className="">
                  <div className="text-[10px] font-bold">{album.artist}</div>
                  <div className="text-[10px] font-normal">
                    {album.genre[0]}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <div className="text-[10px] font-medium">Ranking</div>
                    <div className="text-[10px] font-normal">#{index + 1}</div>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <div className="text-[10px] font-medium">Year</div>
                    <div className="text-[10px] font-normal">{album.year}</div>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <div className="text-[10px] font-medium">Ratings</div>
                    <div className="text-[10px] font-normal">
                      {album.rating}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumsPage;
