import React, { useEffect } from 'react'
import { getBreedDetail, setStatus } from '../../Actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './DogDetail.css'
import doge from '../../Assets/img/Doge_head.png'
import nopuedeser from '../../Assets/img/nopuedeser.png'

const DogDetail = ({ getBreedDetail, match, breedDetail, stateCode, setStatus }) => {
    const id = match.params.id
    const filtrar = (temperament) => {
        if (typeof temperament === 'string') return temperament
        let aux = [];
        for (let i = 0; i < temperament.length; i++) {
            aux.push(temperament[i].name)
        }
        return aux.join(', ')
    }
    useEffect(() => {
        getBreedDetail(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='contenedorFlotante' >
            {/* eslint-disable-next-line */}
            {breedDetail.id == id || stateCode > 399 ? <>
                {/* eslint-disable-next-line */}
                {breedDetail.id == id ?
                    <div className='dogDetails' style={{ backgroundImage: `url(${breedDetail.urlImage ? breedDetail.urlImage : breedDetail.image.url})` }}>
                        <Link className='cerrar' to='/Dogos' onClick={() => setStatus(0)}><button className='button button-cerrar'>X</button></Link>
                        <div className='dogText'><h2>{breedDetail.name}</h2>
                            <h4>Peso: {breedDetail.weight.metric ? breedDetail.weight.metric : breedDetail.weight}kg</h4>
                            <h4>Altura: {breedDetail.height.metric ? breedDetail.height.metric : breedDetail.height}cm</h4>
                            <h4>Esperanza de Vida: {breedDetail.life_span}</h4>
                            {breedDetail.temperament && <h4>Temperamentos:<br></br>{filtrar(breedDetail.temperament)}</h4>}
                        </div>
                    </div>
                    :
                    <div className='dogDetails' >
                        <Link to='/dogos' onClick={() => setStatus(0)}><button className='button button-cerrar'>X</button></Link>
                        <img src={nopuedeser} alt=''></img>
                        <div className='dogText'>
                            <h2>No se encontró el amigo de Doge con ese ID</h2>
                        </div>
                    </div>}
            </>
                : <Link to='/dogos'><img className='doge' alt='' src={doge}></img></Link>}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        breedDetail: state.breedDetail,
        stateCode: state.stateCode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getBreedDetail: (id) => {
            dispatch(getBreedDetail(id))
        },
        setStatus: (state) => {
            dispatch(setStatus(state))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DogDetail)
