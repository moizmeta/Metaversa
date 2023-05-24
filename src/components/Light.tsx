import { useRef } from "react";
import {useHelper} from"@react-three/drei";
import {DirectionalLightHelper} from "three";

const Light: React.FC = () => {
    const lightRef:any = useRef<THREE.DirectionalLight>();

    useHelper(lightRef,DirectionalLightHelper,5,"red");

    return (
        <>
         <ambientLight intensity={0.3} />
            <directionalLight ref={lightRef} position={[0, 10, 10]} castShadow />
            
            <hemisphereLight args={["#c257ff","#fff23b",100]}/>
        </>

    )
}

export default Light;

