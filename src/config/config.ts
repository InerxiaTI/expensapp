//const HOST = 'https://api.expenseapp.ritallus.com/expensemate-api'
const HOST = 'http://192.168.1.250:8080/expensemate-api'

const CONFIGS = {
    ENV: 'qa-rpi',
    EXPENSEMATE: {
        BASE_URL: `${HOST}`
    },
    REQUEST_TIMEOUT_MS: 5000
}

export default CONFIGS