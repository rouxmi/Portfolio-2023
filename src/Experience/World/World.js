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
            projectsIsland: new THREE.Vector3(0, 0, 0),
            hobbiesIsland: new THREE.Vector3(0, 0, 0),
            contactIsland: new THREE.Vector3(0, 0, 0),
        }

        
        this.resources.determineLoad(this.state.location);
        
        this.resources.on("spawnIslandready", () => {
            if (this.player == null){
                this.player = new Player();
            }
            this.setWorld();
            this.experience.theme.on("switch", (theme) => {
                this.SpawnIsland.Environment.switchTheme(theme);
            });     
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
        });
        this.ContactIsland.init();
    }

    update(deltaTime){
        if (this.player != null){
            this.player.update(deltaTime);
        }
    }
}
