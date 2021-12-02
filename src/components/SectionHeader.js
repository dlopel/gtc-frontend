import React from 'react'
import PropTypes from 'prop-types'
import Loader from './Loader'
import './SectionHeader.css'

function SectionHeader({ title, isLoaderActive }) {
    return (
        <div className="section-header">
            <h2 className='section-header__title'>{title}</h2>
            <div className='section-header__right-content'>
                {isLoaderActive && <Loader height='32' width='32' />}
            </div>
        </div>
    )
}

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    isLoaderActive: PropTypes.bool.isRequired
}

export default SectionHeader