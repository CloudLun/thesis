const fs = require("fs");
const cheerio = require("cheerio");

let dataAlbum = [];
let dataArtist = [];
let dataGenre = [];
let dataRating = [];
let dataCover = [];

let content = fs.readFileSync("./data/albums/rym_2000.txt");
let $ = cheerio.load(content);

$("div").each((i, elem) => {
  if ($(elem).attr("class") == "page_charts_section_charts_item_title") {
    let albumHead = $(elem).html().search('inal">');
    let albumTail = $(elem).html().search("</span>");
    let album = $(elem)
      .html()
      .substring(albumHead + 6, albumTail);
    dataAlbum.push(album);
  }
});

// console.log(dataAlbum.length)
// console.log(dataAlbum)

$("div").each((i, elem) => {
  if (
    $(elem).attr("class") ==
    "page_charts_section_charts_item_credited_links_primary"
  ) {
    let artistHead = $(elem).html().search("_original");
    let artistTail = $(elem).html().search("</span>");
    let artist = $(elem)
      .html()
      .substring(artistHead + 11, artistTail)
      .replace(
        "      \n" +
          "\n" +
          "               \n" +
          "               \n" +
          "                        ",
        ""
      )
      .replace(
        "       \n" + "\n" + '                  <span class="artist">',
        ""
      );

    let aTagHead = artist.indexOf(" <a");
    let aTagTail = artist.indexOf('_locale">');
    let aTag = artist.substring(aTagHead, aTagTail - 7);

    let langaugeHead = $(elem).html().indexOf('uage">');
    let langaugeTail = $(elem).html().indexOf("</span");
    let language = $(elem)
      .html()
      .substring(langaugeHead + 6, langaugeTail);

    artist = artist
      .replace(aTag, "")
      .replace('ui_name_locale">', "")
      .replace('      \n\n                  <span class="artist">', "")
      .replace('</span>\n<span class="ui_name_locale_original">', language)
      .trim()

    dataArtist.push(artist);
  }
});

// console.log(dataArtist.length);
// console.log(dataArtist);

// fullDataArtist[20] = "King Gizzard and The Lizard Wizard";
// fullDataArtist[25] = "billy woods x Messiah Musik";
// fullDataArtist[30] = "Asunojokei 明日の叙景";
// fullDataArtist[37] = "King Gizzard and The Lizard Wizard";
// fullDataArtist[59] = "death's dynamic shroud.wmv";
// fullDataArtist[62] = "King Gizzard and The Lizard Wizard";

$("div").each((i, elem) => {
  if (
    $(elem).attr("class") == "page_charts_section_charts_item_genres_primary"
  ) {
    let genre = $(elem).html().trim();
    let tagCount = genre.match(/<a/g).length;
    for (let i = 0; i < tagCount; i++) {
      let tagHead = genre.indexOf("<a");
      let tagTail = genre.indexOf(">");
      let tag = genre.substring(tagHead, tagTail + 1);
      genre = genre
        .replace(tag, "")
        .replace("</a>", "")
        .replace("\n               ", `", "`)
    }

    genre = [genre];
    dataGenre.push(genre);
  }
});

// console.log(dataGenre.length);
// console.log(dataGenre);

$("span").each((i, elem) => {
  if (
    $(elem).attr("class") ==
    "page_charts_section_charts_item_details_average_num"
  ) {
    let rating = $(elem).html();
    dataRating.push(rating);
  }
});

// console.log(dataRating.length);
// console.log(dataRating)

$("a").each((i, elem) => {
  if ($(elem).attr("class") == "page_charts_section_charts_item_image_link") {
    let coverHead = $(elem).html().indexOf("src=");
    let coverTail = $(elem).html().indexOf(" alt");
    let cover = $(elem)
      .html()
      .substring(coverHead + 4, coverTail)
      .replace("//", "");

    let dataImgHead = $(elem).html().indexOf('"data:image');
    let dataImgTail = $(elem).html().indexOf(" data-src=");
    let dataImg = $(elem)
      .html()
      .substring(dataImgHead, dataImgTail + 10);
    cover = cover.replace(dataImg, "").replace('"', "").replace('"', "");
    dataCover.push(cover);
  }
});

// console.log(dataCover.length);
// console.log(dataCover);

let data = [];
for (let i = 0; i < 120; i++) {
  data.push({
    album: dataAlbum[i],
    artist: dataArtist[i],
    year: 2000,
    genre: dataGenre[i],
    rating: dataRating[i],
    cover: dataCover[i],
  });
}

console.log(data.length);

let dataJSON = JSON.stringify(data);
fs.writeFile("./data/albums/data_2000.json", dataJSON, function (err) {
  if (err) throw err;
});
