export const updateStatus = (element, message, type = 'info') => {
  if (!element) return;
  element.innerText = message;
  element.className = type;
};

export const setButtonLoading = (btn, isLoading, loadingText = 'Saving...') => {
  if (!btn) return;

  if (isLoading) {
    // Store the original text so we can get it back later
    btn.dataset.originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = loadingText;
  } else {
    // Restore the original text (or fall back to a default)
    btn.disabled = false;
    btn.innerText = btn.dataset.originalText || 'Run Diagnostic';
  }
};

export const addFeedItem = (listElement, data) => {
  if (!listElement) return;
  const li = document.createElement('li');
  const time = new Date(data.created_at).toLocaleTimeString();
  li.innerHTML = `<strong>${data.student_name}</strong> checked in at ${time}`;
  listElement.prepend(li);
};
