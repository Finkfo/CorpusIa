var rotationOn = false;

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
      onChangeCallback(value);
    }
  };
  return {
    getValue: function () {
      return value;
    },
  };
}

// Setup each slider using the reusable function
var metallicSlider = setupSlider("metallicRange", "metallicOutput");
var roughnessSlider = setupSlider("roughnessRange", "roughnessOutput");
var ambientOcclusionSlider = setupSlider(
  "ambientOcclusionRange",
  "ambientOcclusionOutput"
);

var sunXSlider = setupSlider("sunXRange", "sunXOutput", setSunOrientation);
var sunYSlider = setupSlider("sunYRange", "sunYOutput", setSunOrientation);
var sunZSlider = setupSlider("sunZRange", "sunZOutput", setSunOrientation);

const colors = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
  orange: [255, 165, 0],
  purple: [255, 0, 255],
};

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
    desc(entity);
  } else {
    console.log("No entity selected");
  }
}

// Function to modify color called in the color buttons
async function colorPicking(color) {
  return (colorPicked = color);
  console.log(colorPicked);
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

async function desc(entity) {
  entity.setComponent("material", {
    dataJSON: {
      albedo: colorPicked,
      metallic: metallicSlider.getValue(),
      roughness: roughnessSlider.getValue(),
      ambientOcclusion: ambientOcclusionSlider.getValue(),
    },
  });
}

async function updateCamera(property) {
  try {
    const componentFilter = {
      mandatoryComponents: ["camera"],
      forbiddenComponents: [],
    };

    const entities = await SDK3DVerse.engineAPI.findEntitiesByComponents(
      componentFilter
    );

    if (entities[0].isAttached("camera")) {
      const cameraComponent = entities[0].getComponent("camera");

      if (property === "gradient") {
        // Désactiver le soleil lorsque la propriété "gradient" est activée
        await setSunOrientation(false);
      } else {
        // Désactiver la propriété "gradient" lorsque le soleil est activé
        cameraComponent.dataJSON.gradient = false;
      }

      cameraComponent.dataJSON[property] = !cameraComponent.dataJSON[property];
      await entities[0].setComponent("camera", {
        dataJSON: cameraComponent.dataJSON,
      });
      console.log(entities[0].getComponent("camera"));
    }
  } catch (error) {
    console.error("Error updating camera:", error);
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

async function setSunOrientation(enableSun) {
  const sunXRange = document.getElementById("sunXRange");
  const sunYRange = document.getElementById("sunYRange");
  const sunZRange = document.getElementById("sunZRange");
  const getSunButton = document.getElementById("getSunButton");
  const setSunDiv = document.querySelector(".Set.Sun");

  const sun = (
    await SDK3DVerse.engineAPI.findEntitiesByEUID(
      "7fbb3dc8-6d9d-46e3-92ff-2cd64efb26c1"
    )
  )[0];

  if (enableSun) {
    sun.setGlobalTransform({
      eulerOrientation: [
        sunXSlider.getValue(),
        sunYSlider.getValue(),
        sunZSlider.getValue(),
      ],
    });

    setSunDiv.classList.remove("hidden");
    sunXRange.classList.remove("hidden");
    sunYRange.classList.remove("hidden");
    sunZRange.classList.remove("hidden");
    getSunButton.classList.remove("hidden");
  } else {
    sun.setGlobalTransform({
      eulerOrientation: [0, 0, 0],
    });

    setSunDiv.classList.add("hidden");
    sunXRange.classList.add("hidden");
    sunYRange.classList.add("hidden");
    sunZRange.classList.add("hidden");
    getSunButton.classList.add("hidden");
  }
}

// Initialization
async function InitApp() {
  await SDK3DVerse.joinOrStartSession({
    userToken: "public_xhZv-SrH0o7c9Xhz",
    sceneUUID: "17fc8919-6b02-4835-a21c-8f67bafb94ca",
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
