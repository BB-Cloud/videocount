const fs = require('fs')
const path = require('path')
const util = require('util')
const open = util.promisify(fs.open)
const read = util.promisify(fs.read)
const timeUtil = require('./time');

// 获取buffer
async function getBuff(file) {
  const fd = await open(file, 'r')
  const buff = Buffer.alloc(100)
  const { buffer } = await read(fd, buff, 0, 100, 0)
  return buffer
}

// 判断是否符合mvhd
async function isMvhdFile(file) {
  const buffer = await getBuff(file);
  const aim = Buffer.from('mvhd');
  return buffer.includes(aim);
}

async function startCount (v) {
  let dir, files;
  if (/.mp4/.test(v) && (await isMvhdFile(v))) {
    // 输入一个视频的时候，需要绝对路径
    files = [].concat(path.resolve(v))
  } else {
    // 输入一个目录的时候
    dir = path.resolve(v)
    files = fs.readdirSync(dir).map(file => path.resolve(dir, file))
  }
  const videos = await Promise.all(
    files.map(async file => {
      const buf = await getBuff(file)
      const time = timeUtil.getTime(buf)
      return { file, time }
    })
  )
  const res = {
    '视频总数': videos.length,
    '视频总时长': timeUtil.getLocaleTime(
      videos.reduce((prev, e) => {
        return prev + e.time
      }, 0)
    )
  }
  
  return res
}

module.exports = startCount;