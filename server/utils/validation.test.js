const expect = require('expect');

const {isRealString} = require('./validation');
// import isRealString

describe('is real string', () => {
  it('should reject non-string values', () => {
    var str = 12345;

    expect(isRealString(str)).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    var str = '      ';

    expect(isRealString(str)).toBe(false);
  })

  it('should allow strings with non-space characters', () => {
    var str = 'string';

    expect(isRealString(str)).toBe(true);
  })
});
// isRealString
  // should reject nonString values
  // should reject strings with only spaces
  // should allow strings with non-space characters
