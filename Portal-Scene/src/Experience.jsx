import {
    shaderMaterial,
    Sparkles,
    Center,
    useTexture,
    useGLTF,
    OrbitControls,
} from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
// import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalVertexShader from "./shaders/portal/vertex.js";
import portalFragmentShader from "./shaders/portal/fragment.js";
import { useRef } from "react";
// console.log(portalVertexShader);

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("#ffffff"),
        uColorEnd: new THREE.Color("#000000"),
    },
    portalVertexShader,
    portalFragmentShader,
);

extend({ PortalMaterial });

export default function Experience() {
    // const model = useGLTF("./model/portal.glb");
    // console.log(model);
    const { nodes } = useGLTF("./model/portal.glb");
    // console.log(nodes);
    // console.log(nodes.baked);

    const bakedTexture = useTexture("./model/baked.jpg");
    // console.log(bakedTexture);
    bakedTexture.flipY = false;

    const portalMaterial = useRef();

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta;
    });

    return (
        <>
            <color args={["#201919"]} attach={"background"} />
            <OrbitControls makeDefault />

            {/* <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh> */}

            <Center>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <mesh
                    geometry={nodes.poleLightA.geometry}
                    position={nodes.poleLightA.position}
                >
                    <meshBasicMaterial color={"#ffffe5"} />
                </mesh>
                <mesh
                    geometry={nodes.poleLightB.geometry}
                    position={nodes.poleLightB.position}
                >
                    <meshBasicMaterial color={"#ffffe5"} />
                </mesh>

                <mesh
                    geometry={nodes.portalLight.geometry}
                    position={nodes.portalLight.position}
                    rotation={nodes.portalLight.rotation}
                >
                    {/* <meshBasicMaterial color={"#ffffff"} /> */}

                    {/* <shaderMaterial
                        vertexShader={portalVertexShader}
                        fragmentShader={portalFragmentShader}
                        uniforms={{
                            uTime: { value: 0 },
                            uColorStart: { value: new THREE.Color("#ffffff") },
                            uColorEnd: { value: new THREE.Color("#000000") },
                        }}
                    /> */}
                    <portalMaterial ref={portalMaterial} />
                </mesh>

                <Sparkles
                    size={6}
                    scale={[4, 2, 4]}
                    position-y={1}
                    speed={0.2}
                    count={40}
                />
            </Center>
        </>
    );
}
