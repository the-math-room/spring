export const updateStatus = (element, message, type = 'info') => {
    if (!element) return;
    element.innerText = message;
    element.className = type; // e.g., 'success', 'error', 'loading'
};

export const setButtonLoading = (btn, isLoading) => {
    btn.disabled = isLoading;
    btn.innerText = isLoading ? 'Saving...' : 'Submit Attempt';
};