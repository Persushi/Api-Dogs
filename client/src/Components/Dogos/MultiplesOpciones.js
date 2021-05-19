import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getTemperaments } from '../../Actions/index.js'

const MultiplesOpciones = ({ arreglo, getTemperaments }) => {
    useEffect(() => {
        getTemperaments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const children = arreglo.map((val) => {
        return (<option key={val.name} value={val.name}>{val.name}</option>)
    })
    return (
        <>
            {children}
        </>
    )
}
const mapStateToProps = state => {
    return {
        arreglo: state.arrayTemps
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getTemperaments: () => {
            dispatch(getTemperaments())
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MultiplesOpciones)

