import validator from 'validator'

export default function isIdValid(id) {
    return validator.isUUID(id || '', 4)
}