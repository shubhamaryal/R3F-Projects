import {
    Html,
    ContactShadows,
    PresentationControls,
    Environment,
    useGLTF,
    OrbitControls,
    Float,
    Text,
} from "@react-three/drei";

export default function Experience() {
    // const computer1 = useGLTF(
    //     "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf",
    // );
    // const computer = useGLTF("./model/scene.gltf");
    const computer = useGLTF("./laptop.glb");
    // console.log(computer);

    return (
        <>
            <Environment preset="city" />

            <color args={["#695b5b"]} attach={"background"} />

            {/* <OrbitControls makeDefault /> */}

            {/* <mesh>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh> */}

            <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{
                    mass: 2,
                    tension: 400,
                }}
                // snap={{
                //     mass: 4,
                //     tension: 400,
                // }}
            >
                <Float rotationIntensity={0.4}>
                    <rectAreaLight
                        width={2.5}
                        height={1.65}
                        intensity={65}
                        // color={"#ff6900"}
                        color={"#846f6f"}
                        rotation={[-0.1, Math.PI, 0]}
                        position={[0, 0.55, -1.55]}
                    />

                    <primitive
                        object={computer.scene}
                        //   scale={[8, 8, 8]}
                        scale={[0.7, 0.7, 0.7]}
                        position-y={-0.7}
                    >
                        <Html
                            transform
                            wrapperClass="htmlScreen"
                            distanceFactor={1.65}
                            position={[0, 1.4, -1.6]}
                            rotation-x={-0.256}
                        >
                            <iframe src="https://shubhamaryal.com.np"></iframe>
                        </Html>
                    </primitive>

                    <Text
                        font="bangers-v20-latin-regular.woff"
                        fontSize={1}
                        position={[2, 0.75, 0.75]}
                        rotation-y={-1.25}
                        maxWidth={2}
                        textAlign="center"
                    >
                        SHUBHAM ARYAL
                    </Text>
                </Float>
            </PresentationControls>

            <ContactShadows
                position-y={-1.4}
                opacity={0.4}
                scale={5}
                blur={2.4}
            />
        </>
    );
}
