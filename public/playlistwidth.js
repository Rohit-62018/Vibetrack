const resizable = document.querySelector('.side-container');
const el1 = document.querySelector('.createPlayList');
const heading = resizable.querySelector('h6');


resizable.addEventListener('click', (e) => {
  
  const currentWidth = resizable.offsetWidth;

  if (currentWidth < 280) {
    resizable.style.width = '280px';
    
    setTimeout(() => {
      if (el1) el1.style.display = 'block';
      if (heading) heading.style.display = 'block';
    }, 200);

    resizable.classList.remove('collapsed');

  } else {
    resizable.style.width = '1rem';
    
    if (el1) el1.style.display = 'none';
    if (heading) heading.style.display = 'none';

    resizable.classList.add('collapsed');
  }

});

const innerElements = document.querySelectorAll('.createPlayList button, .playlist-box, .delete-zone');

innerElements.forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});


