import { hexColorFinder, hexColorValidator } from '..';

test('hexColorValidator', () => {
  expect(hexColorValidator).toMatchString('#ffffff');
  expect(hexColorValidator).toMatchString('#000');

  expect(hexColorValidator).not.toMatchString('#000 ');
  expect(hexColorValidator).not.toMatchString(' #000');
  expect(hexColorValidator).not.toMatchString('#0');
  expect(hexColorValidator).not.toMatchString('#11');
  expect(hexColorValidator).not.toMatchString('#4444');
  expect(hexColorValidator).not.toMatchString('#55555');
  expect(hexColorValidator).not.toMatchString('#7777777');
});

test('hexColorFinder', () => {
  expect(hexColorFinder).toMatchAllGroups('The color is #ffffff', [['#ffffff']]);
  expect(hexColorFinder).toMatchAllGroups('The colors are #1, #22, #333, #4444, #55555, #666666', [
    ['#333'],
    ['#666666'],
  ]);
});
