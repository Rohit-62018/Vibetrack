const container = document.getElementById('content');  
const loadingIndicator = document.querySelector('.nav');
let SongList;

async function loadSongs(songName,url){
        loadingIndicator.classList.add('active');
        const encodeSongName = encodeURIComponent(songName);
        const encodeurl = encodeURIComponent(url);
        await axios.get(`/api/music?q=${encodeSongName}&Url=${encodeurl}`)
            .then(res => {contentInject(res.data);
                loadingIndicator.classList.remove('active');
            })
            .catch(err => {console.error('Fetch error:', err);
                loadingIndicator.classList.remove('active');
            }); 
}

function contentInject(response){ 
    try{
        container.innerHTML = response;
        setTimeout(()=>{
            songObjreceiver();
            const img = document.querySelector('#Img');
            if(!img){
                console.log ("Image not found");
                return;
            }
            changeColor = ()=> {
                try{
                    const colorThief = new ColorThief();
                    const color = colorThief.getColor(img);
                    const dominatedcolour = `rgb(${color.join(',')})`
                    document.querySelector('.headList').style.backgroundColor = dominatedcolour;
                }catch(err){
                    console.error("failed to extract color:",err);
                }
            }
            if(img.complete){
                changeColor();
            }
            img.addEventListener("load",changeColor) ;
            formatAllDurations();
            extractSongsData(); 
            addSong(); 
            
        },200)
    }
    catch(err){
        console.error('Error',err);
    }
}

function formatAllDurations() {
    document.querySelectorAll('.Duration').forEach(p => {
        const seconds = parseInt(p.dataset.duration); 
        if (!isNaN(seconds)) {
            p.innerText = formatTime(seconds);
        } else {
            p.innerText = "--:--";
        }
    });
}

function songObjreceiver(){
    document.querySelectorAll('.songDiv').forEach(songDiv=>{
        songDiv.addEventListener("click",()=>{
            const songData = {...songDiv.dataset};
            fetch(`/api/isAuthenticated`)
                .then(data=>data.json())
                .then(res =>{
                    if(res.valid){
                        audioPlayer(songData);
                        SongList = container.innerHTML; 
                        currentIdx = songData.idx;
                        songList = MainContentSongsList;
                        highlightCurrentSong(songData.idx);  
                    }else{
                        flashMsg.textContent = 'You must login';
                        view();
                        viewLoginPage();
                    }
                })
                .catch(err=>console.log(err.message));
        })
    })
 }


