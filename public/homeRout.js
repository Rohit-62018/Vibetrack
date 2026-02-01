const homeBtn = document.querySelector('.home');
homeBtn.addEventListener('click',async()=>{
    document.querySelector('.nav').classList.add('active');
    await axios.get(`/api/home`)
       .then(response => {
            contentInject(response.data);
            document.querySelector('.nav.active').classList.remove('active');
        })
        .catch(err=>{console.log(err);
            document.querySelector('.nav').classList.remove('active');
        });

    
})