import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const heightOfOneLine = 22;

  const [countRows, setCountRows] = useState(1);
  const [isTextMultipleLines, setIsTextMultipleLines] = useState(false);
  const [overflowStyleValue, setOverflow] = useState('hidden');
  const inputFieldTextAreaRef = useRef();

  function onChangeTextArea() {

  }

  function onEnterInputField(e) {
    setCountRows(4);
    setOverflow('visible');
    setIsTextMultipleLines(false);
  }

  function onLeaveInputField(e) {
    setCountRows(1);

    setOverflow('hidden');
    inputFieldTextAreaRef.current.scrollTop = 0;
  }

  useEffect(() => {
    if (countRows !== 1) return;
    
    if (inputFieldTextAreaRef.current.scrollHeight > heightOfOneLine) {
      setIsTextMultipleLines(true);
    } else {
      setIsTextMultipleLines(false);
    }
  }, [countRows]);


  return (
    <div className="App" style={{
      justifyContent: 'center',
      display: 'flex'
    }}>
      <div id="inputFieldTextAreaContainer" 
      onClick={ () => inputFieldTextAreaRef.current?.focus() }
      style={{
        maxWidth: '690px',
        width: '80%',
        border: '1px solid transparent',
        borderRadius: '24px',
        boxShadow: '0 2px 5px 1px rgba(64, 60, 67, .16)',
        marginTop: '20px',
        padding: '10px',
      }}>
        <textarea 
          type="text" 
          id="inputFieldTextArea"
          ref={inputFieldTextAreaRef}
          placeholder="Type here to search..." 
          rows={countRows}
          autoComplete="off"
          aria-expanded="false"
          onClick = {e => onEnterInputField(e)}
          onFocus = {(e) => onEnterInputField()}
          onChange = {(e) => onChangeTextArea(e.target.value)}
          onBlur = {(e) => onLeaveInputField(e)}
          style={{
            width: '95%',
            border: '1px solid transparent',
            overflow: overflowStyleValue,
            resize: 'none',
            outline: 'none',
            wordWrap: 'break-word',
            // wordBreak: 'break-all',
            font: '16px arial, sans-serif',
          }}
        />
        {isTextMultipleLines &&
          <div>...</div>
        }
      </div>
    </div>
  );
}

export default App;
