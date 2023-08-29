import React, { useState } from 'react'
import '../css/OutputFormStyles.css'

const OutputForm = (props) => {
    return (
        <div>
            <div className='respCont'>
                {/* <p>Kontynent: {props.response}</p>
                <p>Kraj: {props.response}</p>
                <p>Miasto: {props.response}</p>
                <p>Organizacja kontrolująca sieć: {props.response}</p>
                <p>Czy VPN używany: {props.response}</p> */}
                <p>Entered IP: {props.response}</p>
            </div>

            <div className='respCont'>
                <p className='headingPar'>Gathered information</p>
                <p>City: {props.responseData.city}</p>
                <p>Country: {props.responseData.country}</p>
                <p>Continent: {props.responseData.continent}</p>
            </div>
        </div>
    )
}

export default OutputForm;