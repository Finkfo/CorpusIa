var rotationOn = false;
var isDoubleSided = false;
let sceneUUIDValue = "17fc8919-6b02-4835-a21c-8f67bafb94ca";
const cubeOption = document.querySelector(".cubeOption");

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
async function setNewMaterialRefWatch(materialRef){
  const BraceletPartOne = await SDK3DVerse.engineAPI.findEntitiesByEUID('11cb28ea-5b91-419d-83a8-305010cc6b3f');
  const BraceletPartTwo = await SDK3DVerse.engineAPI.findEntitiesByEUID('6061dfd6-b97b-4aec-92eb-cd2aa9ea428e');
  await BraceletPartOne[0].setComponent('material_ref', {value : materialRef});
  await BraceletPartTwo[0].setComponent('material_ref', {value : materialRef});
}
async function setNewMaterialRefDressAll(materialRef){
  const DressLeftPart = await SDK3DVerse.engineAPI.findEntitiesByEUID('5c4fa5f1-f6ba-441a-a25b-b6fabe99ca38');
  const DressRightPart = await SDK3DVerse.engineAPI.findEntitiesByEUID('c61acbd7-25f8-450f-a866-8f6fca139242');
  const DressLeftBackPart = await SDK3DVerse.engineAPI.findEntitiesByEUID('e1a4e3f4-29ae-4fc3-8fe8-facdab939d3d');
  const DressRightBackPart = await SDK3DVerse.engineAPI.findEntitiesByEUID('6f5c1a72-12f3-4824-a392-a1aba84740eb');
  await DressLeftPart[0].setComponent('material_ref', {value : materialRef});
  await DressRightPart[0].setComponent('material_ref', {value : materialRef});
  await DressLeftBackPart[0].setComponent('material_ref', {value : materialRef});
  await DressRightBackPart[0].setComponent('material_ref', {value : materialRef});
}
async function setNewMaterialRefDressLeftPart(materialRef){
  const DressLeftPart = await SDK3DVerse.engineAPI.findEntitiesByEUID('5c4fa5f1-f6ba-441a-a25b-b6fabe99ca38');
  DressLeftPart[0].setComponent('material_ref', {value : materialRef});
}
async function setNewMaterialRefDressRightPart(materialRef){
  const DressRightPart = await SDK3DVerse.engineAPI.findEntitiesByEUID('c61acbd7-25f8-450f-a866-8f6fca139242');
  DressRightPart[0].setComponent('material_ref', {value : materialRef});
}
async function setNewMaterialRefDressLeftBackPart(materimaterialRefl_ref){
  const DressLeftBackPart = await SDK3DVerse.engineAPI.findEntitiesByEUID('e1a4e3f4-29ae-4fc3-8fe8-facdab939d3d');
  DressLeftBackPart[0].setComponent('material_ref', {value : materialRef});
}
async function setNewMaterialRefDressRightBackPart(materialRef){
  const DressRightBackPart = await SDK3DVerse.engineAPI.findEntitiesByEUID('6f5c1a72-12f3-4824-a392-a1aba84740eb');
  DressRightBackPart[0].setComponent('material_ref', {value : materialRef});
}
// async function setMaterialProperty(propertyName, propertyValue) {
//   const entity = (await SDK3DVerse.engineAPI.findEntitiesByEUID("62d404e7-2114-4eab-81dd-778cf884e9d4"))[0]
//   entity.setComponent("material", {
//     dataJSON: {
//       ...entity.getComponent("material").dataJSON,
//       [propertyName]: propertyValue,
//     },
//   });
// }

// Setup each slider using the reusable function
// var metallicSlider = setupSlider("metallic", "metallicOutput", setMaterialProperty);
// var roughnessSlider = setupSlider("roughness", "roughnessOutput",setMaterialProperty);
// var ambientOcclusionSlider = setupSlider("ambientOcclusion","ambientOcclusionOutput",setMaterialProperty);

// var EmissionIntensitySlider = setupSlider(
//   "emission",
//   "EmissionIntensityOutput",
//   setMaterialProperty
// );

