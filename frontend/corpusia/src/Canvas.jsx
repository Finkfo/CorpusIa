import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';

export const Canvas = () => {
    const status = useScript(
        `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
        {
            removeOnUnmount: false,
        }
    );

    const initApp = useCallback(async () => {
        await SDK3DVerse.joinOrStartSession({
            userToken: 'public_DGfD-aVaZJnRtTNO',
            sceneUUID: '26711a8d-543d-4b1e-a618-ada41668bf78',
            canvas: document.getElementById('display-canvas'),
            viewportProperties: {
                defaultControllerType: SDK3DVerse.controller_type.orbit,
            },
        });
    }, []);

    useEffect(() => {
        if (status === 'ready') {
            initApp();
        }
    }, [status]);

    return (
        <div>
            <div class="Buttons">
                <h4>Metallic : </h4>
                <span>0</span><input type="range" min="0" max="1" value="0.5" class="slider" id="metallicRange" step="0.01" /> <span>1</span>
                <p>Your input : <span id="metallicOutput"></span></p>

                <h4>Roughness : </h4>
                <span>0</span><input type="range" min="0" max="1" value="0.5" class="slider" id="roughnessRange" step="0.1" /> <span>1</span>
                <p>Your input : <span id="roughnessOutput"></span></p>

                <h4>Ambient Occlusion : </h4>
                <span>0</span><input type="range" min="0" max="1" value="0.5" class="slider" id="ambientOcclusionRange" step="0.1" /> <span>1</span>
                <p>Your input : <span id="ambientOcclusionOutput"></span></p>
            </div>

            <button onclick="toggleRotate()">Rotate</button>
            <button onclick="colorPicking(colors.purple)">"Purple" button</button>
            <button onclick="colorPicking(colors.orange)">"Orange" Button</button>


            <div class="Set Sun">
                <h4>Sun X Orientation :</h4>
                <span>0</span><input type="range" min="0" max="360" value="240" class="slider" id="sunXRange" step="5" /> <span>360</span>
                <p>Your input : <span id="sunXOutput"></span></p>
                <h4>Sun Y Orientation :</h4>
                <span>0</span><input type="range" min="0" max="360" value="0" class="slider" id="sunYRange" step="5" /> <span>360</span>
                <p>Your input : <span id="sunYOutput"></span></p>
                <h4>Sun Z Orientation :</h4>
                <span>0</span><input type="range" min="0" max="360" value="0" class="slider" id="sunZRange" step="5" /> <span>360</span>
                <p>Your input : <span id="sunZOutput"></span></p>
                <button onclick="getSun()">Get Sun</button>
            </div>
            <div class="canvas-container">
                {/* <!-- CANVAS --> */}
                <canvas id="display-canvas" oncontextmenu="event.preventDefault()"></canvas>
            </div>
            tabIndex="1"
        </div>
    );
};