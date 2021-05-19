import React, { useState, useEffect } from 'react'
import MultiplesOpciones from '../Dogos/MultiplesOpciones'
import Dog from '../../Assets/img/Annoying_Dog.gif'
import { connect } from 'react-redux'
import './Create.css'
import { addDog, setStatus } from '../../Actions'

const Create = ({ addDog, status, setStatus }) => {
    const [body, setBody] = useState({
        name: '',
        weight: '1',
        height: '1',
        urlImage: '',
        life_span: '1',
        selector: '',
        temperaments: []
    })
    const [formvalid, setFormvalid] = useState(true)
    const [alerta, setAlerta] = useState({
        name: false,
        weight: false,
        height: false,
        life_span: false,
        temp: false,
    })
    useEffect(() => {
        setAlerta({ ...alerta, weight: (body.weight <= 0), height: (body.height <= 0), name: (/\d/.test(body.name)), life_span: (body.life_span <= 0) })
        if (body.name.trim() !== '' && body.weight > 0 && body.height > 0 && body.life_span > 0 && body.temperaments.length > 0) {
            return setFormvalid(false)
        }
        setFormvalid(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [body])
    useEffect(() => {
        setStatus(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleChange = e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })

    }
    const pushing = () => {
        if (body.temperaments.length >= 5) return setAlerta({ ...alerta, temp: true })
        if (body.selector !== '' && !body.temperaments.includes(body.selector)) setBody({
            ...body,
            temperaments: body.temperaments.concat(body.selector)
        })
    }
    const deleteTemp = (value) => {
        setAlerta({ ...alerta, temp: false })
        setBody({
            ...body,
            temperaments: body.temperaments.filter((b) => b !== value)
        })
    }
    const submitHandler = e => {
        e.preventDefault();
        addDog(body);
        setStatus(0);
        setBody({
            name: '',
            weight: '1',
            height: '1',
            urlImage: '',
            life_span: '1',
            selector: '',
            temperaments: []
        })

    }
    const createAlert = e => {
        let l = e.charAt(e.length - 1)
        return <span className='alerta'>Inserte {e} válid{l}</span>
    }

    return (
        <div className='createContainer'>
            <div className='formCreateContainer'>
                <div className='imageContainer'>
                    <img src={Dog} alt=''></img>
                    {body.temperaments.map((e) => <span key={e} className='tempName' onClick={() => deleteTemp(e)} >{e}</span>)}
                    {alerta.temp && <span className='alerta'>Solo puedes tener hasta 5 temperamentos</span>}
                    {status === 200 && <span className='alerta alerta-verde' onClick={() => setStatus(0)}>Dogo creado correctamente!</span>}
                    {status > 399 && <span className='alerta' onClick={() => setStatus(0)}>Hubo un error en la creación del Dogo!</span>}
                </div>
                <form onSubmit={submitHandler}>
                    <label>Raza *</label><br />
                    <input placeholder='Henry' className='input' type='text' value={body.name} name='name' onChange={handleChange}></input>{alerta.name && createAlert('raza')}<br />
                    <label>Peso *</label><br />
                    <input className='input' type='number' value={body.weight} name='weight' min="0" onChange={handleChange}></input>{alerta.weight && createAlert('peso')}<br />
                    <label>Altura *</label><br />
                    <input className='input' type='number' value={body.height} name='height' min="0" onChange={handleChange}></input>{alerta.height && createAlert('altura')}<br />
                    <label>Esperanza de Vida *</label><br />
                    <input className='input' type='number' value={body.life_span} name='life_span' min="0" onChange={handleChange}></input>{alerta.life_span && createAlert('vida')}<br />
                    <label>URL de imagen</label><br />
                    <input placeholder='Minimo 400x400' className='input' type='text' value={body.urlImage} name='urlImage' onChange={handleChange}></input><br />
                    <select className='selector' onChange={handleChange} name='selector' value={body.selector}>
                        <option value=''>Temperamentos</option>
                        <MultiplesOpciones />
                    </select><button type='button' className='button button-create' onClick={pushing}>Agregar</button>
                    <button className='button button-create' type='submit' disabled={formvalid} >Crear Perro</button>
                </form>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        status: state.stateCode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addDog: (body) => {
            dispatch(addDog(body))
        },
        setStatus: (state) => {
            dispatch(setStatus(state))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
