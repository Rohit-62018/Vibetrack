const crypto = require("crypto");
const axios = require("axios");

function decodeMediaUrl(encrypted) {
  const key = "38346591";
  const decipher = crypto.createDecipheriv("DES-ECB", Buffer.from(key), null);
  decipher.setAutoPadding(true);

  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted.replace("http:", "https:");
}

async function getSongForFrontend(songName) {
  try {
    // 🔍 SEARCH
    const searchRes = await axios.get("https://www.jiosaavn.com/api.php", {
      params: {
        __call: "search.getResults",
        q: songName,
        _format: "json",
        _marker: 0,
        api_version: 4,
        ctx: "web6dot0"
      }
    });

    const results = searchRes.data?.results;
    if (!Array.isArray(results) || results.length === 0) {
      return [];
    }

    const songIds = results.map(s => s.id).join(",");
    
    const songRes = await axios.get("https://www.jiosaavn.com/api.php", {
      params: {
        __call: "song.getDetails",
        pids: songIds,
        _format: "json"
      }
    });

    const songsData = songRes.data;
    const finalSongs = [];

    for (const id of Object.keys(songsData)) {
      const song = songsData[id];

      const encrypted =
        song?.more_info?.encrypted_media_url ||
        song?.encrypted_media_url;

      if (!encrypted) {
        console.log("⚠️ No encrypted url for:", song.song);
        continue;
      }

      const audioUrl = decodeMediaUrl(encrypted);

      finalSongs.push({
        id: song.id,
        name: song.song,
        artists: song.primary_artists,
        album: song.album,
        image: song.image?.replace("150x150", "500x500"),
        duration: song.duration,
        audio: audioUrl
      });
    }

    return finalSongs; 

  } catch (err) {
    console.error("Song fetch error:", err.message);
    return [];
  }
}

module.exports = getSongForFrontend;
