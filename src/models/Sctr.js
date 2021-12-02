import validator from 'validator'
import isFileValid from '../libs/isFileValid'

export default class Sctr {
    constructor(
        id,
        pensionNumber,
        healthNumber,
        dateStart,
        dateEnd,
        insuranceCompany,
        observation,
        image
    ) {
        this.id = id
        this.pensionNumber = pensionNumber
        this.healthNumber = healthNumber
        this.dateStart = dateStart
        this.dateEnd = dateEnd
        this.insuranceCompany = insuranceCompany
        this.observation = observation
        this.image = image
    }

    isValid() {
        if (!validator.isUUID(this.id || '', 4)) return false
        if (!validator.isAlphanumeric(this.pensionNumber || '', 'en-US', { ignore: '-' })) return false
        if (!validator.isLength(this.pensionNumber || '', { min: 3, max: 15 })) return false
        if (!validator.isAlphanumeric(this.healthNumber || '', 'en-US', { ignore: '-' })) return false
        if (!validator.isLength(this.healthNumber || '', { min: 3, max: 15 })) return false
        if (!validator.isDate(this.dateStart || '')) return false
        if (!validator.isDate(this.dateEnd || '')) return false
        if (!validator.matches(this.insuranceCompany || '', /^[a-zA-Z ]{3,100}$/)) return false
        if (!isFileValid(this.image)) return false

        //if it is null, OK (optional fields)
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 1000 })) return false

        return true
    }

    static areObservationAndIdFieldValid(observation, id) {
        if (typeof observation !== 'string' && typeof id !== 'string') return false
        if (!validator.isUUID(id.trim() || '', 4)) return false
        if (!validator.isLength(observation.trim() || 'FOO', { min: 3, max: 1000 })) return false

        return true
    }

    getFormData() {
        let formData = new FormData()
        formData.append('id', this.id)
        formData.append('pensionNumber', this.pensionNumber)
        formData.append('healthNumber', this.healthNumber)
        formData.append('dateStart', this.dateStart)
        formData.append('dateEnd', this.dateEnd)
        formData.append('insuranceCompany', this.insuranceCompany)
        formData.append('image', this.image)
        formData.append('observation', this.observation)
        return formData
    }
}