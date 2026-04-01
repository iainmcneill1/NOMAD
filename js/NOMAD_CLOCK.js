document.addEventListener('DOMContentLoaded', () => {

  function getTime(timeZone, locale = 'en-US') {
    return new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date());
  }

  function updateWorldClocks() {
    const worldTimes = {
      londonTime: getTime('Europe/London', 'en-GB'),
      newyorkTime: getTime('America/New_York'),
      losangelesTime: getTime('America/Los_Angeles'),
      tokyoTime: getTime('Asia/Tokyo', 'ja-JP'),
      sydneyTime: getTime('Australia/Sydney', 'en-AU'),
      dubaiTime: getTime('Asia/Dubai'),
      singaporeTime: getTime('Asia/Singapore'),
      parisTime: getTime('Europe/Paris', 'fr-FR')
    };

    for (const id in worldTimes) {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = worldTimes[id];
      }
    }
  }

  updateWorldClocks();
  setInterval(updateWorldClocks, 1000);

});