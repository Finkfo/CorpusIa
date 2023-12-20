import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';

const {
    setupSlider,
    setSunOrientation,
    selectEntity
} = window;

let SDK3DVerse = null;

export const Canvas = () => {

    const status = useScript(
        `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
        {
            removeOnUnmount: false,
        }
    );

    const initApp = useCallback(async () => {
        // Setup each slider using the reusable function
        window.metallicSlider = setupSlider("metallicRange", "metallicOutput");
        window.roughnessSlider = setupSlider("roughnessRange", "roughnessOutput");
        window.ambientOcclusionSlider = setupSlider("ambientOcclusionRange", "ambientOcclusionOutput");

        window.sunXSlider = setupSlider("sunXRange", "sunXOutput", setSunOrientation);
        window.sunYSlider = setupSlider("sunYRange", "sunYOutput", setSunOrientation);
        window.sunZSlider = setupSlider("sunZRange", "sunZOutput", setSunOrientation);

        await SDK3DVerse.joinOrStartSession({
            //userToken: 'public_DGfD-aVaZJnRtTNO',
            //sceneUUID: '26711a8d-543d-4b1e-a618-ada41668bf78',
            userToken: "public_xhZv-SrH0o7c9Xhz",
            sceneUUID: "17fc8919-6b02-4835-a21c-8f67bafb94ca",
            canvas: document.getElementById('display-canvas'),
            viewportProperties: {
                defaultControllerType: SDK3DVerse.controller_type.orbit,
            },
        });

        SDK3DVerse.notifier.on('onEntitySelectionChanged', (selectedEntities, unselectedEntities) => {
            console.log('Selected', selectedEntities);
            console.log('Unselected', unselectedEntities);
        });

        document.getElementById("display-canvas").addEventListener('click', selectEntity);
    }, []);

    useEffect(() => {
        if (status === 'ready') {
            SDK3DVerse = window.SDK3DVerse
            initApp();
        }
    }, [status]);

    return (
        <>
            {/* <!-- CANVAS --> */}
            <canvas
                id='display-canvas'
                style={{
                    width: '100%',
                    verticalAlign: 'middle',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1
                }}
                tabIndex="1">
            </canvas>
        </>
    );
};