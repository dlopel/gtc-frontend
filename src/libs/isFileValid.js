import { validFileType } from '../config'

const isFileValid = (file) => {
    if (file.type === validFileType.mime && file.size <= validFileType.size) {
        return true
    } else {
        return false
    }
}

export default isFileValid