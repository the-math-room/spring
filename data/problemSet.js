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
    { latex: '(\\frac{1}{2})^x = (\\frac{1}{2})^5', prompt: 'Solve for x.' },
    { latex: '6^{x+2} = 6^{11}', prompt: 'Solve for x.' },
  ],
  2: [
    // Level 2: Constant as Power (Requires rewriting the base)
    { latex: '2^x = 32', prompt: 'Rewrite 32 as 2 to a power, then solve.' },
    { latex: '3^x = 81', prompt: 'Solve for x.' },
    { latex: '5^x = 125', prompt: 'Solve for x.' },
    { latex: '10^x = 10,000', prompt: 'Solve for x.' },
    { latex: '4^x = 64', prompt: 'Solve for x.' },
    { latex: '2^x = \\frac{1}{8}', prompt: 'Hint: Negative exponent!' },
    { latex: '9^x = 81', prompt: 'Solve for x.' },
    { latex: '7^x = 343', prompt: 'Solve for x.' },
  ],

  3: [
    { latex: '3^{3x + 4} = 3^{2x + 9}', prompt: 'Solve for x.' },
    { latex: '5^{5x - 2} = 5^{3x + 10}', prompt: 'Solve for x.' },
    { latex: '2^{4x + 1} = 2^{x + 13}', prompt: 'Solve for x.' },
    { latex: '10^{6x - 5} = 10^{4x + 7}', prompt: 'Solve for x.' },
    { latex: '7^{2x + 15} = 7^{5x + 3}', prompt: 'Solve for x.' },
    { latex: '4^{8x - 10} = 4^{3x + 15}', prompt: 'Solve for x.' },
    { latex: '6^{7x + 2} = 6^{4x + 20}', prompt: 'Solve for x.' },
    { latex: '11^{x + 18} = 11^{3x + 2}', prompt: 'Solve for x.' },
    { latex: '9^{5x - 1} = 9^{2x + 14}', prompt: 'Solve for x.' },
    { latex: '12^{4x + 6} = 12^{2x + 18}', prompt: 'Solve for x.' },
    {
      latex:
        '\\left(\\frac{1}{2}\\right)^{6x + 2} = \\left(\\frac{1}{2}\\right)^{4x + 10}',
      prompt: 'Solve for x.',
    },
    { latex: '8^{3x - 7} = 8^{x + 11}', prompt: 'Solve for x.' },
    { latex: '15^{5x + 5} = 15^{2x + 26}', prompt: 'Solve for x.' },
    { latex: '13^{7x - 4} = 13^{3x + 12}', prompt: 'Solve for x.' },
    { latex: '20^{2x + 20} = 20^{6x + 4}', prompt: 'Solve for x.' },
    {
      latex:
        '\\left(\\frac{3}{4}\\right)^{4x - 2} = \\left(\\frac{3}{4}\\right)^{x + 13}',
      prompt: 'Solve for x.',
    },
    { latex: '17^{8x + 1} = 17^{5x + 19}', prompt: 'Solve for x.' },
    { latex: '14^{2x + 14} = 14^{x + 20}', prompt: 'Solve for x.' },
    { latex: '25^{3x - 5} = 25^{x + 15}', prompt: 'Solve for x.' },
    { latex: '18^{6x + 4} = 18^{2x + 28}', prompt: 'Solve for x.' },
    { latex: '0.4^{5x - 3} = 0.4^{2x + 12}', prompt: 'Solve for x.' },
    { latex: '16^{7x + 3} = 16^{4x + 21}', prompt: 'Solve for x.' },
    { latex: '21^{4x - 10} = 21^{2x + 10}', prompt: 'Solve for x.' },
    { latex: '22^{x + 30} = 22^{6x + 5}', prompt: 'Solve for x.' },
    { latex: '19^{3x + 11} = 19^{x + 25}', prompt: 'Solve for x.' },
    {
      latex:
        '\\left(\\frac{1}{5}\\right)^{8x - 4} = \\left(\\frac{1}{5}\\right)^{3x + 21}',
      prompt: 'Solve for x.',
    },
    { latex: '30^{5x + 6} = 30^{3x + 24}', prompt: 'Solve for x.' },
    { latex: '24^{2x + 17} = 24^{x + 25}', prompt: 'Solve for x.' },
    { latex: '27^{6x - 8} = 27^{4x + 12}', prompt: 'Solve for x.' },
    { latex: '100^{4x + 100} = 100^{9x + 50}', prompt: 'Solve for x.' },
  ],

  4: [
    { latex: '4^x = 8^2', prompt: 'Solve for x.' },
    { latex: '27^2 = 9^x', prompt: 'Solve for x.' },
    { latex: '125^x = 25^3', prompt: 'Solve for x.' },
    { latex: '16^3 = 64^x', prompt: 'Solve for x.' },
    { latex: '8^4 = 4^x', prompt: 'Solve for x.' },
    { latex: '9^3 = 27^x', prompt: 'Solve for x.' },
    { latex: '25^x = 125^2', prompt: 'Solve for x.' },
    { latex: '64^2 = 16^x', prompt: 'Solve for x.' },
    { latex: '4^{x+1} = 8^2', prompt: 'Solve for x.' },
    { latex: '27^x = 9^6', prompt: 'Solve for x.' },
    { latex: '125^4 = 25^x', prompt: 'Solve for x.' },
    { latex: '16^x = 64^2', prompt: 'Solve for x.' },
    { latex: '8^2 = 4^x', prompt: 'Solve for x.' },
    { latex: '9^x = 27^2', prompt: 'Solve for x.' },
    { latex: '25^3 = 125^x', prompt: 'Solve for x.' },
    { latex: '64^x = 16^6', prompt: 'Solve for x.' },
    { latex: '4^6 = 8^x', prompt: 'Solve for x.' },
    { latex: '27^4 = 9^x', prompt: 'Solve for x.' },
    { latex: '125^x = 25^6', prompt: 'Solve for x.' },
    { latex: '16^6 = 64^x', prompt: 'Solve for x.' },
    { latex: '8^{x-1} = 4^3', prompt: 'Solve for x.' },
    { latex: '9^x = 27^4', prompt: 'Solve for x.' },
    { latex: '25^x = 125^4', prompt: 'Solve for x.' },
    { latex: '64^4 = 16^x', prompt: 'Solve for x.' },
    { latex: '4^x = 8^4', prompt: 'Solve for x.' },
    { latex: '27^2 = 9^{x+1}', prompt: 'Solve for x.' },
    { latex: '125^2 = 25^x', prompt: 'Solve for x.' },
    { latex: '16^x = 64^4', prompt: 'Solve for x.' },
    { latex: '8^x = 4^9', prompt: 'Solve for x.' },
    { latex: '9^9 = 27^x', prompt: 'Solve for x.' },
  ],

  5: [
    { latex: '4^{x+1} = 8^2', prompt: 'Solve for x.' },
    { latex: '27^2 = 9^{x+1}', prompt: 'Solve for x.' },
    { latex: '125^{x+1} = 25^6', prompt: 'Solve for x.' },
    { latex: '16^{x+3} = 64^4', prompt: 'Solve for x.' },
    { latex: '8^{x+4} = 4^9', prompt: 'Solve for x.' },
    { latex: '9^6 = 27^{x+2}', prompt: 'Solve for x.' },
    { latex: '25^{x+2} = 125^2', prompt: 'Solve for x.' },
    { latex: '64^2 = 16^{x+1}', prompt: 'Solve for x.' },
    { latex: '4^{x+4} = 8^4', prompt: 'Solve for x.' },
    { latex: '27^{x+1} = 9^6', prompt: 'Solve for x.' },
    { latex: '125^2 = 25^{x+1}', prompt: 'Solve for x.' },
    { latex: '16^{x+1} = 64^2', prompt: 'Solve for x.' },
    { latex: '8^{x+1} = 4^6', prompt: 'Solve for x.' },
    { latex: '9^{x+4} = 27^4', prompt: 'Solve for x.' },
    { latex: '25^{x+1} = 125^2', prompt: 'Solve for x.' },
    { latex: '64^{x+1} = 16^6', prompt: 'Solve for x.' },
    { latex: '4^{x+2} = 8^4', prompt: 'Solve for x.' },
    { latex: '27^{x+2} = 9^9', prompt: 'Solve for x.' },
    { latex: '125^{x+2} = 25^9', prompt: 'Solve for x.' },
    { latex: '16^{x+5} = 64^4', prompt: 'Solve for x.' },
    { latex: '8^{x+2} = 4^6', prompt: 'Solve for x.' },
    { latex: '9^{x+1} = 27^2', prompt: 'Solve for x.' },
    { latex: '25^{x+3} = 125^4', prompt: 'Solve for x.' },
    { latex: '64^{x+2} = 16^6', prompt: 'Solve for x.' },
    { latex: '4^{x+5} = 8^4', prompt: 'Solve for x.' },
    { latex: '27^{x+4} = 9^{12}', prompt: 'Solve for x.' },
    { latex: '125^{x+1} = 25^3', prompt: 'Solve for x.' },
    { latex: '16^{x+2} = 64^2', prompt: 'Solve for x.' },
    { latex: '8^{x+7} = 4^{12}', prompt: 'Solve for x.' },
    { latex: '9^{x+5} = 27^4', prompt: 'Solve for x.' },
  ],

  6: [
    {
      latex: '\\left(\\frac{1}{4}\\right)^x = \\left(\\frac{1}{8}\\right)^2',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{27}\\right)^2 = \\left(\\frac{1}{9}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{125}\\right)^x = \\left(\\frac{1}{25}\\right)^3',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{16}\\right)^3 = \\left(\\frac{1}{64}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{8}\\right)^4 = \\left(\\frac{1}{4}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{9}\\right)^3 = \\left(\\frac{1}{27}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{25}\\right)^x = \\left(\\frac{1}{125}\\right)^2',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{64}\\right)^2 = \\left(\\frac{1}{16}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{4}\\right)^x = \\left(\\frac{1}{8}\\right)^4',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{27}\\right)^x = \\left(\\frac{1}{9}\\right)^6',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{125}\\right)^2 = \\left(\\frac{1}{25}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{16}\\right)^x = \\left(\\frac{1}{64}\\right)^2',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{8}\\right)^2 = \\left(\\frac{1}{4}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{9}\\right)^x = \\left(\\frac{1}{27}\\right)^2',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{25}\\right)^3 = \\left(\\frac{1}{125}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{64}\\right)^x = \\left(\\frac{1}{16}\\right)^3',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{4}\\right)^6 = \\left(\\frac{1}{8}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{27}\\right)^4 = \\left(\\frac{1}{9}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{125}\\right)^x = \\left(\\frac{1}{25}\\right)^6',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{16}\\right)^6 = \\left(\\frac{1}{64}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{8}\\right)^x = \\left(\\frac{1}{4}\\right)^3',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{9}\\right)^x = \\left(\\frac{1}{27}\\right)^4',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{25}\\right)^x = \\left(\\frac{1}{125}\\right)^4',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{64}\\right)^4 = \\left(\\frac{1}{16}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{4}\\right)^x = \\left(\\frac{1}{8}\\right)^6',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{27}\\right)^2 = \\left(\\frac{1}{9}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{125}\\right)^2 = \\left(\\frac{1}{25}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{16}\\right)^x = \\left(\\frac{1}{64}\\right)^4',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{8}\\right)^x = \\left(\\frac{1}{4}\\right)^9',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{9}\\right)^9 = \\left(\\frac{1}{27}\\right)^x',
      prompt: 'Solve for x.',
    },
  ],

  7: [
    {
      latex: '\\left(\\frac{4}{9}\\right)^x = \\left(\\frac{8}{27}\\right)^2',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{8}{27}\\right)^x = \\left(\\frac{4}{9}\\right)^3',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{4}\\right)^x = \\left(\\frac{1}{8}\\right)^4',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{8}\\right)^x = \\left(\\frac{1}{4}\\right)^6',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{4}{25}\\right)^x = \\left(\\frac{8}{125}\\right)^2',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{8}{125}\\right)^x = \\left(\\frac{4}{25}\\right)^3',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{9}\\right)^x = \\left(\\frac{1}{27}\\right)^2',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{27}\\right)^x = \\left(\\frac{1}{9}\\right)^3',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{4}{49}\\right)^x = \\left(\\frac{8}{343}\\right)^2',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{8}{343}\\right)^x = \\left(\\frac{4}{49}\\right)^3',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{4}{9}\\right)^x = \\left(\\frac{8}{27}\\right)^4',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{8}{27}\\right)^x = \\left(\\frac{4}{9}\\right)^6',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{4}\\right)^x = \\left(\\frac{1}{8}\\right)^6',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{8}\\right)^x = \\left(\\frac{1}{4}\\right)^9',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{4}{25}\\right)^x = \\left(\\frac{8}{125}\\right)^4',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{8}{125}\\right)^x = \\left(\\frac{4}{25}\\right)^6',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{9}\\right)^x = \\left(\\frac{1}{27}\\right)^4',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{27}\\right)^x = \\left(\\frac{1}{9}\\right)^6',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{4}{81}\\right)^x = \\left(\\frac{8}{729}\\right)^2',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{8}{729}\\right)^x = \\left(\\frac{4}{81}\\right)^3',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{4}{9}\\right)^3 = \\left(\\frac{8}{27}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{8}{27}\\right)^4 = \\left(\\frac{4}{9}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{4}\\right)^9 = \\left(\\frac{1}{8}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{8}\\right)^{10} = \\left(\\frac{1}{4}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{4}{25}\\right)^9 = \\left(\\frac{8}{125}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{8}{125}\\right)^2 = \\left(\\frac{4}{25}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{9}\\right)^9 = \\left(\\frac{1}{27}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{1}{27}\\right)^4 = \\left(\\frac{1}{9}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{4}{49}\\right)^6 = \\left(\\frac{8}{343}\\right)^x',
      prompt: 'Solve for x.',
    },
    {
      latex: '\\left(\\frac{8}{343}\\right)^6 = \\left(\\frac{4}{49}\\right)^x',
      prompt: 'Solve for x.',
    },
  ],
};
