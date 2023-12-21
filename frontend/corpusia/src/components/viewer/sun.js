import React from "react"

const SunComponent = () => {
    return (
        <div>
            <div class="sun_settings">
                <div class="line1" />
                <h4>Sun X Orientation :</h4>
                <span>0 </span><input type="range" min="0" max="360" value="240" class="slider" id={window.sunXRange} step="5" /> <span> 360</span>
                <p>Your input : <span id={window.sunXOutput}></span></p>
                <div class="line1" />
                <h4>Sun Y Orientation :</h4>
                <span>0 </span><input type="range" min="0" max="360" value="0" class="slider" id={window.sunYRange} step="5" /> <span> 360</span>
                <p>Your input : <span id={window.sunYOutput}></span></p>
                <div class="line1" />
                <h4>Sun Z Orientation :</h4>
                <span>0 </span><input type="range" min="0" max="360" value="0" class="slider" id={window.sunZRange} step="5" /> <span> 360</span>
                <p>Your input : <span id={window.sunZOutput}></span></p>
                <button onclick={() => window.getSun()}>Get Sun</button>
            </div>
        </div >
    );
};

export default SunComponent;