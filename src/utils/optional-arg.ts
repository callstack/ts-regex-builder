/**
 * Re-arranges passed arguments to allow for optional first parameter.
 *
 * @param first first argument received by the function
 * @param second second argument received by the function
 *
 * @example
 *    function _capture(options: CaptureOptions, children: RegexElement[]): Capture {
 *      return {
 *        type: 'capture',
 *        options,
 *        children,
 *      };
 *    }
 *
 *    // Without `config``
 *    function capture(element: RegexElement | RegexElement[]): Capture
 *
 *    // With `config``
 *    function capture(config: CaptureConfig, element: RegexElement | RegexElement[]): Capture
 *
 *    function capture(first: any, second: any) {
 *      return _capture(...componentArgs(first, second));
 *    }
 *
 * @category Function
 */
export function optionalFirstArg(first: any, second?: any) {
  if (second === undefined) {
    return [{}, first] as const;
  }

  return [first, second] as const;
}
