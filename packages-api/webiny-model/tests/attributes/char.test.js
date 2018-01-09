import {assert} from 'chai';
const Model = require('./../../src/model');
const ModelError = require('./../../src/modelError');

const model = new Model(function () {
    this.attr('attribute').char();
});

describe('attribute char test', function () {
    it('should accept string values', () => {
        model.attribute = 'some string';
        assert.equal(model.attribute, 'some string');

        model.attribute = 'some string 2';
        assert.equal(model.attribute, 'some string 2');
    });

    [123, 0, 0.5, {}, [], undefined, null, false].forEach(value => {
        it(`shouldn\'t accept ${typeof value}`, async () => {
            let error = null;
            try {
                model.attribute = value;
                await model.validate();
            } catch (e) {
                error = e;
            }

            assert.instanceOf(error, ModelError);
            assert.equal(error.getType(), ModelError.INVALID_ATTRIBUTES);
        });
    });

    it('should be able to assign new values by concatenation', () => {
        model.attribute = 'this ';
        assert.equal(model.attribute, 'this ');

        model.attribute = 'this ' + 'should ';
        assert.equal(model.attribute, 'this should ');

        model.attribute += 'work';
        assert.equal(model.attribute, 'this should work');
    });
});