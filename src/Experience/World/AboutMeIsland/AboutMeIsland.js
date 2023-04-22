import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";

import { EventEmitter } from "events";
import Experience from "../../Experience.js";

export default class AboutMeIsland extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.player = this.experience.world.player;
    }

    init() {
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();

        this.emit("IslandAboutMeLoaded");
    }

    launchInteractiveObjects(interactiveObject) {
        if (interactiveObject.includes("bureau")) {
            this.handleBureau();
        } else if (interactiveObject.includes("chambre")) {
            this.handleChambre();
        }
    }

    handleBureau() {
        this.experience.theme.setTheme(3);
        const section = document.querySelector(".section-left");
        section.classList.remove("hidden");
        const titreWrapperSection = document.querySelector(".section-title");
        titreWrapperSection.classList.add("left-margin");
        const titreSection = document.querySelector(".section-title-text-left");
        titreSection.innerHTML = "About Me";
        const sousTitreSection = document.querySelector(".section-subtitle-text-left");
        sousTitreSection.innerHTML = "Skills";
        const textSection = document.querySelector(".section-detail-left");
        textSection.innerHTML = `
        <p class="header-section-detail-right">A non exaustive list of the Language that I use :</p>
        <div class='skills'>
            <div class='skill'>
                <img src='image/Java.png' alt='Java' class='skill-logo'>
                <p class='skill-name'>Java</p>
                </div>
            <div class='skill'>
                <img src='image/Go.png' alt='Go' class='skill-logo'>
                <p class='skill-name'>Go</p>
            </div>
            <div class='skill'>
                <img src='image/ASM.png' alt='CSS3' class='skill-logo'>
                <p class='skill-name'>ASM</p>
            </div>
            <div class='skill'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630" alt='JavaScript' class='skill-logo'>
                <rect width="630" height="630" fill="#f7df1e"/>
                <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"/>
                </svg>
                <p class='skill-name'>JavaScript</p>
            </div>
            <div class='skill'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 272">
                <path d="M136.28 4.09L217.95 4 80.93 140.95l-35.71 35.51-40.63-40.68L136.28 4.09zm-.76 122.28c1.06-1.4 3.01-.71 4.49-.89l77.87.02-70.97 70.9-40.84-40.59 29.45-29.44z" fill="#44d1fd"/>
                <path fill="#1fbcfd" d="M65.36 196.47l40.71-40.66 40.84 40.59.17.18-41 40.62-40.72-40.73z"/>
                <path fill="#08589c" d="M106.08 237.2l41-40.62 70.83 70.9c-26.68.06-53.35-.02-80.02.04-1.52.34-2.46-1.05-3.43-1.91l-28.38-28.41z"/></svg>
                <p class='skill-name'>Flutter</p>
            </div>
            <div class='skill'>
                <img src='image/C.png' alt='C' class='skill-logo'>
                <p class='skill-name'>C</p>
            </div>
            <div class='skill'>
                <img src='/image/Python.png' alt='Python' class='skill-logo'>
                <p class='skill-name'>Python</p>
            </div>
            <div class='skill'>
                <img src='image/R.png' alt='R' class='skill-logo'>
                <p class='skill-name'>R</p>
            </div>
            <div class='skill'>
                <img src='image/Tableau.png' alt='Unity' class='skill-logo'>
                <p class='skill-name'>Tableau</p>
            </div>
        </div>`;

        this.player.display = section;
    }

    handleChambre() {
        this.experience.theme.setTheme(3);
        const section = document.querySelector(".section-right");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-right");
        titreSection.innerHTML = "About Me";
        const sousTitreSection = document.querySelector(".section-subtitle-text-right");
        sousTitreSection.innerHTML = "Intro";
        const textSection = document.querySelector(".section-detail-right");
        textSection.innerHTML = "Hi, I'm Rémi Bourdais, a french student in computer science at Telecom Nancy. I'm 21 years old and I'm currently in my 4th year of studies. I'm interrested in Web Application in particular the immersive one and cybersecurity.";
        this.player.display = section;
    }


    resize() {
    }

    update() {
    }
}