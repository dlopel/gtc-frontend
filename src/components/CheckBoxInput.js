import React, { useEffect, useState } from 'react'
import './DataInput.css'

export default function CheckBoxInput({
    style,
    label,
    name,
    disabled,
    checked,
    onChange,
    readOnly
}) {
    const [isChecked, setIsChecked] = useState(checked)

    const handleChange = e => {
        if (!readOnly)
            setIsChecked(e.target.checked)

        if (onChange) onChange(e)
    }

    useEffect(() => {
        setIsChecked(checked)
    }, [checked])

    return (
        <div style={style} className="data-input">
            {label && <label className="data-input__label">{label}</label>}
            <div>
                <input
                    onChange={handleChange}
                    checked={isChecked}
                    type='checkbox'
                    name={name}
                    disabled={disabled} />
            </div>
        </div>
    )
}