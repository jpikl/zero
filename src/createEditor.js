import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

export default function createEditor(element) {
  const editor = ace.edit(element);

  editor.setTheme('ace/theme/monokai');
  editor.setFontSize(16);
  editor.setShowPrintMargin(false);

  const session = editor.getSession();

  session.setMode('ace/mode/javascript');
  session.setTabSize(2);
  session.setUseSoftTabs(true);

  return editor;
}
