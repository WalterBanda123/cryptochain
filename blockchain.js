const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class BlockChain {
    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        })
        this.chain.push(newBlock)
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error('The incoming chain should be longer');
            return;
        };
        if (!BlockChain.isBlockChainValid(chain)) {
            console.error('The incoming chain  should be valid');
            return
        }
        this.chain = chain
    }

    static isBlockChainValid(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, lastHash, hash, data } = chain[i]
            const actualLastBlockHash = chain[i - 1].hash;
            if (lastHash !== actualLastBlockHash) return false

            const validatedHash = cryptoHash(timestamp, lastHash, data);
            if (hash !== validatedHash) return false
        }


        return true
    }


}

module.exports = BlockChain;