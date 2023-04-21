import {EventEmitter} from 'events'
import Experience from '../Experience.js';

export default class Theme extends EventEmitter{
    constructor() {
        super();

        this.theme = 'light';
        this.experience = new Experience();
        this.subTheme=1;

        this.toggleCircle = document.querySelector(".toggle-circle");



        this.setEventListeners();
    }


    setEventListeners() {

        document.addEventListener("keydown", (event) => {
            if (event.code == "KeyN") {
                this.theme = this.theme === 'light' ? 'dark' : 'light';
                document.body.classList.toggle('dark-theme');
                document.body.classList.toggle('light-theme');
                this.emit('switch', this.theme);
                this.setTheme(this.subTheme);
            }
        })
    }

    setTheme(theme) {
        const root = document.querySelector(":root");
        this.subTheme = theme;
        if (this.theme === 'light'){
            if (theme === 1){
                root.style.setProperty('--color-detail','#caffbf');
            } else if (theme === 2){
                root.style.setProperty('--color-detail','#9bf6ff');
            } else if (theme === 3){
                root.style.setProperty('--color-detail','#ffadad');
            } else if (theme === 4){
                root.style.setProperty('--color-detail','#fdffb6');
            }
        } else{
            root.style.setProperty('--color-detail','#faf4e5');
        }
    }
}