import { buildPattern } from '../../compiler';
import { choiceOf } from '../choiceOf';

test('"choiceOf" component', () => {
  expect(buildPattern(choiceOf('a'))).toEqual('a');
  expect(buildPattern(choiceOf('a', 'b'))).toEqual('(?:a|b)');
  expect(buildPattern(choiceOf('a', 'b', 'c'))).toEqual('(?:a|b|c)');
});
