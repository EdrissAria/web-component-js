const template = document.createElement('template');
template.innerHTML = `
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .user-info{
            font-family: 'Arial', sans-serif;
            background: #f4f4f4;
            width: 500px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 10px;
            margin-bottom: 15px;
            border-bottom: darkorchid 5px solid;
            line-height: 30px;
        }
        .user-info img{
            width: 100%;
            height: 140px;
        }
        .user-info button{
            cursor: pointer;
            background: darkorchid; 
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
        }
        .user-info #delete-user{
            background: rgb(248, 70, 46);
        }
        .user-info #update-user{
            background: rgb(90, 199, 76);
        }
        h3{
            color: coral;
            margin-top: 15px;
        }
    </style>
    <div class="user-info">
        <img />
        <div>
          <h3></h3>
          <div class='info'>
            <p><slot name="email"/></p>
            <p><slot name="phone"/></p>
          </div>
          <button id='toggle-info'>Hide info</button>
          <button id='delete-user'>Delete</button>
        </div>
    </div>

`;

class Info extends HTMLElement {
    constructor(){
        super();
        this.showInfo = true;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').textContent = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('image');
        this.shadowRoot.querySelector('.user-info').setAttribute('id', Math.floor(Math.random()* 100));
    }
    deleteUser(id){
        var userid = this.shadowRoot.querySelector('.user-info').getAttribute('id');
        if(userid === id){
            this.shadowRoot.removeChild(this.shadowRoot.querySelector('.user-info'));
        }
    }
    toggleInfo(){
        this.showInfo = !this.showInfo;
        var info = this.shadowRoot.querySelector('.info');
        var toggleinfo = this.shadowRoot.querySelector('#toggle-info');
        if(this.showInfo){
            info.style.display = 'block';
            toggleinfo.textContent = 'Hide info';
        }else{
            info.style.display = 'none';
            toggleinfo.textContent = 'Show info';
        }

    }
    connectedCallback(){
        var id = this.shadowRoot.querySelector('.user-info').getAttribute('id');
        this.shadowRoot.querySelector('#delete-user').addEventListener('click', ()=> this.deleteUser(id));
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', ()=> this.toggleInfo());
    }
    disconnectedCallback(){
        this.shadowRoot.querySelector('#delete-user').addEventListener();
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

window.customElements.define('user-info', Info);