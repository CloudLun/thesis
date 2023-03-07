import React from "react";

const Nav = ({ onAngleChange, selectAngle, onYearChange, onGenreChange }) => {
  const nextPageHandler = () => {
    window.scrollTo({top: window.innerHeight, behavior: "smooth"})
  }
  return (
    <nav className="flex items-center justify-between px-[40px] py-[20px] w-[100%] text-[14px]">
      <div className="font-bold tracking-[1.5px]">EXPLORE TOP COLLECTIONS</div>
      <div className="flex items-center gap-2">
        <div className="font-normal">
          TOP 100 BY
          <select
            name=""
            id=""
            className="h-[20px] font-bold bg-[#282828] focus:outline-none"
            onChange={onAngleChange}
          >
            <option value="years">YEARS</option>
            <option value="genres">GENRES</option>
          </select>
        </div>
        <select
          name=""
          id=""
          className={`h-[20px] bg-[#282828] focus:outline-none ${selectAngle === 'years' ? "visible": "hidden"}`}
          onChange={onYearChange}
        >
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
        </select>
        <select
          name=""
          id=""
          className={`h-[20px] bg-[#282828] focus:outline-none ${selectAngle === 'genres' ? "visible": "hidden"}`}
          onChange={onGenreChange}
        >
          <option value="Rock">Rock</option>
          <option value="Metal">Metal</option>
          <option value="Folk">Folk</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="Pop">Pop</option>
          <option value="Jazz">Jazz</option>
        </select>
      </div>

      <div className="block w-[12px] h-[12px] border-r-2 border-b-2 rotate-45 cursor-pointer" onClick={nextPageHandler}></div>
    </nav>
  );
};

export default Nav;
