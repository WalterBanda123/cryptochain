const { GENESIS_BLOCK } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {
    constructor({ timeStamp, lastHash, data, hash }) {
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.data = data
        this.hash = hash;
    }

    static genesis() {
        return new this(GENESIS_BLOCK)
    }

    static mineBlock({ lastBlock, data }) {
        const timeStamp = Date.now()
        const lastHash = lastBlock.hash
        return new this(
            {
                timeStamp,
                lastHash,
                data,
                hash: cryptoHash(timeStamp, lastHash, data)
            })
    }
}

module.exports = Block

