export const PROBLEM_BANK = {
  1: [
    // Level 1: Same Base (Direct comparison)
    { latex: '2^x = 2^{10}', prompt: 'Solve for x.' },
    { latex: '5^x = 5^{-4}', prompt: 'Solve for x.' },
    { latex: '7^x = 7^1', prompt: 'Solve for x.' },
    {
      latex: '3^x = 3^{2x-5}',
      prompt: 'Solve for x. (Variable on both sides!)',
    },
    { latex: '10^x = 10^{-6}', prompt: 'Solve for x.' },
    { latex: '(\frac{1}{2})^x = (\frac{1}{2})^5', prompt: 'Solve for x.' },
    { latex: '6^{x+2} = 6^{11}', prompt: 'Solve for x.' },
  ],
  2: [
    // Level 2: Constant as Power (Requires rewriting the base)
    { latex: '2^x = 32', prompt: 'Rewrite 32 as 2 to a power, then solve.' },
    { latex: '3^x = 81', prompt: 'Solve for x.' },
    { latex: '5^x = 125', prompt: 'Solve for x.' },
    { latex: '10^x = 10,000', prompt: 'Solve for x.' },
    { latex: '4^x = 64', prompt: 'Solve for x.' },
    { latex: '2^x = \frac{1}{8}', prompt: 'Hint: Negative exponent!' },
    { latex: '9^x = 81', prompt: 'Solve for x.' },
    { latex: '7^x = 343', prompt: 'Solve for x.' },
  ],
};
