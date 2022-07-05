class Logger {
    log(line){
        console.log(line)
    }

    debug(line){
        console.debug(line)
    }
}

export const logger = new Logger()
