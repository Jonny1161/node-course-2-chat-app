var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generate location message', () => {
  it('should generate correct location object', () => {
      var from = 'Jon';
      var latitude = 38.869889;
      var longitude = -77.230834;

      var res = generateLocationMessage(from, latitude, longitude);

      expect(res.from).toBe(from);
      expect(typeof res.createdAt).toBe('number');
      expect(res.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`)
  });
});
