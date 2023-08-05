        let fav= localStorage.getItem('fav') || 'https://i.ibb.co/y6L3X97/image.png';
        let title = localStorage.getItem('title') || 'Game0';
        let toSet = document.querySelector('link[rel=icon]')
        toSet.href = fav
       toSet = document.querySelector('title')
        toSet.innerHTML = title