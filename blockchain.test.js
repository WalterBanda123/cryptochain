const Blockchain = require('./blockchain')
const Block = require('./block')


describe('Blockchain', () => {
    const blockchain = new Blockchain();
    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true)
    })

    it('starts with a genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })

    it('adds a new block to the chain', () => {
        const newData = 'foo bar'
        blockchain.addBlock({ data: newData })
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
    })


    describe('isBlockChainValid()', () => {
        describe('when the block does not start with a genesis block', () => {

            it('return false', () => {

            })
        })

        describe('when the chain start with genesis block and has multiple blocks', () => {
            describe('and the lastHash refeence has changed', () => {
                it('returns false', () => { })
            })

            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => { })
            })
        })

    })
})