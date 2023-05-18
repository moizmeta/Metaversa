import { useEffect } from "react";
import { useThree} from "@react-three/fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const CamersOrbitController = ()=>{
    const {camera , gl} = useThree();
    
    useEffect(()=>{
    const control = new OrbitControls(camera, gl.domElement);
    return()=>{
      control.dispose();
    }
    },[camera,gl]);
    return null;
    }
    export default CamersOrbitController;