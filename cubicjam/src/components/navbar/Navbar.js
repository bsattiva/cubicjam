import styled from "styled-components";
import {NavLink as Link} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';

export const Nav = styled.nav`
background: #000;
height: 80px;
display: flex;
justify-content: space-between;
width:100%;
padding-left: 50px;
padding-right: 50px;
// padding: 0.5rem calc((100vw - 1000px) / 2);
z-index: 90;

@media-screen and (max-width: 400px) {
padding-left: 5px;
padding-right: 5px;
}

`

export const NavLink = styled(Link)`
color: #fff;
display: flex;
font-size: 20px;
font-weight: bold;
align-items: center;
text-decoration: none;
padding: 1 0rem;
margin-left: 20px;
height: 100%;
cursor: pointer;

&.active {
    color: #15cdfc;

}

&:hover {
  
    background: lightblue;
    color: #010606;
}
`

export const Bars = styled(FaBars)`
display: none;
color: #fff;    

@media screen and (max-width: 900px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
}
`

export const NavMenu = styled.div`
display: flex;
align-items: left;
margin-right: 224px;

@media screen and (max-width: 900px) {
    display: none;
}
`

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;

@media screen and (max-width: 900px) {
    display: none;
}
`

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`