function prepareQuote(data) {
  const name = String(data.name || '').trim();
  const items = String(data.items || '').trim();
  const city = String(data.city || '').trim();
  const access = String(data.access || '').trim();
  return [
    'Hi Load & Go! I would like a junk removal quote.',
    name ? 'Name: ' + name : '',
    'Items: ' + items,
    'City / ZIP: ' + city,
    data.date ? 'Preferred date: ' + data.date : '',
    access ? 'Access: ' + access : '',
    'I can attach photos of the items. Please confirm pricing and pickup availability.'
  ].filter(Boolean).join('\n');
}

if (typeof module !== 'undefined') module.exports = { prepareQuote };

if (typeof document !== 'undefined') {
  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const message = prepareQuote(data);
      const sendLink = document.getElementById('quote-sms');
      const isEmail = data.delivery === 'email';
      document.getElementById('quote-message').value = message;
      sendLink.href = isEmail
        ? 'mailto:loadandgojunkfl@gmail.com?subject=' + encodeURIComponent('Junk removal quote request') + '&body=' + encodeURIComponent(message)
        : 'sms:+13525042032?body=' + encodeURIComponent(message);
      sendLink.textContent = isEmail ? 'Open email app ↗' : 'Open text app ↗';
      document.getElementById('quote-result').hidden = false;
      document.getElementById('quote-status').textContent = 'Your message is ready. Open your app or copy it, then attach your photos.';
    });

    document.getElementById('copy-quote').addEventListener('click', async function () {
      const field = document.getElementById('quote-message');
      try {
        await navigator.clipboard.writeText(field.value);
        document.getElementById('quote-status').textContent = 'Copied. Add your photos when you text or email us.';
      } catch (_) {
        field.focus();
        field.select();
        document.getElementById('quote-status').textContent = 'Select and copy the message, then text or email it with your photos.';
      }
    });
  }
}
