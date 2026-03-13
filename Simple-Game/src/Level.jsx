import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

THREE.ColorManagement.legacyMode = false; // 3js and r3f use different type of color encoding and the result's color might be different so we use this to fix that issue

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export const BlockStart = ({ position = [0, 0, 0] }) => {
    return (
        <group position={position}>
            <mesh
                position={[0, -0.1, 0]}
                receiveShadow
                geometry={boxGeometry}
                scale={[4, 0.2, 4]}
                material={floor1Material}
            />
        </group>
    );
};

export const BlockEnd = ({ position = [0, 0, 0] }) => {
    const hamburger = useGLTF("./hamburger.glb");
    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
    });

    return (
        <group position={position}>
            <mesh
                position={[0, 0, 0]}
                receiveShadow
                geometry={boxGeometry}
                scale={[4, 0.2, 4]}
                material={floor1Material}
            />

            <RigidBody
                type="fixed"
                position={[0, 0.25, 0]}
                colliders="hull"
                restitution={0.2}
                friction={0}
            >
                <primitive object={hamburger.scene} scale={0.2} />
            </RigidBody>
        </group>
    );
};

export const BlockSpinner = ({ position = [0, 0, 0] }) => {
    const obstacle = useRef();

    const [speed] = useState(
        () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1),
    );
    // If we want to add more spinning level then all the spinners will have the same speed and same direction for rotation so we used state to get random speed and direction

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const rotation = new THREE.Quaternion();
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
        obstacle.current.setNextKinematicRotation(rotation);
    });

    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />

            <RigidBody
                ref={obstacle}
                type="kinematicPosition"
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    );
};

export const BlockLimbo = ({ position = [0, 0, 0] }) => {
    const obstacle = useRef();

    const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
    // Same as like we did for spinner, it is to have random speed

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const y = Math.sin(time + timeOffset) + 1.15;
        obstacle.current.setNextKinematicTranslation({
            x: position[0],
            y: position[1] + y,
            z: position[2],
        });
        // Adding a new level or changing the position of level won't move the obstacle so we used the props position
    });

    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />

            <RigidBody
                ref={obstacle}
                type="kinematicPosition"
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    );
};

export const BlockAxe = ({ position = [0, 0, 0] }) => {
    const obstacle = useRef();

    const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const x = Math.sin(time + timeOffset) * 1.25;
        obstacle.current.setNextKinematicTranslation({
            x: position[0] + x,
            y: position[1] + 0.8,
            z: position[2],
        });
    });

    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />

            <RigidBody
                ref={obstacle}
                type="kinematicPosition"
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[1.5, 1.5, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    );
};

export const Level = ({
    count = 5,
    types = [BlockSpinner, BlockAxe, BlockLimbo],
}) => {
    const blocks = useMemo(() => {
        const blocks = [];

        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            blocks.push(type);
        }
        // There are 3 types of levels, and the type will have one of them using the random function, and then it will be pushed to the blocks array, and this will be done according to the count so that we will get random levels

        return blocks;
    }, [count, types]);

    return (
        <>
            <BlockStart position={[0, 0, 0]} />

            {blocks.map((Block, index) => (
                <Block key={index} position={[0, 0, -(index + 1) * 4]} />
            ))}

            <BlockEnd position={[0, 0, -(count + 1) * 4]} />
        </>
    );
};
