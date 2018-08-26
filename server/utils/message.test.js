var expect = require('expect');

var {generateMessage} = require('./message');

describe('generate message', () => {
  it('should generate the correct message object', () => {
    var from = 'Jon';
    var text = 'This is a test message';

    var res = generateMessage(from, text);

    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(typeof res.createdAt).toBe('number');
  });
});
