var rotationOn = false;
var isDoubleSided = false

window.onload = function () {
    console.log("page loaded");
}

// Reusable function for setting up sliders
function setupSlider(sliderId, outputId, onChangeCallback) {
    var slider = document.getElementById(sliderId);
    var output = document.getElementById(outputId);
    var value;

    // Initialize value and set initial HTML
    value = parseFloat(slider.value);
    output.innerHTML = value;

    // Update the displayed value on slider input
    slider.oninput = function () {
        value = parseFloat(this.value);
        output.innerHTML = value;
        console.log(`${outputId} Value: `, value);

        if (onChangeCallback) {
            onChangeCallback(sliderId, value);
        }
    };
    return {
        getValue: function () {
            return value;
        },
    };
}

async function setMaterialProperty(propertyName, propertyValue) {
    const entity = (await SDK3DVerse.engineAPI.findEntitiesByEUID("62d404e7-2114-4eab-81dd-778cf884e9d4"))[0]
    entity.setComponent("material", {
        dataJSON: {
            ...entity.getComponent("material").dataJSON,
            [propertyName]: propertyValue,
        },
    });
}

// Setup each slider using the reusable function
var metallicSlider = setupSlider("metallic", "metallicOutput", setMaterialProperty);
var roughnessSlider = setupSlider("roughness", "roughnessOutput", setMaterialProperty);
var ambientOcclusionSlider = setupSlider("ambientOcclusion", "ambientOcclusionOutput", setMaterialProperty);

var EmissionIntensitySlider = setupSlider(
    "emission",
    "EmissionIntensityOutput",
    setMaterialProperty
);

var ClearCoatStrengthSlider = setupSlider(
    "clearCoatStrength",
    "ClearCoatStrengthOutput",
    setMaterialProperty
);


var sunXSlider = setupSlider("sunXRange", "sunXOutput", setSunOrientation);
var sunYSlider = setupSlider("sunYRange", "sunYOutput", setSunOrientation);
var sunZSlider = setupSlider("sunZRange", "sunZOutput", setSunOrientation);

async function toggleRotate() {
    rotationOn = !rotationOn; // Bascule l'état de la rotation

    if (rotationOn) {
        // Démarrer l'animation de rotation
        SDK3DVerse.engineAPI.playAnimationSequence(
            "19895069-14e2-4bb5-bf23-d958ee630b1d" // Remplacez par l'UUID de votre séquence d'animation
        );
        btnToggleRotateLeft.innerText = "Stop Rotation";
    } else {
        // Arrêter l'animation de rotation
        SDK3DVerse.engineAPI.pauseAnimationSequence(
            "19895069-14e2-4bb5-bf23-d958ee630b1d" // Remplacez par l'UUID de votre séquence d'animation
        );
        btnToggleRotateLeft.innerText = "Start Rotation";
    }
}

// Entity selection
async function selectEntity(event) {
    const keepOldSelection = event.ctrlKey;
    const { entity } = await SDK3DVerse.engineAPI.castScreenSpaceRay(
        event.clientX,
        event.clientY,
        true,
        keepOldSelection
    );

    if (entity) {
        console.log("Selected entity", entity.getName());
        desc(entity); // Appel de la fonction desc avec l'entité sélectionnée en paramètre, a retirer pour du débugage uniquement le temps de trouver une solution 
        console.log(entity.getComponent("material"));
    } else {
        console.log("No entity selected");
    }
}

async function ARM(entity) {
    entity.setComponent("material", {
        dataJSON: {
            metallic: metallicSlider.getValue(),
            roughness: roughnessSlider.getValue(),
            ambientOcclusion: ambientOcclusionSlider.getValue(),
        },
    });
    console.log(entity.getComponent("material"));
}

async function DoubleSided() {
    if (isDoubleSided === true) {
        isDoubleSided = false;
    } else if (isDoubleSided === false) {
        isDoubleSided = true;
    }
}

async function desc(entity) {
    entity.setComponent("material", {
        dataJSON: {
            ...entity.getComponent("material").dataJSON,
            albedo: colorPicked,
            metallic: metallicSlider.getValue(),
            roughness: roughnessSlider.getValue(),
            ambientOcclusion: ambientOcclusionSlider.getValue(),
            emissionIntensity: EmissionIntensitySlider.getValue(),
            clearCoatStrength: ClearCoatStrengthSlider.getValue(),
        },
        isDoubleSided: isDoubleSided,
    });
}

async function updateCamera(property) {

    const [viewport] = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
    const camera = viewport.getCamera();


    if (property === "gradient") {
        const cameraComponent = camera.getComponent("camera");
        camera.setComponent("camera", {
            dataJSON: {
                ...camera.getComponent("camera").dataJSON,
                atmosphere: false,
            },
        });
    }

    if (property === "atmosphere") {
        const cameraComponent = camera.getComponent("camera");
        camera.setComponent("camera", {
            dataJSON: {
                ...camera.getComponent("camera").dataJSON,
                gradient: false,
            },
        });
    }

    if (camera.isAttached("camera")) {
        const cameraComponent = camera.getComponent("camera");
        cameraComponent.dataJSON[property] = !cameraComponent.dataJSON[property];
        camera.setComponent("camera", {
            dataJSON: cameraComponent.dataJSON,
        });
        console.log(camera.getComponent("camera"));
    }
}

