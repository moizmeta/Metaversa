import type { NextPage } from "next";
import { Canvas, useLoader } from "@react-three/fiber";
import Light from "../src/components/Light";
import Ground from "../src/components/Ground";
import Tree from "../src/components/Tree";


import {  OrbitControls } from "@react-three/drei";
import Player from "../src/components/Player";






const Home: NextPage = () => {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows >

        <axesHelper args={[2]} />
        <gridHelper args={[10, 10]} />

        <OrbitControls />
        <Tree boundry={10} count={5} />
        <Light />
        <Player/>
         <Ground />
      </Canvas>
    </div>
  );
};

export default Home;