// var ClearCoatStrengthSlider = setupSlider(
//   "clearCoatStrength",
//   "ClearCoatStrengthOutput",
//   setMaterialProperty
// );


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
  } else {
    // Arrêter l'animation de rotation
    SDK3DVerse.engineAPI.pauseAnimationSequence(
      "19895069-14e2-4bb5-bf23-d958ee630b1d" // Remplacez par l'UUID de votre séquence d'animation
    );
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
  if (isDoubleSided == true) {
    isDoubleSided = false;
  } else if (isDoubleSided == false) {
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


    if( property === "gradient"){
        camera.setComponent("camera", {
            dataJSON: {
              ...camera.getComponent("camera").dataJSON,
              atmosphere: false,
              grid: false,
            },
          });
    }

    if(property === "atmosphere") {
      camera.setComponent("camera", {
        dataJSON:{
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
      "1d54fc15-4c43-4c2b-bca1-b2d77f86ad3e"
    )
  )[0];
  const { eulerOrientation } = sun.getGlobalTransform();
  console.log(eulerOrientation);
}

async function setSunOrientation() {
  const sun = (await SDK3DVerse.engineAPI.findEntitiesByEUID("1d54fc15-4c43-4c2b-bca1-b2d77f86ad3e"))[0];
  sun.setGlobalTransform({
      eulerOrientation : 
      [
          sunXSlider.getValue(),
          sunYSlider.getValue(),
          sunZSlider.getValue(),
      ]
  });
}

async function setSunVisibility(isVisible) {
  const sun = (await SDK3DVerse.engineAPI.findEntitiesByEUID("1d54fc15-4c43-4c2b-bca1-b2d77f86ad3e"))[0];
  sun.setVisibility(isVisible);
}

async function changeMainScene(){
  const watchScene = await SDK3DVerse.engineAPI.findEntitiesByEUID('d0e79933-4234-4286-965e-5722d03c7803');
  const dressScene = await SDK3DVerse.engineAPI.findEntitiesByEUID('dcab5bde-8bf9-4202-b57a-05fdd9fed06c');
  const cubeScenee = await SDK3DVerse.engineAPI.findEntitiesByEUID('14d08a2c-59d5-408f-a254-efbdaee2b10e');
  let id = document.querySelector("#choixVariable").options[document.querySelector("#choixVariable").selectedIndex].id;
  if (id == "cube"){
    document.querySelector("#cubeOption").style.visibility = "visible";
    document.querySelector("#dressOption").style.visibility = "hidden";
    document.querySelector("#watchOption").style.visibility = "hidden";
    watchScene[0].setVisibility(false);
    dressScene[0].setVisibility(false);
    cubeScenee[0].setVisibility(true);
    
  }
  else if (id == "watch"){
    document.querySelector("#watchOption").style.visibility = "visible";
    document.querySelector("#dressOption").style.visibility = "hidden";
    document.querySelector("#cubeOption").style.visibility = "hidden";
    watchScene[0].setVisibility(true);
    dressScene[0].setVisibility(false);
    cubeScenee[0].setVisibility(false);
  }
  else if(id == "dress"){
    document.querySelector("#dressOption").style.visibility = "visible";
    document.querySelector("#watchOption").style.visibility = "hidden";
    document.querySelector("#cubeOption").style.visibility = "hidden";
    watchScene[0].setVisibility(false);
    dressScene[0].setVisibility(true);
    cubeScenee[0].setVisibility(false);
  }
}

// Initialization
async function InitApp() {
  await SDK3DVerse.joinOrStartSession({
    userToken: "public_xhZv-SrH0o7c9Xhz",
    sceneUUID: sceneUUIDValue,
    canvas: document.getElementById("display-canvas"),
    viewportProperties: {
      defaultControllerType: SDK3DVerse.controller_type.orbit,
    },
    connectToEditor: true,
  });

  SDK3DVerse.notifier.on(
    "onEntitySelectionChanged",
    (selectedEntities, unselectedEntities) => {
      console.log("Selected", selectedEntities);
      console.log("Unselected", unselectedEntities);
    }
  );

  document
    .getElementById("display-canvas")
    .addEventListener("click", selectEntity);
}

window.addEventListener("load", InitApp);