import React from "react"
import "./style/palette.css";


const PaletteComponent = () => {
    return (
        <div className="palette">
            <div className="palette_settings">
                <div className='line1' />
                <h4>Metallic : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" onChange={e => setMaterialProperty('metallic', e.target.value)} className="slider" id="metallicRange" step="0.01" /> <span> 1</span>
                <p>Your input : <span id="metallicOutput"></span></p>
                <div className="line1" />
                <h4>Roughness : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" onChange={e => setMaterialProperty('roughness', e.target.value)} className="slider" id="roughnessRange" step="0.1" /> <span> 1</span>
                <p>Your input : <span id="roughnessOutput"></span></p>
                <div className="line1" />
                <h4>Ambient Occlusion : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" onChange={e => setMaterialProperty('ambientOcclusion', e.target.value)} className="slider" id="ambientOcclusionRange" step="0.1" /> <span> 1</span>
                <p>Your input : <span id="ambientOcclusionOutput"></span></p>
            </div>

            <div className="button_settings">
                <button div='button' onClick={() => window.toggleRotate()}>Rotate</button>
                <button div='button' onClick={() => window.colorPicking(window.colors.purple)}>Purple</button>
                <button div='button' onClick={() => window.colorPicking(window.colors.orange)}>Orange</button>
            </div>
        </div >
    );
};

export default PaletteComponent;