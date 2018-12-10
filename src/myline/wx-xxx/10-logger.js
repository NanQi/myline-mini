const logger = wx.getLogManager()

wx.logger = {
    error(...param) {
        logger.log(...param)
        console.error(...param)
    },
    info(...param) {
        logger.info(...param)
        console.info(...param)
    },
    debug(...param) {
        logger.debug(...param)
        console.debug(...param)
    },
    warn(...param) {
        logger.warn(...param)
        console.warn(...param)
    }
}