const nextSong = document.querySelector('.fa-forward-step')
const previousSong = document.querySelector('.fa-backward-step');
let songList;
let currentIdx;

nextSong.addEventListener('click',NextSong);
previousSong.addEventListener('click',PreviousSong);

// next song
function NextSong(){
    if(songList.length > currentIdx){
        audioPlayer(songList[++currentIdx - 1]);
        highlightCurrentSong(currentIdx);
        
    }else
        console.log("Over-flow");
};

// previous song
function PreviousSong(){
    if(currentIdx > 1){
        audioPlayer(songList[--currentIdx-1]);
        highlightCurrentSong(currentIdx);
    }
};

function highlightCurrentSong(idx) {

    let h5;
    let matchedSongDiv;
    
    document.querySelectorAll('.nameGreen, #greenName-Green').forEach(el => {
        el.style.color = "white";
    });

    if (songList !== MainContentSongsList) {
        matchedSongDiv = Array.from(
            document.querySelectorAll('.individual-song')
        ).find(div => div.dataset.idx == idx);

        if (matchedSongDiv) {
            h5 = matchedSongDiv.querySelector('#greenName-Green');
        } 
    } else {
        matchedSongDiv = Array.from(
            document.querySelectorAll('.songDiv')
        ).find(div => div.dataset.idx == idx);

        if (matchedSongDiv) {
            h5 = matchedSongDiv.querySelector('.nameGreen');
        }
    }

    if (h5) {
        h5.style.color = '#43e326';
    }
}

//  document.querySelectorAll('.nameGreen').forEach( h5=>{
//             h5.style.color = "white";
//         })
//         document.querySelectorAll('#greenName-Green').forEach(name=>{
//             name.style.color = "white";
//         })

//         song.querySelector('#greenName-Green').style.color ='#43e326';