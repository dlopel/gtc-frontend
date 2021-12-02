import Spin from '../spin.svg'
import PropTypes from 'prop-types'

function Loader({ height, width }) {
    return (
        <div>
            <img src={Spin} height={height} width={width} alt="Loading..." />
        </div>
    )
}

Loader.propTypes = {
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
}

export default Loader