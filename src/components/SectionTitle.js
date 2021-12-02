import React from 'react'
import PropTypes from 'prop-types'
import './SectionTitle.css'

function SectionTitle(props) {
    return (
        <div className="section-title">
            <h2 className='section-title__h2'>{props.name}</h2>
        </div>
    )
}

SectionTitle.propTypes = {
    name: PropTypes.string.isRequired
}

export default SectionTitle