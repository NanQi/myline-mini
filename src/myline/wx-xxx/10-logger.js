const logger = wx.getLogManager()

wx.logger = {
    error(...param) {
        console.error(...param)
        logger.log(...param)
    },
    info(...param) {
        console.info(...param)
        logger.info(...param)
    },
    debug(...param) {
        console.debug(...param)
        logger.debug(...param)
    },
    warn(...param) {
        console.warn(...param)
        logger.warn(...param)
    }
}