// import "./style/slider.css";
// import React, { useState } from 'react';
// import palette_full from './img/palette_full.svg';
// import palette_empty from './img/palette_empty.svg';
// import sun_full from './img/sun_full.svg';
// import sun_empty from './img/sun_empty.svg';

// var colorFunctions = false;
// var sunFunctions = true;

// function Slider() {

//     const [boutonClique, setBoutonClique] = useState(false);

//     // Fonction appelée lors du clic sur le bouton
//     const sunEmptyClicked = () => {

//         setBoutonClique(true);
//         colorFunctions = false;
//         sunFunctions = true;
//     };

//     const paletteEmptyClicked = () => {

//         setBoutonClique(true);
//         colorFunctions = true;
//         sunFunctions = false;
//     };

//     if (colorFunctions === true) {
//         return <div>
//             <div class='slider_part'>
//                 <div class='slider_elements'>
//                     <div class='top'>
//                         <div class='left_function'>
//                             <img src={palette_full} alt="palette_full" />
//                         </div>
//                         <div class='right_function'>
//                             <img src={sun_empty} onClick={sunEmptyClicked} alt="sun_empty" />
//                         </div>
//                     </div>

//                     <div class='settings_pannel'>
//                         <div class="settings">
//                             <div class='line1' />
//                             <h4>Metallic : </h4>
//                             <span>0 </span><input type="range" min="0" max="1" value="0.5" class="slider" id="metallicRange" step="0.01" /> <span> 1</span>
//                             <p>Your input : <span id="metallicOutput"></span></p>
//                             <div class="line1" />
//                             <h4>Roughness : </h4>
//                             <span>0 </span><input type="range" min="0" max="1" value="0.5" class="slider" id="roughnessRange" step="0.1" /> <span> 1</span>
//                             <p>Your input : <span id="roughnessOutput"></span></p>
//                             <div class="line1" />
//                             <h4>Ambient Occlusion : </h4>
//                             <span>0 </span><input type="range" min="0" max="1" value="0.5" class="slider" id="ambientOcclusionRange" step="0.1" /> <span> 1</span>
//                             <p>Your input : <span id="ambientOcclusionOutput"></span></p>
//                         </div>


//                         <button onclick="toggleRotate()">Rotate</button>
//                         <button onclick="colorPicking(colors.purple)">"Purple" button</button>
//                         <button onclick="colorPicking(colors.orange)">"Orange" Button</button>


//                         <div class="sun_settings">
//                             <div class="line1" />
//                             <h4>Sun X Orientation :</h4>
//                             <span>0 </span><input type="range" min="0" max="360" value="240" class="slider" id="sunXRange" step="5" /> <span> 360</span>
//                             <p>Your input : <span id="sunXOutput"></span></p>
//                             <div class="line1" />
//                             <h4>Sun Y Orientation :</h4>
//                             <span>0 </span><input type="range" min="0" max="360" value="0" class="slider" id="sunYRange" step="5" /> <span> 360</span>
//                             <p>Your input : <span id="sunYOutput"></span></p>
//                             <div class="line1" />
//                             <h4>Sun Z Orientation :</h4>
//                             <span>0 </span><input type="range" min="0" max="360" value="0" class="slider" id="sunZRange" step="5" /> <span> 360</span>
//                             <p>Your input : <span id="sunZOutput"></span></p>
//                             <button onclick="getSun()">Get Sun</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     }



//     if (sunFunctions === true) {
//         return <div>
//             <div class='slider_part'>
//                 <div class='slider_elements'>
//                     <div class='top'>
//                         <div class='left_function'>
//                             <img src={palette_empty} onClick={paletteEmptyClicked} alt="palette_empty" />
//                         </div>
//                         <div class='right_function'>
//                             <img src={sun_full} alt="sun_full" />
//                         </div>
//                     </div>

//                     <div class='settings_pannel'>
//                         <div class="settings">
//                             <div class='line1' />
//                             <h4>Metallic : </h4>
//                             <span>0 </span><input type="range" min="0" max="1" value="0.5" class="slider" id="metallicRange" step="0.01" /> <span> 1</span>
//                             <p>Your input : <span id="metallicOutput"></span></p>
//                             <div class="line1" />
//                             <h4>Roughness : </h4>
//                             <span>0 </span><input type="range" min="0" max="1" value="0.5" class="slider" id="roughnessRange" step="0.1" /> <span> 1</span>
//                             <p>Your input : <span id="roughnessOutput"></span></p>
//                             <div class="line1" />
//                             <h4>Ambient Occlusion : </h4>
//                             <span>0 </span><input type="range" min="0" max="1" value="0.5" class="slider" id="ambientOcclusionRange" step="0.1" /> <span> 1</span>
//                             <p>Your input : <span id="ambientOcclusionOutput"></span></p>
//                         </div>


//                         <button onclick="toggleRotate()">Rotate</button>
//                         <button onclick="colorPicking(colors.purple)">"Purple" button</button>
//                         <button onclick={() => window.colorPicking(window.colors.orange)}>"Orange" Button</button>


//                         <div class="sun_settings">
//                             <div class="line1" />
//                             <h4>Sun X Orientation :</h4>
//                             <span>0 </span><input type="range" min="0" max="360" value="240" class="slider" id="sunXRange" step="5" /> <span> 360</span>
//                             <p>Your input : <span id="sunXOutput"></span></p>
//                             <div class="line1" />
//                             <h4>Sun Y Orientation :</h4>
//                             <span>0 </span><input type="range" min="0" max="360" value="0" class="slider" id="sunYRange" step="5" /> <span> 360</span>
//                             <p>Your input : <span id="sunYOutput"></span></p>
//                             <div class="line1" />
//                             <h4>Sun Z Orientation :</h4>
//                             <span>0 </span><input type="range" min="0" max="360" value="0" class="slider" id="sunZRange" step="5" /> <span> 360</span>
//                             <p>Your input : <span id="sunZOutput"></span></p>
//                             <button onclick="getSun()">Get Sun</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     }
// }

// export default Slider;


import React, { useState } from 'react';
import PaletteComponent from './palette';
import SunComponent from './sun';
import "./style/slider.css";
import palette_full from './img/palette_full.svg';
import palette_empty from './img/palette_empty.svg';
import sun_full from './img/sun_full.svg';
import sun_empty from './img/sun_empty.svg';

function Slider() {
    const [colorFunctions, setColorFunctions] = useState(true);
    const [sunFunctions, setSunFunctions] = useState(false);

    const sunEmptyClicked = () => {
        setColorFunctions(true);
        setSunFunctions(false);
    };

    const paletteEmptyClicked = () => {
        setColorFunctions(false);
        setSunFunctions(true);
    };

    return (
        <div>
            <div className='slider_part'>
                <div className='slider_elements'>
                    <div className='top'>
                        <div className='left_function'>
                            {colorFunctions && <img src={palette_full} alt="palette_full" />}
                            {sunFunctions && <img src={palette_empty} onClick={paletteEmptyClicked} alt="palette_empty" />}
                        </div>
                        <div className='right_function'>
                            {colorFunctions && <img src={sun_empty} onClick={sunEmptyClicked} alt="sun_empty" />}
                            {sunFunctions && <img src={sun_full} alt="sun_full" />}
                        </div>
                    </div>

                    <div className='settings_pannel'>
                        {colorFunctions && <PaletteComponent />}
                        {sunFunctions && <SunComponent />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;