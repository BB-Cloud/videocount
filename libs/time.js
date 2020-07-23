const moment = require('moment')

const time = {
    getTime: (buffer) => {
        const start = buffer.indexOf(Buffer.from('mvhd')) + 17
        const timeScale = buffer.readUInt32BE(start)
        const duration = buffer.readUInt32BE(start + 4)
        const movieLength = Math.floor(duration / timeScale)
        return movieLength
    },
    getLocaleTime: (seconds) => {
        return moment
          .duration(seconds, 'seconds')
          .toJSON()
          .replace(/[PTHMS]/g, str => {
            switch (str) {
              case 'H': return '小时'
              case 'M': return '分钟'
              case 'S': return '秒'
              default: return ''
            }
          })
      }
};

module.exports = time;