import React, { useEffect } from 'react'
import { useState } from 'react'
import './DataInput.css'

const DataInput = React.forwardRef(({
    style,
    label,
    name,
    value,
    maxLength,
    minLength,
    type,
    pattern,
    placeholder,
    required,
    disabled,
    readOnly,
    title,
    onKeyPress,
    regExp,
    onChange
}, ref) => {
    const [enteredValue, setEnteredValue] = useState('')
    function handleChange(e) {
        const v = e.target.value
        if (!v || v.match(regExp)) {
            setEnteredValue(v)
        }
        if (onChange) onChange(e)
    }
    useEffect(() => {
        setEnteredValue(value || '')
    }, [value])
    return (
        <div style={style} className="data-input">
            {label && <label className="data-input__label">{label}</label>}
            <input
                ref={ref}
                name={name}
                // defaultValue={value}
                value={enteredValue}
                maxLength={maxLength}
                minLength={minLength}
                type={type}
                pattern={pattern}
                placeholder={placeholder}
                className='data-input__input'
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                title={title}
                onKeyPress={onKeyPress}
                onChange={handleChange} />
        </div>
    )
})

export default DataInput