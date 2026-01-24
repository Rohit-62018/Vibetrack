const toggleBtn = document.querySelector('.toggle-playlist');
const playlistBox = document.querySelector('.playlist-box');
const dropdownIcon = toggleBtn.querySelector('.dropdown-icon');


// playlist show and hide
toggleBtn.addEventListener('click',()=>{        
    dropdownIcon.classList.toggle('rotate');      
    playlistBox.classList.toggle('show');
    document.getElementById('trash').classList.toggle('show');
})

// document.addEventListener("DOMContentLoaded", () => {
//     if (!window.pageInitialized) {
//       window.pageInitialized = true;
//       PlaylsitSongsExtractData(); 
//     }
// });

// function PlaylsitSongsExtractData(){
//     const songElements = document.querySelectorAll('.individual-song');
//         const SongData = Array.from(songElements).map(el => ({
//             name: el.dataset.name,
//             album: el.dataset.album,
//             url: el.dataset.url,
//             image: el.dataset.image,
//             idx: el.dataset.idx
//         }));
//         playlistSongData = SongData;
// }



// playlist song click event to play song
document.addEventListener('DOMContentLoaded',()=>{
    const playlistBox = document.querySelector('.playlist-box') 
    playlistBox.addEventListener('click',(e)=>{
        const song = e.target.closest('.individual-song');
        if (!song || !playlistBox.contains(song)) return;
        let data = {
            name: song.dataset.name,
            album: song.dataset.album,
            url: song.dataset.url,
            image: song.dataset.image,
            idx: song.dataset.idx
        }
    
        audioPlayer(data);
        songList = playlistSongsList;
        currentIdx = data.idx;
        highlightCurrentSong(currentIdx);
    })
})


//  document.querySelectorAll('.nameGreen').forEach( h5=>{
//             h5.style.color = "white";
//         })
//         document.querySelectorAll('#greenName-Green').forEach(name=>{
//             name.style.color = "white";
//         })

//         song.querySelector('#greenName-Green').style.color ='#43e326';