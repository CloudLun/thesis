const fs = require("fs");
const axios = require("axios");

for (let i = 1; i < 4; i++) {
  axios
    .get(
      i === 1
        ? "https://rateyourmusic.com/charts/top/album/2002/"
        : `https://rateyourmusic.com/charts/top/album/2002/${i}`
    )
    .then((res) => {
      fs.appendFileSync("./data/rym_2002.txt", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
