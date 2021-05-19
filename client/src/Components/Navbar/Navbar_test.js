import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'


const Navbar = () => {
    const [paused, setPaused] = useState(false)
    /* 
    useEffect(() => {
        const mp3 = document.getElementsByClassName("audio")[0]
        setPaused(mp3.paused)
    }, [])
    const reproducir = () => {
        const mp3 = document.getElementsByClassName("audio")[0];
        mp3.paused ? mp3.play() : mp3.pause();
        setPaused(mp3.paused)
    } */
    return (
        <>
            <header className="navbar">
                <ul className="list">
                    <li className="list-item">
                        <NavLink to="/Dogos" ><i className="fas fa-paw"></i>Home</NavLink>
                    </li>
                    <li className="list-item">
                        <NavLink to="/Create" ><i className="fas fa-bone"></i>Creador de Dogos</NavLink>
                    </li>
                    <li className="list-item" >
                        {paused ? <><i className="fas fa-play"></i> Play</> : <><i className="fas fa-pause"></i>Pause</>}
                    </li>
                </ul>
            </header>
        </>
    )
}

export default Navbar
