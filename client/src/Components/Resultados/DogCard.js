import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './dogCard.css'

const DogCard = ({ dogs, offset, setOffset, stateCode }) => {
    const [loading, setLoading] = useState(true)
    const [respuesta, setRespuesta] = useState("");
    const [cantByPage] = useState(8);
    const paginacion = [];
    const filtrar = (temperament) => {
        if (typeof temperament === 'string') return temperament
        let aux = [];
        for (let i = 0; i < temperament.length; i++) {
            aux.push(temperament[i].name)
        }
        return aux.join(', ')
    }
    for (let i = 0; i < dogs.length / cantByPage; i++) {
        paginacion.push(i)
    }
    useEffect(() => {
        if (dogs.length > 0) setLoading(false)
    },
        [dogs])
    useEffect(() => {
        if (stateCode > 299) setLoading(false)
        if (stateCode < 500) return setRespuesta("No hay resultados")
        return setRespuesta("Error en el servidor")
    },
        [stateCode])
    let tempDogs = dogs.slice(offset, offset + cantByPage)


    return (
        <div className='resultsContainer'>
            {paginacion.length > 0 && <div className='pagination'>
                <span onClick={() => { offset > 1 && setOffset(offset - 1 * cantByPage) }}>❮</span>
                <span>{`${offset + 1}-${offset + cantByPage > dogs.length ? dogs.length : offset + cantByPage} de ${dogs.length} resultados `} </span>
                {/* {paginacion.map(number => (
                    <span key={number} className={offset === number * cantByPage ? "active" : undefined} onClick={() => { setOffset(number * cantByPage) }} href='#' >{number + 1}</span>
                ))} */}
                <span onClick={() => { paginacion.length - 1 > offset / cantByPage && setOffset(offset + 1 * cantByPage) }}>❯</span>
            </div>}
            <div className='dogContainer'>
                {tempDogs.length === 0 && loading && <h2 className='alerta gris'>Cargando...</h2>}
                {tempDogs.length === 0 && !loading && <h2 className='alerta'>{respuesta}</h2>}
                {tempDogs.map((dog) => {
                    return (
                        <Link to={'/Dogos/' + dog.id} key={dog.id} >
                            <div className='dogCard' style={{ backgroundImage: `url(${dog.urlImage ? dog.urlImage : dog.image.url})` }}>
                                <h2>{dog.name}</h2>
                                {dog.temperament && <h3>Temperamentos:<br></br>{filtrar(dog.temperament)}</h3>}
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        dogs: state.dogsFilter,
        stateCode: state.stateCode
    }
}


export default connect(mapStateToProps)(DogCard)
