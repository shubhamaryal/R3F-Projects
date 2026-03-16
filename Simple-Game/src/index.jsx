import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
    <KeyboardControls
        map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "rightward", keys: ["ArrowRight", "KeyD"] },
            { name: "jump", keys: ["Space"] },
        ]}
    >
        {/* 
            If we only have "W" then it means the key W but if we use "KeyW" then if will use the position of W of QWERTY keyboard ; in french keyboard or other type of keybords the position of W is in different place but using "KeyW", they can also play from the same position of WASD regardless of which key is there.
        */}

        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [2.5, 4, 6],
            }}
        >
            <Experience />
        </Canvas>

        <Interface />
    </KeyboardControls>,
);
