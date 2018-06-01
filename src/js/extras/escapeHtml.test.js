import escapeHtml from './escapeHtml';

describe('escapeHtml function', () => {
  it('should escape html characters', () => {
    const input = "z \" as&d / \n\r ' <script></script>";
    const output = escapeHtml(input);
    expect(output).toBe('z &quot; as&amp;d &#x2F; \n\r &#39; &lt;script&gt;&lt;&#x2F;script&gt;');
  });
});