async function getSun() {
    const sun = (
        await SDK3DVerse.engineAPI.findEntitiesByEUID(
            "7fbb3dc8-6d9d-46e3-92ff-2cd64efb26c1"
        )
    )[0];
    const { eulerOrientation } = sun.getGlobalTransform();
    console.log(eulerOrientation);
}

async function setSunOrientation() {
    const sun = (await SDK3DVerse.engineAPI.findEntitiesByEUID("7fbb3dc8-6d9d-46e3-92ff-2cd64efb26c1"))[0];
    sun.setGlobalTransform({
        eulerOrientation:
            [
                sunXSlider.getValue(),
                sunYSlider.getValue(),
                sunZSlider.getValue(),
            ]
    });
}

async function setSunVisibility(isVisible) {
    const sun = (await SDK3DVerse.engineAPI.findEntitiesByEUID("7fbb3dc8-6d9d-46e3-92ff-2cd64efb26c1"))[0];
    sun.setVisibility(isVisible);
}





// var rotationOn = false;
// const colors = { red: [255 / 255, 0, 0], green: [0, 255 / 255, 0], blue: [0, 0, 255 / 255], orange: [255 / 255, 165 / 255, 0], purple: [255 / 255, 0, 255 / 255] };

// // Setup each slider using the reusable function
// var metallicSlider;
// var roughnessSlider;
// var ambientOcclusionSlider

// var sunXSlider;
// var sunYSlider;
// var sunZSlider;

// var colorPicked;

// // Reusable function for setting up sliders
// function setupSlider(sliderId, outputId, onChangeCallback) {
//     console.log(sliderId);

//     var slider = document.getElementById(sliderId);
//     var output = document.getElementById(outputId);
//     var value;

//     // Initialize value and set initial HTML
//     value = parseFloat(slider.value);
//     output.innerHTML = value;

//     // Update the displayed value on slider input
//     slider.oninput = function () {
//         value = parseFloat(this.value);
//         output.innerHTML = value;
//         console.log(`${outputId} Value: `, value);

//         // Call the callback if it exists
//         if (onChangeCallback) {
//             onChangeCallback(value);
//         }
//     }
//     return {
//         getValue: function () {
//             return value;
//         }
//     };
// }

// async function toggleRotate() {
//     rotationOn = !rotationOn; // Bascule l'état de la rotation

//     if (rotationOn) {
//         // Démarrer l'animation de rotation
//         SDK3DVerse.engineAPI.playAnimationSequence(
//             "19895069-14e2-4bb5-bf23-d958ee630b1d" // Remplacez par l'UUID de votre séquence d'animation
//         );
//         btnToggleRotateLeft.innerText = "Stop Rotation";
//     } else {
//         // Arrêter l'animation de rotation
//         SDK3DVerse.engineAPI.pauseAnimationSequence(
//             "19895069-14e2-4bb5-bf23-d958ee630b1d" // Remplacez par l'UUID de votre séquence d'animation
//         );
//         btnToggleRotateLeft.innerText = "Start Rotation";
//     }
// }

// // Entity selection
// async function selectEntity(event) {
//     const keepOldSelection = event.ctrlKey;
//     const { entity } = await SDK3DVerse.engineAPI.castScreenSpaceRay(event.clientX, event.clientY, true, keepOldSelection);

//     if (entity) {
//         console.log('Selected entity', entity.getName());
//         desc(entity);
//     } else {
//         console.log('No entity selected');
//     }
// }

// // Function to modify color called in the color buttons
// async function colorPicking(color) {
//     return colorPicked = color;
//     console.log(colorPicked);
// }

// async function ARM(entity) {
//     entity.setComponent('material', {
//         dataJSON: {
//             metallic: metallicSlider.getValue(),
//             roughness: roughnessSlider.getValue(),
//             ambientOcclusion: ambientOcclusionSlider.getValue(),
//         }
//     });
//     console.log(entity.getComponent('material'));
// }

// async function desc(entity) {
//     entity.setComponent('material', {
//         dataJSON: {
//             albedo: colorPicked,
//             metallic: metallicSlider.getValue(),
//             roughness: roughnessSlider.getValue(),
//             ambientOcclusion: ambientOcclusionSlider.getValue(),
//         }
//     })
// }

// async function getSun() {
//     const sun = (await SDK3DVerse.engineAPI.findEntitiesByEUID("7fbb3dc8-6d9d-46e3-92ff-2cd64efb26c1"))[0];
//     const { eulerOrientation } = sun.getGlobalTransform();
//     console.log(eulerOrientation);
// }

// async function setSunOrientation() {
//     const sun = (await SDK3DVerse.engineAPI.findEntitiesByEUID("7fbb3dc8-6d9d-46e3-92ff-2cd64efb26c1"))[0];
//     sun.setGlobalTransform({
//         eulerOrientation:
//             [
//                 sunXSlider.getValue(),
//                 sunYSlider.getValue(),
//                 sunZSlider.getValue(),
//             ]
//     });
// }