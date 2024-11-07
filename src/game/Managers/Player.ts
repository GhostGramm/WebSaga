import { Scene } from "phaser";
import { AnimationName, PlayerType } from "../Constants";
import { AnimationController } from "./AnimationController";

export class Player{
    mainScene: Scene;
    posX: number;
    posY: number;
    initialScale : number;
    body: Phaser.Physics.Arcade.Sprite;
    playerType: string = PlayerType.PLAYER
    animation: AnimationController;

    constructor(scene: Scene, x: number, y: number){
        this.mainScene = scene;
        
        this.posX = x;
        this.posY = y;
        this.initialScale = 3;
        
        this.init();
        this.registerControllers();
    }

    registerControllers() : void {
        this.animation = new AnimationController(AnimationName.IDLE, this, this.mainScene)
    }

    init(): void{
        this.body = this.mainScene.physics.add.sprite(this.posX, this.posY, this.playerType);
        this.alterScale(this.initialScale, this.initialScale);
    }

    update(time: number, delta: number) : void{
        this.animation.play();
    }

    alterScale(x: number, y: number) : void{
        this.body.setScale(x,y);
    }



}