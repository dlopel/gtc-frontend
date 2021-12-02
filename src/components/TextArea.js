import React from 'react'
import PropTypes from 'prop-types'
import './DataInput.css'

function TextArea({
    style,
    label,
    name,
    value,
    rows,
    cols,
    maxLength,
    minLength,
    placeholder,
    required,
    disabled }) {
    return (
        <div style={style} className="data-input">
            <label className='data-input__label'>{label}</label>
            <textarea
                className='data-input__input'
                name={name}
                defaultValue={value}
                rows={rows}
                cols={cols}
                maxLength={maxLength}
                minLength={minLength}
                placeholder={placeholder}
                required={required}
                disabled={disabled}>
            </textarea>
        </div>
    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    rows: PropTypes.string,
    cols: PropTypes.string,
    required: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    maxLength: PropTypes.string,
    minLength: PropTypes.string
}

export default TextArea