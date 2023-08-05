if(!localStorage.getItem('cookies')==true){
  (function() {
  function cookies() {
    return document.cookie.split(';').reduce((cookies, cookie) => {
      const [name, value] = cookie.trim().split('=');
      cookies[name] = value;

      Object.keys(localStorage).forEach((a)=>{
        let f=[];
for(var i=0, len=localStorage.length; i<len; i++) {
    var key = localStorage.key(i);
    var val = localStorage[key];
    cookies[key] = val
}
      })
      return cookies;
    }, {});
  }
  function dialog(cookies) {
    const container = document.createElement('div');
    container.id = 'cookieDialog';
    container.style = `
      width:50%;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #111;
      padding: 10px;
      border: 2px solid #ccc;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      overflow:scroll;

      ::-webkit-scrollbar {
    height: 1rem;
    width: .5rem
}

::-webkit-scrollbar:horizontal {
    height: .5rem;
    width: 1rem
}

::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 9999px
}

::-webkit-scrollbar-thumb {
    --tw-border-opacity: 1;
    background-color: rgba(217,217,227,.8);
    border-color: rgba(255,255,255,var(--tw-border-opacity));
    border-radius: 9999px;
    border-width: 1px
}

::-webkit-scrollbar-thumb:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(236,236,241,var(--tw-bg-opacity))
}

      
    `;

    const dialogHeader = document.createElement('h2');
    dialogHeader.textContent = 'Active Cookies:';
    container.appendChild(dialogHeader);

    const cookieList = document.createElement('ul');
    cookieList.style = `
      list-style: none;
      padding: 0;
      margin: 0;
    `;

    for (const [name, value] of Object.entries(cookies)) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<span style="color:darkred">${name}</span>: <span style="color:darkgreen">${value}</span`;
      cookieList.appendChild(listItem);
    }

    container.appendChild(cookieList);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style = `
      margin-top: 10px;
      padding: 5px 10px;
      background-color: #444;
      border: none;
      cursor: pointer;
    `;

    const notice = document.createElement('p')
      notice.innerText = 'These cookies are nessecary for the performance of the site. this notice is here to inform you of what information is stored in them.'
      container.appendChild(notice);
    closeButton.addEventListener('click', () => {
      localStorage.setItem('cookies', true)
      container.style.opacity = 0;
      setTimeout(() => {
        document.body.removeChild(container);
      }, 300);
    });
    container.appendChild(closeButton);

    document.body.appendChild(container);

    setTimeout(() => {
      container.style.opacity = 1;
    }, 10);
  }
  dialog(cookies());
})();
}