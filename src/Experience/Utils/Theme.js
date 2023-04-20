import {EventEmitter} from 'events'

export default class Theme extends EventEmitter{
    constructor() {
        super();

        this.theme = 'light';

        this.toggleCircle = document.querySelector(".toggle-circle");



        this.setEventListeners();
    }


    setEventListeners() {

        document.addEventListener("keydown", (event) => {
            if (event.code == "KeyN") {
            
                this.theme = this.theme === 'light' ? 'dark' : 'light';
                console.log(this.theme);
                document.body.classList.toggle('dark-theme');
                document.body.classList.toggle('light-theme');
                this.emit('switch', this.theme);
            }
        })
    }
}