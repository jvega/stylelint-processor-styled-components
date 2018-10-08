const stylelint = require('stylelint')
const path = require('path')

const processor = path.join(__dirname, '../lib/index.js')

const rules = {
  'property-no-unknown': true
}

describe('files css', () => {
  let fixture
  let data

  // NOTE beforeEach() runs _after_ the beforeAll() hooks of the describe() blocks, so `fixture`
  // will have the right path
  beforeEach(done => {
    stylelint
      .lint({
        files: [fixture],
        config: {
          processors: [processor],
          rules
        }
      })
      .then(result => {
        data = result
        done()
      })
      .catch(err => {
        data = err
        done()
      })
  })

  describe('lint css files', () => {
    describe('valid', () => {
      beforeAll(() => {
        fixture = path.join(__dirname, './fixtures/css/valid.css')
      })
      it('should not have errored', () => {
        expect(data.errored).toEqual(false)
      })
    })
    describe('invalid', () => {
      beforeAll(() => {
        fixture = path.join(__dirname, './fixtures/css/invalid.css')
      })
      it('should not have errored', () => {
        expect(data.errored).toEqual(true)
      })
      it('should all be property-no-unknown warnings', () => {
        expect(data.results[0].warnings.length).toEqual(1)
        data.results[0].warnings.forEach(warning => {
          expect(warning.rule).toEqual('property-no-unknown')
        })
      })
    })
  })
})

describe('no files css', () => {
  let code
  let data
  // NOTE beforeEach() runs _after_ the beforeAll() hooks of the describe() blocks, so `code`
  // will have the right path
  beforeEach(done => {
    stylelint
      .lint({
        code,
        config: {
          processors: [processor],
          rules
        }
      })
      .then(result => {
        data = result
        done()
      })
      .catch(err => {
        data = err
        done()
      })
  })

  describe('lint css code', () => {
    describe('valid', () => {
      beforeAll(() => {
        code = '.selector{color:red;}'
      })
      it('should not have errored', () => {
        expect(data.errored).toEqual(false)
      })
    })
    describe('invalid', () => {
      beforeAll(() => {
        code = '.selector{colr:red;}'
      })
      it('should not have errored', () => {
        expect(data.errored).toEqual(true)
      })
      it('should all be property-no-unknown warnings', () => {
        expect(data.results[0].warnings.length).toEqual(1)
        data.results[0].warnings.forEach(warning => {
          expect(warning.rule).toEqual('property-no-unknown')
        })
      })
    })
  })
})
