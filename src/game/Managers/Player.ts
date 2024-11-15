import { Scene } from "phaser";
import { AnimationType, GameEvent, PlayerState } from "../Constants";
import { AnimationController } from "./AnimationController";
import { State, StateMachine } from "./State";
import { OperatorState } from "../states/OperatorState";
import { EventBus } from "../EventBus";
import { VeteranState } from "../states/VeteranState";

export interface IPlayer{
    getScene(): Scene;
}

export class Player implements IPlayer{
    mainScene: Scene;
    initialPosX: number;
    initialPosY: number;
    initialScale : number;
    body: Phaser.Physics.Arcade.Sprite;
    animation: AnimationController;
    stateMachine: StateMachine;


    constructor(scene: Scene, x: number, y: number, callback:(player: Player) => void){
        this.mainScene = scene;
        
        this.initialPosX = x;
        this.initialPosY = y;
        this.initialScale = 2;
        
        this.registerControllers();
        this.init();

        this.setUpStateAnimations();
        callback(this);
    }
    getScene(): Scene {
        return this.mainScene;
    }

    registerControllers() : void {
        this.animation = new AnimationController(AnimationType.IDLE, this, this.mainScene);
        
    }

    init(): void{
        this.stateMachine = new StateMachine();
        this.stateMachine.states.set(PlayerState.OPERATOR, new OperatorState(this));
        this.stateMachine.states.set(PlayerState.VETERAN, new VeteranState(this));

        this.stateMachine.changeState(PlayerState.OPERATOR);
    }

    update(time: number, delta: number) : void{
        this.animation.update(time, delta);
        this.stateMachine.update(time, delta);
    }

    alterScale(x: number, y: number) : void{
        this.body.setScale(x,y);
    }

    getCurrentPositionX() : number{
        return this.body != null ? this.body.x : this.initialPosX;
    }

    getCurrentPositionY() : number{
        return this.body != null ? this.body.y : this.initialPosY;
    }

    setUpStateAnimations() : void{
        this.stateMachine.states.forEach((value: State, key: PlayerState)=>{
            for (let index = 0; index < value.animations.length; index++) {
                this.animation.createAnimation(key, value.animations[index])
            }
        })

        EventBus.emit(GameEvent.OnAnimationsProcessed)
    }

    transform(): void {
        //Destroy the existing Player instance and replace with a Human instance
        const nextState = this.stateMachine.currentStateType == PlayerState.OPERATOR ? PlayerState.VETERAN : PlayerState.OPERATOR;
        this.stateMachine.changeState(nextState);
    }

}