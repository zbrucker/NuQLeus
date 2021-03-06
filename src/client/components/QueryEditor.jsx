import * as React from 'react';
import { useContext } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { GraphContext } from '../contexts/GraphContext';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror-graphql/mode');
require('codemirror/mode/jsx/jsx');
require('codemirror-graphql/hint');
require('codemirror-graphql/lint');
require('codemirror/lib/codemirror.css');
require('../stylesheets/editor-theme.css');
require('codemirror/addon/edit/closebrackets');

const QueryEditor = () => {
  const [info, setInfo] = useContext(GraphContext);
  const DEFAULT_JSX_OPTIONS = {
    theme: 'custom-0',
    autoCloseBrackets: true,
    cursorScrollMargin: 48,
    mode: 'graphql',
    lineNumbers: true,
    indentUnit: 2,
    tabSize: 2,
    styleActiveLine: true,
    viewportMargin: 99,
    placeholder: 'Enter query or mutation'
  };
  const onChange = (editor, data, value) => {
    // this.setState({ value });
    setInfo(() => ({
      ...info,
      body: value,
    }));
  };

  return (
    <>
      <h4>Body</h4>
      <CodeMirror
        // name="js"
        value={info.body}
        options={DEFAULT_JSX_OPTIONS}
        onBeforeChange={onChange}
        onChange={(editor, metadata, value) => {
          // final value, no need to setState here
        }}
      />
    </>
  );
};

export default QueryEditor;
