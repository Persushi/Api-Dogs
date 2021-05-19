import React, { useState, useEffect } from 'react'
import MultiplesOpciones from './MultiplesOpciones.js'
import { connect } from 'react-redux'
import { filter, getDogs } from '../../Actions/index'
import DogCard from '../Resultados/DogCard.js'
import './Dogos.css'

const Dogos = ({ getDogs, filter }) => {
    const [offset, setOffset] = useState(0)
    const [formData, setFormData] = useState({
        name: '',
        temp: '',
        ord: '',
    })
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        getDogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        filter(formData);
        setOffset(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])


    return (
        <>
            <div className='formContainer'>
                <form className='formContainer' onSubmit={e => e.preventDefault()}>
                    <div><input className='input' value={formData.name} placeholder='Inserte raza' type='text' onChange={handleChange} name='name'></input>
                        <button className='button' type='submit'>Buscar </button></div>
                    <div>
                        <select onChange={handleChange} className='selector' name='temp'>
                            <option value='default'>Seleccionar temperamento</option>
                            <MultiplesOpciones />
                        </select>
                        <select onChange={handleChange} className='selector' name='ord'>
                            <option value=''>Seleccionar orden</option>
                            <option value='a'>Ascendente (A-Z)</option>
                            <option value='z'>Descendente (Z-A)</option>
                            <option value='p'>Mayor peso</option>
                            <option value='m'>Menos peso</option>
                        </select>
                    </div>

                </form>
            </div>
            <DogCard offset={offset} setOffset={setOffset} />
        </>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        getDogs: (body) => {
            dispatch(getDogs(body))
        },
        filter: (filtros) => {
            dispatch(filter(filtros))
        }
    }

}
export default connect(null, mapDispatchToProps)(Dogos)
