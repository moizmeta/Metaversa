
import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type treeType ={
    position :{x: number; z: number};
    box: number;
}

type props = {
    boundry:number;
    count: number;
}

const Tree: React.FC<props>= ({boundry,count}) => {
    const model = useLoader(GLTFLoader, "./model/maple_tree.glb");
    const [tree, setTree] = useState<treeType[]>([])

    model.scene.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
        }
    });
    
    const updatePosition = (treeArray: treeType[], boundry: number)=>{
        treeArray.forEach((tree,index)=>{
            tree.position.x = Math.random()* 100;
            tree.position.z = Math.random()* 100;
        });
        setTree(treeArray);
    }

    useEffect(()=>{
        const tempTrees: treeType[] = [];
        for (let i=0; i< count;i++){
            tempTrees.push({position:{x:0,z:0},box:1});
        }
        console.log(tempTrees);
        updatePosition(tempTrees,boundry)
    },[boundry,count]);

    return (
        <group rotation={[0,4,0]}>
          {  tree.map((tree,index)=>{
            return(
                <object3D scale={[0.1,0.1,0.1]} key={index} position={[tree.position.x,0,tree.position.z]}>

                <primitive object={model.scene.clone()} />

            </object3D>
            )
          })
           
           }
        </group>
    );
}

export default Tree;

