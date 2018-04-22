import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

const editor = ace.edit('editor');
editor.setTheme("ace/theme/monokai");
editor.setFontSize(16);
editor.setShowPrintMargin(false);
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setTabSize(2);
editor.getSession().setUseSoftTabs(true);
editor.focus();

export default editor;
