import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Header.scss';
import Menu from '../Menu/Menu';

const Header = () =>{
    const [isOpen,setIsOpen] = useState(false);
    const handleMenu = () =>{
        setIsOpen(!isOpen);
    }
    return(
        <div>
            <nav className="navbar navbar-light">
                <div className="nav-brand">
                    <button className="navbar-toggler" onClick={handleMenu} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon icon"></span>
                    </button>
                </div>
                <div className="nav-title">
                    <Link className="navbar-brand fs-1" to="/">Prem TODO</Link>
                </div>
            </nav>
            {isOpen && <Menu handleMenu={handleMenu}/>}
        </div>
    )
}

export default Header;