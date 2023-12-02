const Blockchain = require('./blockchain')
const Block = require('./block')


describe('Blockchain', () => {

    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain()

        originalChain = blockchain.chain;
    })

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

        describe('when the chain does not start with a genesis block', () => {
            it('return false', () => {
                blockchain.chain[0] = { data: 'fake-genesis' }
                expect(Blockchain.isBlockChainValid(blockchain.chain)).toBe(false)
            })
        })

        describe('when the chain start with genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data: 'testing-foo' })
                blockchain.addBlock({ data: 'testing-bar' })
                blockchain.addBlock({ data: 'testing-soap' })

            })

            describe('and the lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'changed-value'
                    expect(Blockchain.isBlockChainValid(blockchain.chain)).toBe(false)
                })
            })

            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'some-bad-data'
                    expect(Blockchain.isBlockChainValid(blockchain.chain)).toBe(false)
                })
            })

            describe('and the chain does not contain an invalid block', () => {
                it('returns true', () => {
                    expect(Blockchain.isBlockChainValid(blockchain.chain)).toBe(false)
                })
            })
        })

    });

    describe('replaceChain()', () => {
        let errorMock, logMock;

        beforeEach(() => {
            errorMock = jest.fn()
            logMock = jest.fn()

            global.console.error = errorMock
            global.console.log = logMock
        })

        describe('when the new chain is not longer', () => {
            beforeEach(()=>{
                newChain.chain[0] = { new: 'chain' }
                blockchain.replaceChain(newChain.chain)
            })

            it('does not replace the chain', () => {
                expect(blockchain.chain).toEqual(originalChain)
            })
            it('logs an error',()=>{
                expect(errorMock).toHaveBeenCalled()
            })
        })

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data: 'testing-foo' })
                newChain.addBlock({ data: 'testing-bar' })
                newChain.addBlock({ data: 'testing-soap' })

            })

            describe('and when the chain is invalid', () => {
                beforeEach(()=>{
                    newChain.chain[2].hash = 'some-fake-hash'
                    blockchain.replaceChain(newChain.chain)
                })

                it('does not replace chain', () => {
                    expect(blockchain.chain).toEqual(originalChain)
                })
                it('logs an error',()=>{
                    expect(errorMock).toHaveBeenCalled();
                    
                })
            })

            describe('and the chain is valid', () => {
                beforeEach(()=>{
                    blockchain.replaceChain(newChain.chain)
                })
                it('replaces the chain', () => {
                    expect(blockchain.chain).toEqual(originalChain)
                })

                
            })

        })
    })
})