const charMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
};

const escapeHtml = textToEscape => String(textToEscape).replace(/[&<>"'/]/g, s => charMap[s]);

export default escapeHtml;
