export const updateStatus = (element, message, type = 'info') => {
  if (!element) return;
  element.innerText = message;
  element.className = type;
};

export const setButtonLoading = (btn, isLoading) => {
  if (!btn) return;
  btn.disabled = isLoading;
  btn.innerText = isLoading ? 'Saving...' : 'Submit Attempt';
};

export const addFeedItem = (listElement, data) => {
  if (!listElement) return;
  const li = document.createElement('li');
  const time = new Date(data.created_at).toLocaleTimeString();

  li.innerHTML = `<strong>${data.student_name}</strong> checked in at ${time}`;
  listElement.prepend(li);
};
