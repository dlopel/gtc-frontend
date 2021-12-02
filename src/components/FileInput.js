import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './FileInput.css'

function FileInput({
    disabled,
    path,
    classes,
    label,
    name,
    maxSize,
    accept,
    required,
    tooltipMessage,
    mime }) {
    const [fileName, setFileName] = useState('Selecciona archivo')
    const [isFileInvalid, setIsFileInvalid] = useState(false)
    const disabledClass = disabled === true ? 'file-input_disabled' : ''
    const requiredClass = disabled === false && required ? 'file-input_required' : ''
    const link = path ? <a
        className='file-input__link'
        rel='noreferrer'
        target='_blank'
        href={path}><i className='fas fa-external-link-square-alt'></i></a> :
        undefined

    function handleChange(e) {
        const file = e.target.files[0]
        if (file) {
            if (file.size > maxSize || file.type !== mime) {
                e.target.value = null
                setIsFileInvalid(true)
            } else {
                setFileName(file.name)
            }
        }
    }

    useEffect(() => {
        if (isFileInvalid)
            setTimeout(() => {
                setIsFileInvalid(false)
            }, 4000)
    }, [isFileInvalid])

    return (
        <label className={classes}>
            <span className='file-input__label-container'>
                <span className='file-input__label'>{label}</span>
                {link}
            </span>
            <span className={`file-input ${disabledClass} ${requiredClass}`}>
                <input
                    required={required}
                    name={name}
                    className='file-input__input'
                    type='file'
                    onChange={handleChange}
                    accept={accept}
                    disabled={disabled} />
                <span className='file-input__icon'><i className="fas fa-upload"></i></span>
                <span className='file-input__file-name'>
                    <span className='file-input__file-name-text'>{fileName}</span>
                </span>
                <span className='file-input__tooltip' style={isFileInvalid ? {} : { display: 'none' }}>
                    <span className='file-input__tooltip-content'>
                        <i className="fas fa-exclamation-triangle"></i>
                        <span className='file-input__tooltip-text'>{tooltipMessage}</span>
                    </span>
                    <span className='file-input__tooltip-tail'></span>
                </span>
            </span>
        </label>
    )
}

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    maxSize: PropTypes.number.isRequired,
    accept: PropTypes.string.isRequired,
    tooltipMessage: PropTypes.string.isRequired,
    mime: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    path: PropTypes.string,
    classes: PropTypes.object,
}

export default FileInput