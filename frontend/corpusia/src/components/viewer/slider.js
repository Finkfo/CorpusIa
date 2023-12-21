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
        setColorFunctions(false);
        setSunFunctions(true);
    };

    const paletteEmptyClicked = () => {
        setColorFunctions(true);
        setSunFunctions(false);
    };

    return (
        <>
            <div className='slider_display'>
                <div className='slider_part'>
                    <div className='slider_elements'>
                        <div className='top'>
                            <div className='left_function'>
                                <div className='left_function_1'>
                                    {colorFunctions && <img src={palette_full} alt="palette_full" />}
                                </div>
                                <button><div className='left_function_2' onClick={paletteEmptyClicked}>
                                    {sunFunctions && <img src={palette_empty} alt="palette_empty" />}
                                </div></button>
                            </div>
                            <div className='right_function'>
                                <div className='right_function_1' >
                                    {sunFunctions && <img src={sun_full} alt="sun_full" />}
                                </div>
                                <button><div className='right_function_2' onClick={sunEmptyClicked}>
                                    {colorFunctions && <img src={sun_empty} alt="sun_empty" />}
                                </div></button>
                            </div>
                        </div>

                        <div className='settings_pannel'>
                            {colorFunctions && <PaletteComponent />}
                            {sunFunctions && <SunComponent />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Slider;