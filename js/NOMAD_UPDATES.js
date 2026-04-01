// ===== Editable updates with fixed date =====
document.addEventListener('DOMContentLoaded', () => {
  const updatesContainer = document.getElementById('updatesContainer');
  const updatesDateEl = document.getElementById('updatesDate');
  const saveBtn = document.getElementById('saveUpdatesBtn');

  // Load previously saved content and date
  const savedContent = localStorage.getItem('updatesContent');
  const savedDate = localStorage.getItem('updatesDate');

  if (savedContent) {
    updatesContainer.innerHTML = savedContent;
  }

  if (savedDate) {
    updatesDateEl.textContent = savedDate; // fixed last-edited date
  } else {
    // First-time edit: set current date
    const now = new Date();
    const formattedDate = now.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    updatesDateEl.textContent = formattedDate;
  }

  // Make only the text editable, not the date
  updatesDateEl.setAttribute('contenteditable', 'false');

  // Save button handler
  saveBtn.addEventListener('click', () => {
    // Only save the text; the date is fixed
    const content = updatesContainer.innerHTML;
    localStorage.setItem('updatesContent', content);

    // If there is no saved date, store it now
    if (!savedDate) {
      const now = new Date();
      const formattedDate = now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      updatesDateEl.textContent = formattedDate;
      localStorage.setItem('updatesDate', formattedDate);
    }

    alert('Updates saved with fixed date!');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const updatesContainer = document.getElementById('updatesContainer');
  const lastUpdatedEl = document.getElementById('lastUpdatedTime');
  const saveBtn = document.getElementById('saveUpdatesBtn');

  // Load previously saved content and last-updated time
  const savedContent = localStorage.getItem('updatesContent');
  const savedTime = localStorage.getItem('updatesLastTime');

  if (savedContent) {
    updatesContainer.innerHTML = savedContent;
  }

  if (savedTime) {
    lastUpdatedEl.textContent = savedTime;
  }

  // Save button handler
  saveBtn.addEventListener('click', () => {
    const content = updatesContainer.innerHTML;
    localStorage.setItem('updatesContent', content);

    const now = new Date();
    const formattedDateTime = now.toLocaleString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    localStorage.setItem('updatesLastTime', formattedDateTime);
    lastUpdatedEl.textContent = formattedDateTime;

    alert('Updates saved!');
  });
});