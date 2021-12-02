let API_URL = ''

switch (process.env.NODE_ENV) {
    case 'production':
        API_URL = 'http://localhost:4000/api/v1'
        break
    case 'test':
        API_URL = 'http://localhost:4000/api/v1'
        break
    case 'development':
        API_URL = 'http://localhost:4000/api/v1'
        break
    default:
        break
}

export { API_URL }

export const validFileType = { mime: 'application/pdf', size: 1000000 }
