import validator from 'validator'
import isFileValid from '../libs/isFileValid'

export default class Policy {
    constructor(
        id,
        endorsement,
        dateStart,
        dateEnd,
        insuranceCarrier,
        insuranceCompany,
        netPremium,
        telephone,
        image,
        observation
    ) {
        this.id = id
        this.endorsement = endorsement
        this.dateStart = dateStart
        this.dateEnd = dateEnd
        this.insuranceCarrier = insuranceCarrier
        this.insuranceCompany = insuranceCompany
        this.netPremium = netPremium
        this.telephone = telephone
        this.image = image
        this.observation = observation
    }

    isValid() {
        if (!validator.isUUID(this.id || '', 4)) return false
        if (!validator.isAlphanumeric(this.endorsement || '', 'en-US', { ignore: '-' })) return false
        if (!validator.isLength(this.endorsement || '', { min: 3, max: 15 })) return false
        if (!validator.isDate(this.dateStart || '')) return false
        if (!validator.isDate(this.dateEnd || '')) return false
        if (!validator.matches(this.insuranceCarrier || '', /^[a-zA-Z ]{3,50}$/)) return false
        if (!validator.matches(this.insuranceCompany || '', /^[a-zA-Z ]{3,50}$/)) return false
        if (!validator.matches(this.netPremium, /^\d{1,7}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.telephone || '', /^\d{2}-\d{3}-\d{4}$/)) return false
        if (!isFileValid(this.image)) return false

        //if it is null, OK (optional fields)
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 1000 })) return false

        return true
    }

    static areIdAndObservationValid(id, observation) {
        if (!validator.isUUID(id || '', 4)) return false
        if (!validator.isLength(observation || 'FOO', { min: 3, max: 1000 })) return false
        return true
    }

    getFormData() {
        let formData = new FormData()
        formData.append('id', this.id)
        formData.append('endorsement', this.endorsement)
        formData.append('dateStart', this.dateStart)
        formData.append('dateEnd', this.dateEnd)
        formData.append('dniDateEnd', this.dniDateEnd)
        formData.append('insuranceCarrier', this.insuranceCarrier)
        formData.append('insuranceCompany', this.insuranceCompany)
        formData.append('netPremium', this.netPremium)
        formData.append('telephone', this.telephone)
        formData.append('image', this.image)
        formData.append('observation', this.observation)
        return formData
    }
}