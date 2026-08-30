const flashMsg = document.querySelector('.flash');
const searchBarGlow = document.querySelector('.glow-wrap');
let box = document.querySelector('.box');

// search bar hover border focus
document.addEventListener('click',(e)=>{
  if(!e.target.closest('.box')){
    box.classList.remove('focus');
  }else{
    box.classList.add('focus');
  }
})

// Song search 
let searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress',async(event)=>{
    if(event.key === 'Enter'){
        box.classList.remove('focus');
        searchBarGlow.classList.add('glow');
        await axios.get(`/api/search-check?q=${encodeURIComponent(searchBar.value)}`)
            .then(response => {
                if (response.data.available === true) {
                    searchSongget();
                } else {
                    searchBarGlow.classList.remove('glow');
                    flashMsg.textContent = 'song not found';
                    view();
                }
        });
    }
})

async function searchSongget(){
    await axios.get(`/api/search?q=${encodeURIComponent(searchBar.value)}`)
       .then(response => {
            contentInject(response.data);
            searchBar.value='';
        })
        .catch(err=>console.log(err));
    searchBarGlow.classList.remove('glow');
}



