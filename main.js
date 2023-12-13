window.addEventListener("load", initApp);

// // The scene that is spawned when clicking "Link Scene"
let linkedSceneEntity = null;
let lightEntity = null;
let selectedEntity = null;
let btnToggleRotateLeft;
let btnToggleLight;
let rotationOn = null;

async function initApp() {
  // btnToggleScene = document.getElementById("btn-toggle-scene");
  btnToggleLight = document.getElementById("btn-toggle-light");
  btnToggleRotateLeft = document.getElementById("btn-toggle-rotateLeft");
  // btnToggleScene.innerText = "Spawn Scene";
  btnToggleLight.innerText = "Spawn Light";
  btnToggleRotateLeft.innerText = "Start Rotation";

  const isSessionCreator = await SDK3DVerse.joinOrStartSession({
    userToken: "public_xhZv-SrH0o7c9Xhz",
    sceneUUID: "17fc8919-6b02-4835-a21c-8f67bafb94ca",
    canvas: document.getElementById("display-canvas"),
    viewportProperties: {
      defaultControllerType: SDK3DVerse.controller_type.orbit,
    },
  });

  // Set camera settings to make the light entities more visible
  const cameraEntity = SDK3DVerse.engineAPI.cameraAPI
    .getActiveViewports()[0]
    .getCamera();
  cameraEntity.setComponent("camera", {
    dataJSON: {
      // Disable reflection
      reflection: false,
      debugLines: true,
      skybox: false,
      atmosphere: false,
      gradient: true,
    },
  });

  // Set bottom gradient to black (top is white)
  SDK3DVerse.engineAPI.propagateSceneSettings({
    environment: { ambientColorBottom: [0, 0, 0] },
  });

  // Spawn a light otherwise the cube is dark due to its 100% metalness.
  // But do it a single time for the whole session life time.

  //Gestionnaire d'évènement
  SDK3DVerse.notifier.on(
    "OnEntitySelectionChanged",
    (selectedEntities, unselectedEntities) => {
      console.log("Selected", selectedEntities);
      console.log("Unselected", unselectedEntities);
    }
  );

  //Ajout du gestionnaire d'évènements de clic au canvas
  document
    .getElementById("display-canvas")
    .addEventListener("click", selectEntity);

  if (isSessionCreator) {
    const pointLightComponentValue = {
      color: [1, 1, 1],
      intensity: 500,
      range: 0,
      isDirectional: false,
      isSun: false,
    };
    const transform = {
      position: [3, 3, 3],
      orientation: SDK3DVerse.utils.quaternionFromEuler([-30, 45, 0]),
    };
    const options = {
      deleteOnClientDisconnection: false,
      cutoff: 80,
    };
    spawnLight(pointLightComponentValue, transform, options);
  }
}

const spawnLight = async function (
  pointLightComponentValue,
  pointLightTransform,
  options = {}
) {
  const {
    parentEntity = null,
    // delete entity if the client disconnects
    deleteOnClientDisconnection = true,
    // the cut off of the spot light
    cutoff = 50,
  } = options;

  let template = new SDK3DVerse.EntityTemplate();
  template.attachComponent("point_light", pointLightComponentValue);
  template.attachComponent("spot_light", { cutoff });
  template.attachComponent("local_transform", {
    ...template.entityTemplate.local_transform,
    ...pointLightTransform,
  });
  const entity = await template.instantiateTransientEntity(
    "light name",
    parentEntity,
    deleteOnClientDisconnection
  );
  return entity;
};

window.toggleLight = async function () {
  if (lightEntity) {
    await SDK3DVerse.engineAPI.deleteEntities([lightEntity]).finally(() => {
      lightEntity = null;
      btnToggleLight.innerText = "Spawn Light";
    });
  } else {
    const pointLightComponentValue = {
      color: [0, 0, 1],
      intensity: 300,
      range: 0,
      isDirectional: false,
      isSun: true,
    };
    const transform = {
      position: linkedSceneEntity ? [0, 2, 2] : [0, 2, 1],
      orientation: SDK3DVerse.utils.quaternionFromEuler([-45, 0, 0]),
    };
    const options = {
      parentEntity: linkedSceneEntity,
    };
    lightEntity = await spawnLight(
      pointLightComponentValue,
      transform,
      options
    );
    btnToggleLight.innerText = "Delete Light";
  }
};

window.toggleRotateLeft = async function () {
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
};

// Dans initApp, ajoutez un écouteur d'événements pour le bouton de rotation
btnToggleRotate.addEventListener("click", toggleRotateLeft);

//EntitySelection
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
    //changement de couleur
    //   colorPicking(entity, colors.purple);
    entity.setComponent("material", {
      dataJSON: {
        albedo: colors.red,
        metallic: metallicValue,
        roughness: roughnessValue,
        ambientOcclusion: ambientOcclusionValue,
      },
    });
    console.log(entity.getComponent("material"));
  } else {
    console.log("No entity selected");
  }
}

const colors = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
  orange: [255, 165, 0],
  purple: [255, 0, 255],
};

async function colorPicking(entity, color) {
  entity.setComponent("material", {
    dataJSON: {
      albedo: color,
    },
  });
}

//Script pour la modification de la roughness
var roughnessSlider = document.getElementById("roughnessRange");
var roughness = document.getElementById("roughnessOutput");
var roughnessValue; //variable pour stocker la valeur de la roughness
roughnessValue = parseFloat(roughnessSlider.value); //parseFloat utilisé pour convertir la valeur 'string' obtenu par le input range en 'float'
roughness.innerHTML = roughnessValue;

// Mise à jour de la valeur affichée à chaque modification
roughnessSlider.oninput = function () {
  roughnessValue = parseFloat(this.value);
  roughness.innerHTML = roughnessValue;
  console.log("roughnessValue : ", roughnessValue); //affichage de la value dans la console pour chaque modification
};

//Script pour la modification de la metallic

var metallicSlider = document.getElementById("metallicRange");
var metallic = document.getElementById("metallicOutput");
var metallicValue;
metallicValue = parseFloat(metallicSlider.value); //parseFloat utilisé pour convertir la valeur 'string' obtenu par le input range en 'float'
metallic.innerHTML = metallicValue;

// Mise à jour de la valeur affichée à chaque modification
metallicSlider.oninput = function () {
  metallicValue = parseFloat(this.value);
  metallic.innerHTML = metallicValue;
  console.log("metallicValue : ", metallicValue); //affichage de la value dans la console pour chaque modification
};

//Script pour la modification de l'ambientOcclusion

var ambientOcclusionSlider = document.getElementById("ambientOcclusionRange");
var ambientOcclusion = document.getElementById("ambientOcclusionOutput");
var ambientOcclusionValue;
ambientOcclusionValue = parseFloat(ambientOcclusionSlider.value); //parseFloat utilisé pour convertir la valeur 'string' obtenu par le input range en 'float'
ambientOcclusion.innerHTML = ambientOcclusionValue;

// Mise à jour de la valeur affichée à chaque modification
ambientOcclusionSlider.oninput = function () {
  ambientOcclusionValue = parseFloat(this.value);
  ambientOcclusion.innerHTML = ambientOcclusionValue;
  console.log("ambientOcclusionValue : ", ambientOcclusionValue); //affichage de la value dans la console pour chaque modification
};
