import { Scene } from "phaser";
import { Player } from "./Player";
import { AnimationType, GameEvent, PlayerState } from "../Constants";
import { EventBus } from "../EventBus";


export class AnimationController{

    player: Player;
    aName: string;
    animss: Phaser.Animations.AnimationManager;
    currentPlaying: string;
    testStart: Boolean = false;

    constructor(animationName: string, player: Player, scene: Scene){
        this.aName = animationName;
        this.player = player;
        this.animss = scene.anims;

        EventBus.on(GameEvent.OnAnimationsProcessed, () => this.testStart = true);
    }

    update(time: number, delta: number): void{
        this.play();
    }

    setCurrentPlaying(playerState: PlayerState, animationType: AnimationType): void{

        let _key: string = playerState + animationType;

        this.currentPlaying = (playerState == null) ? AnimationType.IDLE : _key;
    }

    play() : void{
        if(this.currentPlaying == null) return;
        
        this.player.body.play(this.currentPlaying, true);
    }


    createAnimation(playerType: string, type: string) : void{
        
        let _key: string = playerType + type;

        if(this.animss.get(_key) != null)   return;

        this.animss.create({
            key: _key,
            frames: this.animss.generateFrameNumbers(_key, {
                // start: 0, end: 3
            }),
            frameRate: 10,
            repeat: -1
        })

        console.log("created animation for " + _key);
    }
    
}