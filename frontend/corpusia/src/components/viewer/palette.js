import React, { useEffect } from "react"
import "./style/palette.css";
import setMaterialProperty from "./scene_config";
import updateCamera from "./scene_config";
import toggleRotate from "./scene_config"; 
import DoubleSided from "./scene_config";
import setSunVisibility from "./scene_config";



const PaletteComponent = () => {
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = './scene_config.js';
    //     script.async = true;
    //     document.body.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);
    return (
        <div className="palette">
            <div className="palette_settings">
                <div className='line1' />
                <h4>Metallic : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" onChange={e => setMaterialProperty('metallic', e.target.value)} className="slider" id="metallic" step="0.01" /> <span> 1</span>
                <p>Your input : <span id="metallicOutput"></span></p>
                <div className="line1" />
                <h4>Roughness : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" onChange={e => setMaterialProperty('roughness', e.target.value)} className="slider" id="roughness" step="0.1" /> <span> 1</span>
                <p>Your input : <span id="roughnessOutput"></span></p>
                <div className="line1" />
                <h4>Ambient Occlusion : </h4>
                <span>0 </span><input type="range" min="0" max="1" value="0.5" onChange={e => setMaterialProperty('ambientOcclusion', e.target.value)} className="slider" id="ambientOcclusion" step="0.1" /> <span> 1</span>
                <p>Your input : <span id="ambientOcclusionOutput"></span></p>
                <div className="line1" />
                <h4>Emission intensisty</h4>
                <span>0 </span><input type="range" min="0" max="1" value="1" onChange={e => setMaterialProperty('emission', e.target.value)} className="slider" id="emission" step="0.1" /> <span>1</span>
                <p>Your input : <span id="EmissionIntensityOutput"></span></p>
            </div>

            <div className="button_settings">
                <button onClick={() => toggleRotate()}>Rotate</button>
                <button onClick={() => updateCamera('sharpen')}>Sharpen</button>
                <button onClick={() => updateCamera('filterSpecular')}>Filter Specular</button>
                <button onClick={() => updateCamera('bloom')}>Bloom</button>
                <button onClick={() => updateCamera('atmosphere') && setSunVisibility(true)}>Atmosphere</button>
                <button onClick={() => updateCamera('gradient') && setSunVisibility(false)}>Gradient</button>
                <button onClick={() => DoubleSided()}>Double sided Button</button>
                <div className="color-picker" />
            </div>
        </div >
    );
};



export default PaletteComponent;