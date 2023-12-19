import "./style/scene.css";

function Scene() {
    return <div>
        <div class="canvas-container">
            {/* <!-- CANVAS --> */}
            <canvas id="display-canvas" oncontextmenu="event.preventDefault()"></canvas>
        </div>
    </div>

}

export default Scene;