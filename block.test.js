const Block = require("./block");
const { GENESIS_BLOCK } = require("./config");
const cryptoHash = require("./crypto-hash");

describe('Block', () => {
    const timeStamp = 'a-date';
    const lastHash = 'last-hash';
    const data = ['data 1', 'data 2'];
    const hash = 'my-hash'
    const block = new Block({ timeStamp, lastHash, data, hash })

    it('has a timeStamp , lastHash, data, and hash property', () => {
        expect(block.timeStamp).toEqual(timeStamp)
        expect(block.lastHash).toEqual(lastHash)
        expect(block.data).toEqual(data)
        expect(block.hash).toEqual(hash)
    })

    describe('genesis()', () => {
        const genesisBlock = Block.genesis()

        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true)
        })

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_BLOCK)
        })
    })

    describe('mineBlock', () => {
        const lastBlock = Block.genesis();
        const data = 'mined-data';
        const minedBlock = Block.mineBlock({ lastBlock, data })

        it('returns a block instance', () => {
            expect(minedBlock instanceof Block).toBe(true)
        })

        it('sets the `lasthash` to be the `hash` of the lastblock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash)
        })

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        })

        it('sets a `timeStamp`', () => {
            expect(minedBlock.timeStamp).not.toEqual(undefined)
        })

        it('creates a SH-256 `hash` based on  the proper inputs', () => {
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timeStamp, lastBlock.hash, data))
        })
    })
})
