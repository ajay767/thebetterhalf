const chat = require('./chat');
// @ponicode
describe('chat', () => {
  test('0', () => {
    let result = chat(
      {
        use: () => 'Pierre Edouard',
        on: () => '2021-07-29T20:12:53.196Z',
        of: () => 100,
      },
      '£'
    );
    expect(result).toMatchSnapshot();
  });

  test('1', () => {
    let result = chat(
      {
        use: () => 'George',
        on: () => '2021-07-29T15:31:46.922Z',
        of: () => -100,
      },
      'B/.'
    );
    expect(result).toMatchSnapshot();
  });

  test('2', () => {
    let result = chat(
      {
        use: () => 'Jean-Philippe',
        on: () => '2021-07-29T23:03:48.812Z',
        of: () => 0,
      },
      'B/.'
    );
    expect(result).toMatchSnapshot();
  });

  test('3', () => {
    let result = chat(
      {
        use: () => 'Michael',
        on: () => '2021-07-29T17:54:41.653Z',
        of: () => 0,
      },
      'B/.'
    );
    expect(result).toMatchSnapshot();
  });

  test('4', () => {
    let result = chat(
      {
        use: () => 'Anas',
        on: () => '2021-07-30T00:05:36.818Z',
        of: () => -5.48,
      },
      'MT'
    );
    expect(result).toMatchSnapshot();
  });

  test('5', () => {
    let result = chat({ use: () => '', on: () => '', of: () => NaN }, '');
    expect(result).toMatchSnapshot();
  });
});
