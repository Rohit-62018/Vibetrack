let MainContentSongsList;
let playlistSongsList;

document.addEventListener("DOMContentLoaded", () => {
    if (!window.pageInitialized) {
      window.pageInitialized = true;
      PlaylsitSongsExtractData(); 
    }
});

function PlaylsitSongsExtractData(){
    const songElements = document.querySelectorAll('.individual-song');
        const SongData = Array.from(songElements).map(el => ({
            name: el.dataset.name,
            album: el.dataset.album,
            url: el.dataset.url,
            image: el.dataset.image,
            idx: el.dataset.idx
        }));
        playlistSongsList = SongData;
}

function extractSongsData(){
    const songElements = document.querySelectorAll('.songDiv');
        const songDataList = Array.from(songElements).map(el => ({
            name: el.dataset.name,
            album: el.dataset.album,
            url: el.dataset.url,
            image: el.dataset.image,
            idx: el.dataset.idx
        }));
        MainContentSongsList = songDataList;
}


