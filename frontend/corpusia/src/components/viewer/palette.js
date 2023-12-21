import React from "react"
import "./style/palette.css";


const PaletteComponent = () => {
    return (
        <div class="palette">
            <div class="palette_settings">
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

            <div class="button_settings">
                <button div='button' onclick={() => window.toggleRotate()}>Rotate</button>
                <button div='button' onclick={() => window.colorPicking(window.colors.purple)}>Purple</button>
                <button div='button' onclick={() => window.colorPicking(window.colors.orange)}>Orange</button>
            </div>
        </div >
    );
};

export default PaletteComponent;