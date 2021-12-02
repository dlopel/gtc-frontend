import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Button.css'

function SectionCRUDButtons({ operation, onDelete, onEdit, redirectionPath = '/' }) {

    const [isEditButtonPressed, setIsEditButtonPressed] = useState(false)

    function handleClickEdit(e) {
        setIsEditButtonPressed(true)
        onEdit(e)
    }

    function handleClickDelete(e) {
        if (onDelete) {
            onDelete(e)
        }
    }

    const styles = { gridColumn: '1/5', display: 'inline-flex', columnGap: '.5rem' }

    if (operation === 'create') {
        return (
            <div style={styles}>
                <button
                    type="submit"
                    className="button button_color_primary">Guardar</button>
                <Link
                    to={redirectionPath}
                    className="button button_color_primary">Cancelar</Link>
            </div>
        )
    } else if (operation === 'update-delete') {
        return (
            <div style={styles}>
                {isEditButtonPressed ?
                    <button
                        className="button button_color_primary"
                        type="submit">Guardar</button> :
                    <span
                        className="button button_color_primary"
                        onClick={handleClickEdit}>Editar</span>}
                <button
                    className="button button_color_primary"
                    type="button"
                    onClick={handleClickDelete}>Eliminar</button>
                <Link
                    to={redirectionPath}
                    className="button button_color_primary">Cancelar</Link>
            </div>
        )
    }
}

SectionCRUDButtons.propTypes = {
    operation: PropTypes.oneOf(['create', 'update-delete']).isRequired,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    redirectionPath: PropTypes.string.isRequired
}

export default SectionCRUDButtons