import { describe, it, expect, beforeEach } from 'vitest';
import { updateStatus, setButtonLoading } from './ui.js';

describe('ui.js service', () => {
  let mockButton;
  let mockOutput;

  beforeEach(() => {
    // Create fresh "fake" elements before each test
    document.body.innerHTML = `
            <button id="testBtn">Submit Attempt</button>
            <div id="output"></div>
        `;
    mockButton = document.getElementById('testBtn');
    mockOutput = document.getElementById('output');
  });

  it('updates status text and adds the correct class', () => {
    updateStatus(mockOutput, 'Success!', 'success');

    expect(mockOutput.innerText).toBe('Success!');
    expect(mockOutput.className).toBe('success');
  });

  it('correctly toggles the loading state of the button', () => {
    setButtonLoading(mockButton, true);

    expect(mockButton.disabled).toBe(true);
    expect(mockButton.innerText).toBe('Saving...');

    setButtonLoading(mockButton, false);
    expect(mockButton.disabled).toBe(false);
    expect(mockButton.innerText).toBe('Submit Attempt');
  });
});
