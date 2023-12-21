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