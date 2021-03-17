import React, {useRef, useEffect} from 'react'
import * as THREE from "three";
import {useLoader } from 'react-three-fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import grass from '../../textures/grass.jpg'
import { Suspense } from 'react';

const Grid = (props) => {

const grids = [];
const face = [1,0,0];

const Square = (props) => {
    const Grass = useLoader(TextureLoader, grass);
 
const ref = useRef();
useEffect(() => void ref.current.lookAt(new THREE.Vector3(0,1,0)), [ref.current])


    return(<mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={props.position} ref={ref}>
        <planeBufferGeometry attach="geometry" args={[5,5]} />
        <meshBasicMaterial map={Grass} attach="material" />
    </mesh>)
}


for(var i = 0; i<props.width; i++) {
    for (var j = 0; j<props.length; j++) {
        grids.push(<Square position={[i,-0.5,j]}/>)
    }
}




    return (
        <>
          {grids}  
        </>
    )
}

export default Grid
