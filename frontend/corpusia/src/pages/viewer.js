import NavbarViewer from '../components/viewer/navbar_viewer';
import PageTurn from '../components/viewer/page_turn';
import Scene from '../components/viewer/scene';
import Slider from '../components/viewer/slider';
import "../components/global/style/config.css";
import MyComponent from '../components/viewer-test/navbar';


function Viewer() {
    return <div>
        <PageTurn />
        <NavbarViewer />
        <Slider />
        <Scene />
    </div>
}

export default Viewer;