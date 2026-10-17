function prepareQuote(data) {
  return [
    'Hi Load & Go! I would like a junk removal quote.',
    'Items: ' + data.items.trim(),
    'City / ZIP: ' + data.city.trim(),
    data.date ? 'Preferred date: ' + data.date : '',
    data.access.trim() ? 'Access: ' + data.access.trim() : '',
    'I can attach photos of the items. Please confirm pricing and pickup availability.'
  ].filter(Boolean).join('\n');
}
if (typeof module !== 'undefined') module.exports = { prepareQuote };
if (typeof document !== 'undefined') {
  const form = document.getElementById('quote-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const message = prepareQuote(data);
    document.getElementById('quote-message').value = message;
    document.getElementById('quote-sms').href = 'sms:+13525042032?body=' + encodeURIComponent(message);
    document.getElementById('quote-result').hidden = false;
    document.getElementById('quote-status').textContent = 'Your message is ready. Open your text app or copy it below, then attach photos.';
  });
  document.getElementById('copy-quote').addEventListener('click', async function () {
    const field = document.getElementById('quote-message');
    try {
      await navigator.clipboard.writeText(field.value);
      document.getElementById('quote-status').textContent = 'Copied. Text this message and your photos to (352) 504-2032.';
    } catch (_) {
      field.focus();
      field.select();
      document.getElementById('quote-status').textContent = 'Select and copy the message below, then text it to (352) 504-2032.';
    }
  });
}
