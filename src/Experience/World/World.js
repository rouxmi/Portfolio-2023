import * as THREE from 'three';
import { EventEmitter } from 'events';
import Experience from '../Experience';

import { Octree } from 'three/examples/jsm/math/Octree.js';
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper.js';

import SpawnIsland from './SpawnIsland/SpawnIsland.js';
import AboutMeIsland from './AboutMeIsland/AboutMeIsland.js';
import HobbiesIsland from './HobbiesIsland/HobbiesIsland.js';
import ProjectsIsland from './ProjectsIsland/ProjectsIsland.js';
import ContactIsland from './ContactIsland/ContactIsland.js';
import Player from './Player/Player';


export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.scene = this.experience.scene;
        this.time = this.experience.time;

        this.octree = new Octree();

        this.localStorage = this.experience.localStorage;
        this.state = this.localStorage.state;

        this.player = null;

        this.SpawnIsland;
        this.AboutMeIsland;
        this.ProjectsIsland;
        this.HobbiesIsland ;
        this.ContactIsland ;

        this.islandPosition = {
            spawnIsland: new THREE.Vector3(0, 0, 0),
            aboutMeIsland: new THREE.Vector3(0, 0, 0),
            projetIsland: new THREE.Vector3(0, 0, 0),
            hobbiesIsland: new THREE.Vector3(0, 0, 0),
            contactIsland: new THREE.Vector3(0, 0, 0),
        }

        
        this.resources.determineLoad(this.state.location);
        
        this.resources.on("spawnIslandready", () => {
            if (this.player == null){
                this.player = new Player();
            }
            this.setWorld();
            // this.experience.theme.on("switch", (theme) => {
            //     this.SpawnIsland.Environment.switchTheme(theme);
            // });     
        });



        const helper = new OctreeHelper(this.octree);
        helper.visible = true;
        //this.scene.add(helper);
    }

    setWorld() {
        
        
        this.SpawnIsland = new SpawnIsland();
        this.SpawnIsland.on("IslandSpawnLoaded", () => {
            this.resources.determineLoad("aboutMeIsland");
            this.resources.on("aboutMeIslandready", () => {
                this.SpawnIslandLoaded = true;
                this.setAboutMeIsland();
            });
        });
        this.SpawnIsland.init();
        this.player.setInteractiveObjects(this.SpawnIsland.interactiveObjects.interactiveObject);
    }

    setAboutMeIsland() {
        this.AboutMeIsland = new AboutMeIsland();
        this.AboutMeIsland.on("IslandAboutMeLoaded", () => {
            this.resources.determineLoad("projectsIsland");
            this.resources.on("projectsIslandready", () => {
                this.AboutMeIslandLoaded = true;
                this.setProjectsIsland();
            }
            );
        });
        this.AboutMeIsland.init();
        this.player.addInteractiveObjects(this.AboutMeIsland.interactiveObjects.interactiveObject);
    }

    setProjectsIsland() {
        this.ProjectsIsland = new ProjectsIsland();
        this.ProjectsIsland.on("IslandProjectsLoaded", () => {
            this.resources.determineLoad("hobbiesIsland");
            this.resources.on("hobbiesIslandready", () => {
                this.ProjectsIslandLoaded = true;
                this.setHobbiesIsland();
            });
        });
        this.ProjectsIsland.init();
        this.player.addInteractiveObjects(this.ProjectsIsland.interactiveObjects.interactiveObject);
    }

    setHobbiesIsland() {
        this.HobbiesIsland = new HobbiesIsland();
        this.HobbiesIsland.on("IslandHobbiesLoaded", () => {
            this.resources.determineLoad("contactIsland");
            this.resources.on("contactIslandready", () => {
                this.hobbiesIslandLoaded = true;
                this.setContactIsland();
            }
            );
        });
        this.HobbiesIsland.init();
        this.player.addInteractiveObjects(this.HobbiesIsland.interactiveObjects.interactiveObject);
    }

    setContactIsland() {
        this.ContactIsland = new ContactIsland();
        this.ContactIsland.on("IslandContactLoaded", () => {
            this.player.addInteractiveObjects(this.ContactIsland.interactiveObjects.interactiveObject);
            this.allLoaded = true;
            this.emit("allIslandsLoaded")
        });
        this.ContactIsland.init();
    }

    startWelcome() {
        const welcomeMessage = document.querySelector(".welcome-message-wrapper");
        welcomeMessage.classList.remove("hidden");
        const welcomeMessageTextWelcome = document.querySelector(".welcome-message_text-welcome");
        welcomeMessageTextWelcome.innerHTML = "Welcome,"
        const welcomeMessageTextName = document.querySelector(".welcome-message_text-name");
        welcomeMessageTextName.innerHTML = "I'm Rémi Bourdais,"
        const welcomeMessageTextPortfolio = document.querySelector(".welcome-message_text-portfolio");
        welcomeMessageTextPortfolio.innerHTML = "This is my portfolio."
        const welcomeMessageSubText = document.querySelector(".welcome-message_subtext");
        welcomeMessageSubText.innerHTML = "This is an immersive experience. <br /> Please use a desktop computer for the best experience."
        const startButton = document.querySelector(".start-button-wrapper");
        startButton.innerHTML = `<button class="start-button" type="button">
            <span class="start-button_text">Start</span>
            </button>`
        startButton.addEventListener("click", () => {
            this.asClicked = true;
            if (this.experience.sizes.width <968 || this.experience.sizes.height < 600){
                alert("Please use a bigger screen to enjoy the full experience");
            } else {
                this.startLoading();
                document.body.requestPointerLock();
            }
        });
    }

    startLoading() {
        document.querySelector(".welcome-message-wrapper").classList.add("hidden");
        const pl = document.querySelector(".loader-wrapper");
        pl.innerHTML = `<svg class="pl" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="hsl(193,43%,66%)" />
                <stop offset="100%" stop-color="hsl(223,43%,66%)" />
            </linearGradient>
            </defs>
            <circle class="pl__ring" r="56" cx="64" cy="64" fill="none" stroke="hsla(0,10%,10%,0.1)" stroke-width="16" stroke-linecap="round" />
            <path class="pl__worm" d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z" fill="none" stroke="url(#pl-grad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="44 1111" stroke-dashoffset="10" />
        </svg>
        <p class="percentage"></p>`;
        document.querySelector(".loader").classList.remove("hidden");
        if (this.allLoaded){
            const percent = document.querySelector(".percentage");
            percent.innerHTML = "100%";
            setTimeout(() => {
                this.startInteraction();
            }, 1000);
        } else {
            const percent = document.querySelector(".percentage");
            percent.innerHTML = "0%";
            if (this.SpawnIslandLoaded){
                percent.innerHTML = "20%";
            }  
            if (this.AboutMeIslandLoaded){
                percent.innerHTML = "40%";
            } 
            if (this.ProjectsIslandLoaded){
                percent.innerHTML = "60%";
            }
            if (this.hobbiesIslandLoaded){
                percent.innerHTML = "80%";
            }
            if (this.allLoaded){
                percent.innerHTML = "100%";
            }
            this.resources.on("contactIslandready", () => {
                percent.innerHTML = "100%";
            });
            this.resources.on("hobbiesIslandready", () => {
                percent.innerHTML = "80%";
            });
            this.resources.on("projectsIslandready", () => {
                percent.innerHTML = "60%";
            });
            this.resources.on("aboutMeIslandready", () => {
                percent.innerHTML = "40%";
            });
            this.resources.on("spawnIslandready", () => {
                percent.innerHTML = "20%";
            });
            const loader = Date.now();
            this.on("allIslandsLoaded", () => {
                if (Date.now() - loader > 3000) {
                    this.startInteraction();
                } else {
                    setTimeout(() => {
                        this.startInteraction();
                    }, 3000-Date.now() + loader);
                }
            });
        }
        
    }

    startInteraction() {
        document.querySelector(".loader").classList.add("hidden");
        this.player.startInteraction();
        this.player.player.body.rotation.set(0,3.30,0);
    }




    update(deltaTime){
        if (this.player != null){
            this.player.update(deltaTime);
        }
    }
}
