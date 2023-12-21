import React from "react"
import "./style/sun.css";

const SunComponent = () => {
    return (
        <div>
            <div className="sun_settings">
                <div className="line1" />
                <h4>Sun X Orientation :</h4>
                <span>0 </span><input type="range" min="0" max="360" value="240" onChange={e => setMaterialProperty('sunX', e.target.value)} className="slider" id="sunXRange" step="5" /> <span> 360</span>
                <p>Your input : <span id="sunXOutput"></span></p>
                <div className="line1" />
                <h4>Sun Y Orientation :</h4>
                <span>0 </span><input type="range" min="0" max="360" value="0" onChange={e => setMaterialProperty('sunY', e.target.value)} className="slider" id="sunYRange" step="5" /> <span> 360</span>
                <p>Your input : <span id="sunYOutput"></span></p>
                <div className="line1" />
                <h4>Sun Z Orientation :</h4>
                <span>0 </span><input type="range" min="0" max="360" value="0" onChange={e => setMaterialProperty('sunZ', e.target.value)} className="slider" id="sunZRange" step="5" /> <span> 360</span>
                <p>Your input : <span id="sunZOutput"></span></p>
                <div className="button_settings">
                    <button onClick={() => window.getSun()}>Get Sun</button>
                </div>
            </div>
        </div >
    );
};

export default SunComponent;