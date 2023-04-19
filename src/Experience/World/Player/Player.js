import * as THREE from "three";
import Experience from "../../Experience";

import { Capsule} from "three/examples/jsm/math/Capsule";
import { EventEmitter } from "events";

export default class Player extends EventEmitter{

    constructor() {
        super();
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.world = this.experience.world;

        this.octree = this.experience.world.octree; 

        this.display = null;

        this.initPlayer();
        this.initControls();
        this.addEventListeners();
    }

    initPlayer() {
        this.player = {};
        this.player.body = this.camera.perspectiveCamera;

        this.player.previousPosition = new THREE.Vector3();

        this.player.onFloor = false;
        this.player.gravity = 60;

        this.player.spawn = {
            position : new THREE.Vector3(),
            rotation : new THREE.Euler(),
            velocity : new THREE.Vector3(),
        };

        this.player.island = localStorage.getItem("playerPosition").split("|")[0];

        this.player.raycaster = new THREE.Raycaster();
        this.player.raycaster.far = 10;
        this.player.raycaster.near = 0.1;

        this.player.height = 2.7;
        this.player.position = new THREE.Vector3(
            -40.13299673513737,
            24.73186758224389,
            -58.42532007498026,);

        this.player.body.position.copy(this.player.position);
        this.player.body.position.y += this.player.height;

        this.player.rotation = new THREE.Euler();
        this.player.rotation.order = "YXZ";


        this.player.velocity = new THREE.Vector3();

        this.player.direction = new THREE.Vector3();

        this.player.speedMultiplier = 0.8;

        this.player.collider = new Capsule(
            new THREE.Vector3(),
            new THREE.Vector3(),
            0.45,
        );

        this.player.canInteract = false;

        this.teleportToSpawn();
    }

    initControls() {
        this.action= {};
    }

    teleportToSpawn() {
        const SpawnPos = new THREE.Vector3( -40.13299673513737,  24.73186758224389,  -58.42532007498026);
        this.player.body.position.copy(SpawnPos);
        this.player.body.position.y += this.player.height;
        this.player.body.rotation.set(0,3.4,0);
        this.player.velocity = this.player.spawn.velocity;
        this.player.collider.start.copy(SpawnPos);
        this.player.collider.end.copy(SpawnPos);
        this.player.collider.end.y += this.player.height;
    }


    addEventListeners() {
        
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);

