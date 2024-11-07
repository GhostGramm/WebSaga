import { Scene } from "phaser";
import { Player } from "./Player";


export class AnimationController{

    player: Player;
    aName: string;
    animss: Phaser.Animations.AnimationManager;

    constructor(animationName: string, player: Player, scene: Scene){
        this.aName = animationName;
        this.player = player;
        this.animss = scene.anims;

        this.createAnimation(player.playerType);
    }

    play(): void{
        this.player.body.play(this.aName, true)
    }

    createAnimation(playerType: string){
        
        console.log(playerType)

        this.animss.create({
            key: 'idle',
            frames: this.animss.generateFrameNumbers(playerType, {
                // start: 0, end: 3
            }),
            frameRate: 10,
            repeat: -1
        })
    }
    
}