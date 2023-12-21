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

    const status2 = useScript(
        `https://cdn.3dverse.com/legacy/sdk/stable/SDK3DVerse_ThreeJS_Ext.js`,
        {
            removeOnUnmount: false,
        }
    );


    // Initialization
    // async function InitApp() {
    //     await SDK3DVerse.joinOrStartSession({
    //         userToken: "public_xhZv-SrH0o7c9Xhz",
    //         sceneUUID: "17fc8919-6b02-4835-a21c-8f67bafb94ca",
    //         canvas: document.getElementById("display-canvas"),
    //         viewportProperties: {
    //             defaultControllerType: SDK3DVerse.controller_type.orbit,
    //         },
    //         connectToEditor: true,
    //     });

    //     SDK3DVerse.notifier.on(
    //         "onEntitySelectionChanged",
    //         (selectedEntities, unselectedEntities) => {
    //             console.log("Selected", selectedEntities);
    //             console.log("Unselected", unselectedEntities);
    //         }
    //     );

    //     document
    //         .getElementById("display-canvas")
    //         .addEventListener("click", selectEntity);
    // }
    // window.addEventListener("load", InitApp);

    const initApp = useCallback(async () => {
        // Setup each slider using the reusable function

        await SDK3DVerse.joinOrStartSession({
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
    if (status === 'ready' && status2 === 'ready') {
      initApp();
    }
  }, [status, status2]);

    return (
        <>
            {/* <!-- CANVAS --> */}
            <canvas
                id='display-canvas'
                oncontextmenu="event.preventDefault()"
                style={{
                    width: '100%',
                    verticalAlign: 'middle',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                }}
                tabIndex="1">
            </canvas>
        </>
    );
};

