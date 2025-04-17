import '@testing-library/jest-dom';

// This file is used to set up the testing environment
// You can add global test setup code here, such as:
// - Custom matchers
// - Global mocks
// - Test environment configuration

// Example of extending expect with custom matchers
// expect.extend({
//   toBeWithinRange(received, floor, ceiling) {
//     const pass = received >= floor && received <= ceiling;
//     if (pass) {
//       return {
//         message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
//         pass: true,
//       };
//     } else {
//       return {
//         message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
//         pass: false,
//       };
//     }
//   },
// });