        document.addEventListener("pointerdown",this.onPointerDown);
        document.addEventListener("pointermove",this.onDesktopPointerMove);
    }

    onKeyDown = (event) => {

        if (document.pointerLockElement !== document.body) return;


        if (event.code === "KeyW") {
            this.action.forward = true;
            if (Date.now() - this.lastKeyW < 200) {
                this.action.sprint = true;
            }
            this.lastKeyW = Date.now();
        }

        if (event.code === "KeyA") {
            this.action.left = true;
        }

        if (event.code === "KeyS") {
            this.action.backward = true;
        }

        if (event.code === "KeyD") {
            this.action.right = true;
        }

        if (event.code === "Space") {
            this.action.jump = true;
        }

        if (event.code === "ShiftLeft") {
            this.action.sprint = true;
        }


    }

    onKeyUp = (event) => {

        if (document.pointerLockElement !== document.body) return;


        if (event.code === "KeyW") {
            this.action.forward = false;
        }

        if (event.code === "KeyA") {
            this.action.left = false;
        }

        if (event.code === "KeyS") {
            this.action.backward = false;
        }

        if (event.code === "KeyD") {
            this.action.right = false;
        }

        if (event.code === "Space") {
            this.action.jump = false;
        }

        if (event.code === "ShiftLeft") {
            this.action.sprint = false;
        }
        
    }


    onPointerDown = (event) => {
        if (event.pointerType === "mouse") {
            if (document.pointerLockElement !== document.body) {
                this.action = {};
                document.body.requestPointerLock();
            } else {
                if (this.player.canInteract){
                    this.interactiveActionExecute();
                }
            }
            return;
        }
    }

    interactiveActionExecute(){

        if (this.player.island === "spawnIsland"){
            this.world.SpawnIsland.interactiveActionExecute(this.activeObject);
        } else if (this.player.island === "projetIsland"){
            this.world.ProjectsIsland.interactiveActionExecute(this.activeObject);
        } else if (this.player.island === "contactIsland"){
            this.world.ContactIsland.interactiveActionExecute(this.activeObject);
        } else if (this.player.island === "hobbiesIsland"){
            this.world.HobbiesIsland.interactiveActionExecute(this.activeObject);
        }
    }


    onDesktopPointerMove = (event) => {
        if (document.pointerLockElement !== document.body) return;
        
        this.player.body.rotation.order = this.player.rotation.order;

        this.player.body.rotation.x -= event.movementY * 0.002;
        this.player.body.rotation.y -= event.movementX * 0.002;

        this.player.body.rotation.x = THREE.MathUtils.clamp(
            this.player.body.rotation.x, 
            -Math.PI / 2, 
            Math.PI / 2
        );
    }

    playerCollision() {
        const intersect = this.octree.capsuleIntersect(this.player.collider);
        this.player.onFloor = false;

        if (intersect){
            this.player.onFloor = intersect.normal.y > 0;

            this.player.collider.translate(intersect.normal.multiplyScalar(intersect.depth));
        }

        if (this.world.ProjectsIsland){
            if (this.world.ProjectsIsland.interactiveObjects){
                if (this.world.ProjectsIsland.interactiveObjects.trampoline){
                    const trampoline = this.world.ProjectsIsland.interactiveObjects.trampoline.capsuleIntersect(this.player.collider);
                    if (trampoline){
                        if (this.player.onFloor){
                            this.player.velocity.y = 35;
                            setTimeout(() => {
                                this.world.ProjectsIsland.startGame();
                            }
                            , 600);
                        }
                    }
                }
            }
        }
    }

    getForwardVector() {
        this.camera.perspectiveCamera.getWorldDirection(this.player.direction);
        this.player.direction.y = 0;
        this.player.direction.normalize();

        return this.player.direction;
    }

    getSidesVector() {
        this.camera.perspectiveCamera.getWorldDirection(this.player.direction);
        this.player.direction.y = 0;
        this.player.direction.normalize();

        this.player.direction.cross(this.camera.perspectiveCamera.up);

        return this.player.direction;
    }

    updateMovement(deltaTime) {
        this.player.previousPosition.copy(this.player.body.position);

        if (this.world.ProjectsIsland){
            if (this.world.ProjectsIsland.inGame) return;
        }

        const speed = (this.player.onFloor ? 1.75 : 0.2) * 
        this.player.speedMultiplier *
        this.player.gravity;

        let speedDelta = speed * deltaTime;

        if(this.action.sprint) {
            speedDelta *= 1.7;
        }

        if (this.action.forward) {
            this.player.velocity.add(this.getForwardVector().multiplyScalar(speedDelta));
        }

        if (this.action.backward) {
            this.player.velocity.sub(this.getForwardVector().multiplyScalar(speedDelta*0.6));
        }

        if (this.action.left) {
            this.player.velocity.sub(this.getSidesVector().multiplyScalar(speedDelta*0.8));
        }

        if (this.action.right) {
            this.player.velocity.add(
                this.getSidesVector()
                .multiplyScalar(speedDelta*0.8)
            );
        }

        if (this.player.onFloor) {
            if (this.action.jump) {
                this.player.velocity.y = 17;
            }
        }

        let damping = Math.exp(-10 * deltaTime) - 1;

        if (!this.player.onFloor) {
            this.player.velocity.y -= this.player.gravity * deltaTime;
            damping *=0.1;
        }

        this.player.velocity.addScaledVector(this.player.velocity, damping);

        const deltaPosition = this.player.velocity
            .clone()
            .multiplyScalar(deltaTime);

        
        if (document.pointerLockElement === document.body) {
            this.player.collider.translate(deltaPosition );

            this.playerCollision();

            this.player.body.position.copy(this.player.collider.end);

            this.player.body.updateMatrixWorld();
        }else{
            this.player.velocity.set(0,0,0);
        }
        

        if (this.player.body.position.y < 0) {
            this.teleportToSpawn();
        }
    }

    setInteractiveObjects(interactiveObjects) {
        this.player.interactiveObjects = interactiveObjects;
    }

    addInteractiveObjects(interactiveObjects) {
        this.player.interactiveObjects.add(interactiveObjects);
    }

    getCameraLookAtVector() {
        const direction = new THREE.Vector3(0,0,-1);
        return direction.applyQuaternion(
            this.player.body.quaternion
        );
    }

    updateRaycaster() {
        this.player.raycaster.ray.origin.copy(this.player.body.position);
        this.player.raycaster.ray.direction.copy(this.getCameraLookAtVector());

        const intersects = this.player.raycaster.intersectObjects(
            this.player.interactiveObjects.children
        );

        if (intersects.length > 0) {
            this.activeObject = intersects[0].object.name;
        } else {
            this.activeObject = "";
        }

        if (this.activeObject !== this.previousActiveObject) {
            this.previousActiveObject = this.activeObject;
            if (this.activeObject !== "") {
                this.player.canInteract = true;
                this.launchInteractiveObjectEvent(this.activeObject,intersects[0]);
            }
            else{
                if (this.display !== null) {
                    this.display.classList.add("hidden");
                    const left =document.querySelector(".left-margin")
                    if (left){
                        left.classList.remove("left-margin");
                    }
                    const smallLeft = document.querySelector(".small-left-margin")
                    if (smallLeft){
                        smallLeft.classList.remove("small-left-margin");
                    }
                    if (this.previousActiveObject.includes("trampoline")){
                        document.querySelector(".teleport-message_image").classList.remove("hidden");
                    }
                }
                this.player.canInteract = false;
            }
        } else if (this.activeObject.includes("contact") && intersects[0].distance < 1) {
            this.launchInteractiveObjectEvent(this.activeObject,intersects[0]);
        }
    }



    launchInteractiveObjectEvent(activeObject,intersect) {
        if (activeObject.includes("spawn")) {
            this.experience.localStorage.setLocation("spawnIsland");
            this.world.SpawnIsland.launchInteractiveObjects(
                activeObject
                );
        } else if (activeObject.includes("about_me")) {
            this.experience.localStorage.setLocation("aboutMeIsland");
            this.world.AboutMeIsland.launchInteractiveObjects(
                activeObject
            );
        } else if (activeObject.includes("projet") || activeObject.includes("project")) {
            this.experience.localStorage.setLocation("projetIsland");
            this.world.ProjectsIsland.launchInteractiveObjects(
                activeObject
            );
        } else if (activeObject.includes("contact")) {
            this.experience.localStorage.setLocation("contactIsland");
            this.world.ContactIsland.launchInteractiveObjects(
                activeObject,
                intersect
            );
        } else if (activeObject.includes("hobbies")) {
            this.experience.localStorage.setLocation("hobbiesIsland");
            this.world.HobbiesIsland.launchInteractiveObjects(
                activeObject
            );
        }
    }

    update(deltaTime) {

        this.updateMovement(deltaTime);
        this.updateRaycaster();

        // console.log(this.player.body.position);

        // console.log(this.player.collider.start);

        // console.log(this.player.body.rotation)
    }

    resize() {

    }
}
