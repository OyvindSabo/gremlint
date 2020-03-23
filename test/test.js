const green = text => `\x1b[32m${text}\x1b[0m`;
const red = text => `\x1b[31m${text}\x1b[0m`;
const yellow = text => `\x1b[33m${text}\x1b[0m`;

/**
 *
 * @param {...{ title: string; assertions: { assertionDidPass: boolean; explanation: string }; assertionsRun: number; assertionsPassed: number, testDidPass }} tests
 */
const runTests = (...tests) => {
  const testsRun = tests.length;
  const testsPassed = tests.filter(({ testDidPass }) => testDidPass).length;
  tests.forEach(
    ({ title, assertions, assertionsRun, assertionsPassed, testDidPass }) => {
      console.log(
        '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log(title);
      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      assertions.forEach(({ assertionDidPass, explanation }) => {
        console.log(assertionDidPass ? green(explanation) : red(explanation));
      });
      const fractionOfAssertionsPassedDescription = `\n${assertionsPassed}/${assertionsRun} assertions passed`;
      console.log(
        testDidPass
          ? green(fractionOfAssertionsPassedDescription)
          : red(fractionOfAssertionsPassedDescription)
      );
    }
  );
  const fractionOfTestsPassedDescription = `${testsPassed}/${testsRun} tests passed`;
  const allTestsPassed = testsPassed === testsRun;
  const noTestsPassed = !testsPassed;
  console.log(
    '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  );
  console.log('Summary');
  console.log(
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  );
  console.log(
    allTestsPassed
      ? green(`All your tests passed:)\n${fractionOfTestsPassedDescription}`)
      : noTestsPassed
      ? red(`All your tests failed:(\n${fractionOfTestsPassedDescription}`)
      : yellow(
          `Some of your tests did not pass\n${fractionOfTestsPassedDescription}`
        )
  );
};

/**
 * @param {string} title
 * @param {...{ assertionDidPass: boolean; explanation: string }} assertions
 */
const test = (title, ...assertions) => {
  // For each test, first print the title
  const assertionsRun = assertions.length;
  const assertionsPassed = assertions.filter(
    ({ assertionDidPass }) => assertionDidPass
  ).length;
  return {
    title,
    assertions,
    assertionsRun,
    assertionsPassed,
    testDidPass: assertionsPassed === assertionsRun,
  };
};

/**
 * @param {any} expected
 * @param {any} actual
 * @returns {{ assertionDidPass: boolean; explanation: string }}
 */
const assertEquals = (expected, actual) => {
  const assertionDidPass = expected === actual;
  return {
    assertionDidPass,
    explanation: assertionDidPass
      ? 'Assertion passed'
      : `Assertion failed:\nExpected:\n${expected}\nActual:\n${actual}`,
  };
};

module.exports = {
  runTests,
  test,
  assertEquals,
};
