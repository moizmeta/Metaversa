import { useEffect, useRef } from "react";
import { useInput } from "../hooks/useInput";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";



let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0,1,0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTraget = new THREE.Vector3();


const directionOffset = ({forward , backward , left, right })=>{
    var directionOffset =0;

    if(forward){
        if(left){
            directionOffset = Math.PI / 4;
        } else if (right){
            directionOffset = -Math.PI / 4;
        }
    }else if (backward){
        if(left){
            directionOffset = Math.PI /4 + Math.PI /2;
        }else if (right){
            directionOffset = Math.PI /4 - Math.PI /2;
        }else{
            directionOffset = Math.PI;
        }
    }else if (left){
        directionOffset = Math.PI / 2;
    }else if(right){
        directionOffset = -Math.PI / 2;
    }
    return directionOffset;
}

const Player = () => {
    const {forward,backward,left,right,jump,shift}= useInput();
    const model: any = useGLTF("./model/anim04.glb");
    const {actions}= useAnimations(model.animations, model.scene);
  
    model.scene.scale.set(0.5,0.5,0.5);
  
    model.scene.traverse((object:any) => {
      if (object.isMesh) {
          object.castShadow = true;
      }
  });
  
    console.log(model);
    const currentAction = useRef("");
    const controlsRef = useRef<typeof OrbitControls>();
    const camera = useThree((state)=> state.camera);

    const updateCameraTarget = (moveX: number, moveZ:number)=>{
        //move Camera
        camera.position.x += moveX;
        camera.position.z += moveZ;

        //update camera target 
        cameraTraget.x = model.scene.position.x;
        cameraTraget.y = model.scene.position.y+2;
        cameraTraget.z = model.scene.position.z;

        if(controlsRef.current) controlsRef.current.target = cameraTraget;
    };
  
  
    useEffect(() => {
      let action ="";
  
      if(forward || backward || left || right ){
        action = "walk";
        if(shift){
          action ="run";
        }
      }else if(jump){
        action ="jump";
      }else{
        action="idle";
      }
      if(currentAction.current != action){
        const nextActionToPlay = actions[action];
        const current = actions[currentAction.current];
        current?.fadeOut(0.1);
        nextActionToPlay?.reset().fadeIn(0.1).play();
        currentAction.current = action;
      }
      // actions?.walk?.play();
      
    }, [forward,backward,left,right,jump,shift]);
      useFrame((state,delta)=>{
        if(
            currentAction.current == "run"|| currentAction.current=="walk"
        ){
            //calculation of camera direction
            let angleYCameraDirection = Math.atan2(
                camera.position.x - model.scene.position.x,
                camera.position.z - model.scene.position.z
            );

            //diagonal movement angel offset
            let newDirectionOffset = directionOffset({
                forward,
                backward,
                left,
                right,
            });
                //rotate model

                rotateQuarternion.setFromAxisAngle(
                    rotateAngle,
                    angleYCameraDirection + newDirectionOffset
                );
                model.scene.quaternion.rotateTowards(rotateQuarternion,0.5);

                //calculate direction
                camera.getWorldDirection(walkDirection);
                walkDirection.y = 0;
                walkDirection.normalize();
                walkDirection.applyAxisAngle(rotateAngle,newDirectionOffset);

                // run/walk velocity
                const velocity = currentAction.current == "run" ? 5 : 1;
                // move model & camera 
                const moveX = walkDirection.x * velocity * delta;
                const moveZ = walkDirection.z * velocity * delta;
                model.scene.position.x += moveX;
                model.scene.position.z += moveZ;
                updateCameraTarget(moveX,moveZ);
        }
      });
  
    return (
        <>
        <OrbitControls ref={controlsRef}/>
        <primitive object={model.scene}/>
        
        </>
    );
  };
  
  export default Player;