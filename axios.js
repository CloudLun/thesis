const fs = require("fs");
const axios = require("axios");

for (let i = 1; i < 4; i++) {
  axios
    .get(
      i === 1
        ? "https://rateyourmusic.com/charts/top/album/2000/"
        : `https://rateyourmusic.com/charts/top/album/2000/${i}`
    )
    .then((res) => {
      fs.appendFileSync("./data/rym_2000.txt", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
