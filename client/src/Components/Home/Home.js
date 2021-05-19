import React from 'react'
import './home.css'
import { NavLink } from 'react-router-dom'



const Home = () => {
    const reproducir = () => {
        const mp3 = document.getElementsByClassName("audio")[0];
        mp3.play()
    }
    return (
        <>
            <div className='containerHome' >
                <h1 className='textHome' onClick={reproducir}>
                    <NavLink to='/Dogos'>d<span className='red'>·</span>o<span className='blue'>·</span>g<span className='yellow'>·</span>e f<span className='red'>·</span>r<span className='yellow'>·</span>e<span className='blue'>·</span>n<span className='red'>·</span>s</NavLink></h1>
            </div >
        </>
    )
}

export default Home
