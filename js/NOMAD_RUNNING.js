/* RUNNING TABLE JS*/
document.addEventListener('DOMContentLoaded', () => {
  fetch('runs.csv') // CSV file in same folder
    .then(response => response.text())
    .then(data => {
      const tableBody = document.querySelector('#runTable tbody');
      const tableContainer = document.getElementById('tableContainer');

      const rows = data.split('\n').slice(1).filter(row => row.trim()); // skip header

      // Add all rows to table
      rows.forEach(row => {
        const cols = row.split(',');
        const tr = document.createElement('tr');
        cols.forEach(col => {
          const td = document.createElement('td');
          td.textContent = col;
          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
      });

      // Scroll to show last 2 rows
      const rowHeight = tableBody.querySelector('tr')?.offsetHeight || 50;
      const visibleRows = 2;
      tableContainer.scrollTop = tableBody.scrollHeight - (rowHeight * visibleRows);
    })
    .catch(err => console.error('Error loading CSV:', err));
});


/* RUNNING GOALS JS */
document.addEventListener('DOMContentLoaded', () => {
  const goalsList = document.getElementById('goalsList');
  const goalInput = document.getElementById('goalInput');
  const addGoalBtn = document.getElementById('addGoalBtn');

  // Load saved goals from localStorage
  const savedGoals = JSON.parse(localStorage.getItem('runningGoals') || '[]');

  function renderGoals() {
    goalsList.innerHTML = '';
    savedGoals.forEach((goal, index) => {
      const li = document.createElement('li');
      li.textContent = goal;

      // Remove button for each goal
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✕';
      removeBtn.style.marginLeft = '10px';
      removeBtn.style.cursor = 'pointer';
      removeBtn.style.background = 'transparent';
      removeBtn.style.color = 'white';
      removeBtn.style.border = 'none';
      removeBtn.addEventListener('click', () => {
        savedGoals.splice(index, 1);
        localStorage.setItem('runningGoals', JSON.stringify(savedGoals));
        renderGoals();
      });

      li.appendChild(removeBtn);
      goalsList.appendChild(li);
    });
  }

  // Initial render
  renderGoals();

  // Add goal
  addGoalBtn.addEventListener('click', () => {
    const goalText = goalInput.value.trim();
    if (goalText) {
      savedGoals.push(goalText);
      localStorage.setItem('runningGoals', JSON.stringify(savedGoals));
      goalInput.value = '';
      renderGoals();
    }
  });

  // Enter key to add goal
  goalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addGoalBtn.click();
  });
});

/* Running Graph JS*/
// Ensure Chart.js is included in your HTML before this script
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  fetch('runs.csv')
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n').slice(1).filter(row => row.trim());

      // Parse CSV
      const runData = rows.map(row => {
        const cols = row.split(',');
        return {
          date: new Date(cols[0].trim()),
          distance: parseFloat(cols[1].trim())
        };
      });

      // Last 12 months
      const months = [];
      const labels = [];
      const today = new Date();

      for (let i = 11; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        months.push(d);

        // Format as DD/MM/YYYY
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        labels.push(`${day}/${month}/${year}`);
      }

      // Aggregate per month
      const monthlyDistances = months.map(monthStart => {
        const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
        return runData
          .filter(r => r.date >= monthStart && r.date <= monthEnd)
          .reduce((sum, r) => sum + r.distance, 0);
      });

      // Chart
      const ctx = document.getElementById('runDistanceChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Running Distance per Month (km)',
            data: monthlyDistances,
            fill: true,
            backgroundColor: 'rgba(0, 163, 166, 0.2)',
            borderColor: '#00a3a6',
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: 'Date:', color: 'white' },
              ticks: { color: 'white', maxTicksLimit: 12 },
              grid: {
                color: 'rgba(255, 255, 255, 0.08)' /* faint vertical lines */
              }
            },
            y: {
              title: { display: true, text: 'Distance (km)', color: 'white' },
              beginAtZero: true,
              ticks: { color: 'white' },
              grid: {
                color: 'rgba(255, 255, 255, 0.08)' /* faint horizontal lines */
              }
            }
          },
          plugins: {
            legend: {
              labels: { color: 'white' }
            },
            tooltip: {
              callbacks: {
                label: context => `${context.parsed.y} km`
              }
            }
          }
        }
      });
    })
    .catch(err => console.error('Error loading CSV for graph:', err));
});