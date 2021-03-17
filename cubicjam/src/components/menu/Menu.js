import { Nav } from "react-bootstrap";
import ToggleButton from "./ToggleButton.js";
import logo from './logo.png';
import './Menu.css'
const Menu = () => {

    return (
        <header>
            <Nav className="navbar navbar-style">
                <div className="container">
                    <div className="navbar-header">
                        <ToggleButton></ToggleButton>
                        <a href="/#">
                            <img className="logo" src={logo}></img>
                        </a>

                    </div>
                    <div className="collapse navbar-collapse" id="clps">
                        <ul className="nav navbar-nav">
                            <li data-token="menu" id="about">
                                <a href="">ABOUT</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Nav>
        </header>
        
    )
}

export default Menu;