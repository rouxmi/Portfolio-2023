import Experience from "../../../Experience";


export default class Tiles{
    constructor(visual,collider){
        this.visual = visual;
        this.collider = collider;
        if (visual.name.includes("1")){
            this.number = 1;
        } else {
            this.number = 2;
        }
        this.name = this.visual.name.split("_"+this.number)[0]
        this.Experience = new Experience();
        this.time = this.Experience.time;
        this.found = false;
    }

    flipAnimation(){
        this.animate = true;
        this.goUpTimer = this.time.current +1000;
        this.flipTimerUp = this.goUpTimer  +1000;
        this.flipTimerDown = this.flipTimerUp +1000;
        this.goDownTimer = this.flipTimerDown +1000;
        this.halfTurnStep = 0.036;
    }

    returnUp() {
        this.collider.position.y = 16;
        this.visual.position.y = 16;
        this.collider.rotation.x = 0;
        this.visual.rotation.x = 0;
    }

    returnDown() {
        this.collider.position.y = 16.2;
        this.visual.position.y = 16.2;
        this.collider.rotation.x = Math.PI;
        this.visual.rotation.x = Math.PI;
    }
        

    update(){
        if (this.animate){
            if (this.time.current < this.goUpTimer){
                const step = 2 * this.time.delta;
                this.visual.position.y += step;
                this.collider.position.y += step;
            }
            if (this.time.current > this.goUpTimer && this.time.current < this.flipTimerUp){
                const step = 2 * this.time.delta;
                const rotationStep = 1.567 * this.time.delta;
                this.visual.rotation.x += rotationStep
                this.collider.rotation.x += rotationStep
                this.visual.position.y += step;
                this.collider.position.y += step;
            }
            if (this.time.current > this.flipTimerUp && this.time.current < this.flipTimerDown){
                const step = 1.8 * this.time.delta;
                const rotationStep = 1.567 * this.time.delta;
                this.visual.rotation.x += rotationStep
                this.collider.rotation.x += rotationStep
                this.visual.position.y -= step;
                this.collider.position.y -= step;
            }
            if (this.time.current > this.flipTimerDown && this.time.current < this.goDownTimer){
                const step = 1.8 * this.time.delta;
                this.visual.position.y -= step;
                this.collider.position.y -= step;
            }
            if (this.time.current > this.goDownTimer){
                this.animate = false;
                this.Experience.world.ProjectsIsland.randomizeTilesPosition();
                this.collider.position.y = 16.2;
                this.visual.position.y = 16.2;
                this.collider.rotation.x = Math.PI;
                this.visual.rotation.x = Math.PI;
            }
        }
    }
}