const Jimp = require('jimp');

const adjust = async (dir) => {
    await Jimp.read(dir)
        .then(async image => {
            await image
                .resize(250, 250)
                .writeAsync(dir)
        })
        .catch(() => {
            throw new Error()
        })
}

module.exports = adjust