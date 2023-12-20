import React from "react"

const SunComponent = () => {
    return (
        <div>
            <div class="settings">
                <div class='line1' />
                <h4>Metallic : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" class="slider" id="metallicRange" step="0.01" /> <span> 1</span>
                <p>Your input : <span id="metallicOutput"></span></p>
                <div class="line1" />
                <h4>Roughness : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" class="slider" id="roughnessRange" step="0.1" /> <span> 1</span>
                <p>Your input : <span id="roughnessOutput"></span></p>
                <div class="line1" />
                <h4>Ambient Occlusion : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" class="slider" id="ambientOcclusionRange" step="0.1" /> <span> 1</span>
                <p>Your input : <span id="ambientOcclusionOutput"></span></p>
            </div>


            <button onclick="toggleRotate()">Rotate</button>
            <button onclick="colorPicking(colors.purple)">"Purple" button</button>
            <button onclick={() => window.colorPicking(window.colors.orange)}>"Orange" Button</button>


            <div class="sun_settings">
                <div class="line1" />
                <h4>Sun X Orientation :</h4>
                <span>0 </span><input type="range" min="0" max="360" value="240" class="slider" id="sunXRange" step="5" /> <span> 360</span>
                <p>Your input : <span id="sunXOutput"></span></p>
                <div class="line1" />
                <h4>Sun Y Orientation :</h4>
                <span>0 </span><input type="range" min="0" max="360" value="0" class="slider" id="sunYRange" step="5" /> <span> 360</span>
                <p>Your input : <span id="sunYOutput"></span></p>
                <div class="line1" />
                <h4>Sun Z Orientation :</h4>
                <span>0 </span><input type="range" min="0" max="360" value="0" class="slider" id="sunZRange" step="5" /> <span> 360</span>
                <p>Your input : <span id="sunZOutput"></span></p>
                <button onclick="getSun()">Get Sun</button>
            </div>
        </div >
    );
};

export default SunComponent;