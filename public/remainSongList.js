const footerSong = document.querySelector('.first')
footerSong.addEventListener('click',()=>{
    if(container.innerHTML === SongList){ console.log("Already loaded"); return ;}
    if(SongList){
    contentInject(SongList);
    highlightCurrentSong(currentIdx);
    }
})