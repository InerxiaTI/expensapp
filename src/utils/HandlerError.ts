
const LOGGER_ID = 'LOGF9'

const errorLog = (message: string, error?: any) => {
    console.info(LOGGER_ID, message, error);
}


const infoLog = (message: string, tag?: string) => {

    const TAG = tag || LOGGER_ID

    console.info(TAG, message);
}


export {
    infoLog,
    errorLog,
}