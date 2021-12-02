import React from 'react'
import './DataInput.css'

export default function RadioButtonInput({
    style,
    label,
    name,
    buttons
}) {
    const radioButtons = buttons.map((buttonElement, idx) => {
        const id = `${name}-${idx}`
        return (
            <span key={idx}>
                <label
                    className='data-input__rb-label'
                    htmlFor={id}>{buttonElement.label}</label>
                {idx === 0 ?
                    <input
                        id={id}
                        type='radio'
                        name={name}
                        value={buttonElement.value}
                        defaultChecked /> :
                    <input
                        id={id}
                        type='radio'
                        name={name}
                        value={buttonElement.value} />}
            </span>
        )
    })
    return (
        <div style={style} className="data-input">
            {label && <div className="data-input__label">{label}</div>}
            <div className='data-input__rb-container'>
                {radioButtons}
            </div>
        </div>
    )
}