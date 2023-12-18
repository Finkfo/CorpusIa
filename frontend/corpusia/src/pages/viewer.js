import NavbarViewer from '../components/viewer/navbar_viewer';
import Scene from '../components/viewer/scene';
import Slider from '../components/viewer/slider';
import "../components/global/style/config.css";


function Viewer() {
    return <div>
        <NavbarViewer />
        <Slider />
        <Scene />
    </div>
}

export default Viewer;