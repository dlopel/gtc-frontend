import React from 'react'
import './DataInput.css'

const DropDownList = React.forwardRef((
    {
        style,
        label,
        name,
        required,
        disabled,
        value,
        onChange,
        keyValueArray
    },
    ref) => {
    const items = keyValueArray.map(item => (
        <option
            key={item.id}
            value={item.id}>{item.value}</option>
    ))
    return (
        <div style={style} className='data-input'>
            {label && <label className='data-input__label'>{label}</label>}
            <select
                ref={ref}
                className='data-input__input'
                name={name}
                required={required}
                disabled={disabled}
                value={disabled ? (value || '') : undefined}
                onChange={onChange}>
                <option value=''>Seleccione...</option>
                {items}
            </select>
        </div>
    )
})




// function DropDownList({
//     style,
//     label,
//     name,
//     required,
//     disabled,
//     value,
//     onChange,
//     keyValueArray }) {
//     const items = keyValueArray.map(item => (
//         <option
//             key={item.id}
//             value={item.id}>{item.value}</option>
//     ))
//     return (
//         <div style={style} className='data-input'>
//             <label className='data-input__label'>{label}</label>
//             <select
//                 className='data-input__input'
//                 name={name}
//                 required={required}
//                 disabled={disabled}
//                 value={disabled ? value : undefined}
//                 onChange={onChange}>
//                 <option value=''>Seleccione...</option>
//                 {items}
//             </select>
//         </div>
//     )
// }

// DropDownList.propTypes = {
//     style: PropTypes.object,
//     label: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     disabled: PropTypes.bool,
//     required: PropTypes.string,
//     value: PropTypes.string,
//     keyValueArray: PropTypes.array.isRequired
// }

export default DropDownList