
const LOGGER_ID = 'LOGF9'

const errorLog = (message: string, error?: any) => {

    console.error(LOGGER_ID, message, error);
}


const infoLog = (message: string) => {

    console.info(LOGGER_ID, message);
}


export {
    infoLog,
    errorLog
}