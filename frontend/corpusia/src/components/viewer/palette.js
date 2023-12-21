import React from "react"
import "./style/palette.css";

const PaletteComponent = () => {
    return (
        <div className="palette">
            <div className="palette_settings">
                <div className='line1' />
                <h4>Metallic : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" onChange={e => window.setMaterialProperty('metallic', e.target.value)} className="slider" id="metallic" step="0.01" /> <span> 1</span>
                <p>Your input : <span id="metallicOutput"></span></p>
                <div className="line1" />
                <h4>Roughness : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" onChange={e => window.setMaterialProperty('roughness', e.target.value)} className="slider" id="roughness" step="0.1" /> <span> 1</span>
                <p>Your input : <span id="roughnessOutput"></span></p>
                <div className="line1" />
                <h4>Ambient Occlusion : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" onChange={e => window.setMaterialProperty('ambientOcclusion', e.target.value)} className="slider" id="ambientOcclusion" step="0.1" /> <span> 1</span>
                <p>Your input : <span id="ambientOcclusionOutput"></span></p>
                <div className="line1" />
                <h4>Emission intensisty</h4>
                <span>0 </span><input type="range" min="0" max="1" value="1" onChange={e => window.setMaterialProperty('emission', e.target.value)} className="slider" id="emission" step="0.1" /> <span>1</span>
                <p>Your input : <span id="EmissionIntensityOutput"></span></p>
            </div>

            <div className="button_settings">
                <button onClick={() => window.toggleRotate()}>Rotate</button>
                <button onClick={() => window.updateCamera('sharpen')}>Sharpen</button>
                <button onClick={() => window.updateCamera('filterSpecular')}>Filter Specular</button>
                <button onClick={() => window.updateCamera('bloom')}>Bloom</button>
                <button onClick={() => window.updateCamera('atmosphere') && window.setSunVisibility(true)}>Atmosphere</button>
                <button onClick={() => window.updateCamera('gradient') && window.setSunVisibility(false)}>Gradient</button>
                <button onClick={() => window.DoubleSided()}>Double sided Button</button>
                <div className="color-picker" />
            </div>
        </div >
    );
};



export default PaletteComponent;