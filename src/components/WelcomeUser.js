import React from 'react'
import './WelcomeUser.css'
import PropTypes from 'prop-types'

function WelcomeUser(props) {
    return (
        <div className="welcome-user">
            <div className="welcome-user__user-image-container">
                <i className="fas fa-user-circle"></i>
            </div>
            <div>
                <span className="welcome-user__abbr-name">{props.abbrName}</span>
            </div>
        </div>
    )
}

WelcomeUser.propTypes = {
    abbrName: PropTypes.string.isRequired
}

export default WelcomeUser