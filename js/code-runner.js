/**
 * CODEX Library — JavaScript Lab (Code Runner)
 * IDE features: CodeMirror 6, Live Diagnostics, Interactive Console, Async Prompt
 */

const STORAGE_KEY = 'codex_lab_code';

const DEFAULT_CODE = `// Write your JavaScript here — use Run to execute!

let name = prompt("Enter your name:");
console.log("Hello, " + name + "!");

for (let i = 1; i <= 3; i++) {
  console.log("Count:", i);
}
`;

/* ─── State ──────────────────────────────────────────────────────────────── */
let editorView = null;
let currentDiagnostics = [];
let executionState = 'IDLE'; // IDLE, RUNNING, WAITING, STOPPED

/* ─── Initialise ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const btnRun   = document.getElementById('btn-run');
  const btnClear = document.getElementById('btn-clear');
  const btnReset = document.getElementById('btn-reset');
  const output   = document.getElementById('console-output');
  const sandbox  = document.getElementById('sandbox');

  if (window.CodexEditor) {
    initCodeMirror();
  } else {
    console.warn('[CODEX] CodexEditor bundle not found — using textarea fallback');
    initFallback();
  }

  /* ── Button handlers ──────────────────────────────────────────────────── */
  btnRun.addEventListener('click', () => {
    if (executionState === 'RUNNING' || executionState === 'WAITING') {
      stopExecution();
    } else {
      runCode(getCode());
    }
  });

  btnClear.addEventListener('click', () => {
    output.innerHTML = '';
  });

  btnReset.addEventListener('click', () => {
    if (confirm('Reset your code to the default example?')) {
      setCode(DEFAULT_CODE);
      localStorage.setItem(STORAGE_KEY, DEFAULT_CODE);
      output.innerHTML = '';
      stopExecution();
    }
  });

  /* ── Sandbox message handler ──────────────────────────────────────────── */
  window.addEventListener('message', (event) => {
    if (!event.data) return;
    
    switch (event.data.type) {
      case 'sandbox-log':
        appendOutput(event.data.args, event.data.level);
        break;
      case 'sandbox-error':
        appendError(event.data.message, event.data.line);
        break;
      case 'sandbox-clear':
        output.innerHTML = '';
        break;
      case 'sandbox-prompt':
        handlePromptRequest(event.data.id, event.data.message);
        break;
      case 'sandbox-end':
        if (executionState === 'RUNNING') setExecutionState('IDLE');
        break;
    }
  });

  // EXPOSE FOR TESTING
  window.setLabCode = setCode;
  window.getLabCode = getCode;
  window.runLabCode = () => runCode(getCode());
  window.stopLabCode = stopExecution;

  /* ── Execution State Management ───────────────────────────────────────── */
  function setExecutionState(state) {
    executionState = state;
    if (state === 'RUNNING' || state === 'WAITING') {
      btnRun.innerHTML = '⏹ Stop';
      btnRun.classList.remove('btn-primary');
      btnRun.classList.add('btn-danger');
    } else {
      btnRun.innerHTML = '▶ Run';
      btnRun.classList.remove('btn-danger');
      btnRun.classList.add('btn-primary');
    }
  }

  function stopExecution() {
    setExecutionState('STOPPED');
    sandbox.srcdoc = ''; // Kill the iframe
    removePromptUI();
    appendSystemMessage('Execution stopped.', 'system');
  }

  /* ── Output Formatting ────────────────────────────────────────────────── */
  function formatValue(val) {
    if (val === null) return '<span class="fmt-null">null</span>';
    if (val === undefined) return '<span class="fmt-undefined">undefined</span>';
    if (typeof val === 'boolean') return `<span class="fmt-boolean">${val}</span>`;
    if (typeof val === 'number') return `<span class="fmt-number">${val}</span>`;
    if (typeof val === 'string') return `<span class="fmt-string">"${escapeHtml(val)}"</span>`;
    
    if (Array.isArray(val)) {
      const items = val.map(v => {
        if (typeof v === 'string') return `"${escapeHtml(v)}"`;
        // recursively format without wrapping in spans for simplicity in arrays, or just use stringify
        return JSON.stringify(v);
      }).join(', ');
      return `[${items}]`;
    }
    
    if (typeof val === 'object') {
      try {
        return JSON.stringify(val, null, 2);
      } catch (e) {
        return String(val);
      }
    }
    return escapeHtml(String(val));
  }

  function appendOutput(args, level = 'log') {
    const div = document.createElement('div');
    div.className = `log-entry ${level}`;
    
    // If it's a string argument first, we don't wrap it in quotes for general logging to match browser console
    const formattedArgs = args.map((arg, idx) => {
      if (typeof arg === 'string' && args.length === 1) return escapeHtml(arg);
      if (typeof arg === 'string' && idx === 0) return escapeHtml(arg);
      return formatValue(arg);
    });

    div.innerHTML = formattedArgs.join(' ');
    output.appendChild(div);
    scrollToBottom();
  }

  function appendError(message, line) {
    const div = document.createElement('div');
    div.className = `log-entry error`;
    div.innerHTML = `<strong>Runtime Error</strong><br>${escapeHtml(message)}<br><span class="problem-loc">Line: ${line}</span>`;
    output.appendChild(div);
    scrollToBottom();
    setExecutionState('ERROR');
  }

  function appendSystemMessage(msg) {
    const div = document.createElement('div');
    div.className = `log-entry system`;
    div.textContent = msg;
    output.appendChild(div);
    scrollToBottom();
  }

  function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
  }

  /* ── Interactive Prompt Bridge ────────────────────────────────────────── */
  let currentPromptId = null;

  function handlePromptRequest(id, message) {
    setExecutionState('WAITING');
    currentPromptId = id;

    const div = document.createElement('div');
    div.className = 'prompt-container';
    div.id = 'active-prompt';
    
    div.innerHTML = `
      <div class="prompt-msg">${escapeHtml(message)}</div>
      <div class="prompt-input-wrapper">
        <span class="prompt-caret">&gt;</span>
        <input type="text" id="prompt-input" autocomplete="off" spellcheck="false" />
      </div>
    `;
    
    output.appendChild(div);
    scrollToBottom();
    
    const input = document.getElementById('prompt-input');
    input.focus();

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value;
        submitPrompt(id, val);
      }
    });
  }

  function submitPrompt(id, value) {
    if (id !== currentPromptId) return;
    
    const promptContainer = document.getElementById('active-prompt');
    if (promptContainer) {
      // Replace input with static text to keep in history
      promptContainer.innerHTML = `
        <div class="prompt-msg">${escapeHtml(promptContainer.querySelector('.prompt-msg').textContent)}</div>
        <div class="prompt-answered"><span class="prompt-caret">&gt;</span> <span class="fmt-string">"${escapeHtml(value)}"</span></div>
      `;
      promptContainer.id = '';
      promptContainer.classList.add('prompt-completed');
    }

    currentPromptId = null;
    setExecutionState('RUNNING');
    
    sandbox.contentWindow.postMessage({ type: 'prompt-reply', id: id, value: value }, '*');
  }

  function removePromptUI() {
    const promptContainer = document.getElementById('active-prompt');
    if (promptContainer) {
      promptContainer.remove();
    }
  }

  /* ── Execution ────────────────────────────────────────────────────────── */
  function getCode() {
    if (editorView) return editorView.state.doc.toString();
    return document.getElementById('code-editor-fallback')?.value ?? '';
  }

  function setCode(code) {
    if (editorView) {
      editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: code } });
    } else {
      const ta = document.getElementById('code-editor-fallback');
      if (ta) ta.value = code;
    }
  }

  function runCode(code) {
    output.innerHTML = '';
    removePromptUI();
    setExecutionState('RUNNING');
    
    // Source Transformation: replace prompt() with async bridge
    const transformedCode = code.replace(/\bprompt\s*\(/g, 'await window.__prompt(');

    // The body <script> wrapper adds exactly 2 lines before student code:
    //   Line 1: (async function() {
    //   Line 2:   try {
    //   Line 3+: student code starts here
    const wrapperOffset = 2;

    const html = `<!DOCTYPE html><html><head><script>
      let _errorSent = false;
      const _sendErr = (msg, line) => {
        if (_errorSent) return;
        _errorSent = true;
        window.parent.postMessage({ type: 'sandbox-error', message: msg, line: line }, '*');
      };
      function _send(level, args) {
        window.parent.postMessage({ type: 'sandbox-log', level, args: Array.from(args) }, '*');
      }
      console.log   = function() { _send('log',   arguments); };
      console.warn  = function() { _send('warn',  arguments); };
      console.error = function() { _send('error', arguments); };
      console.info  = function() { _send('info',  arguments); };
      console.clear = function() { window.parent.postMessage({ type: 'sandbox-clear' }, '*'); };
      let _promptCounter = 0;
      let _pendingPrompts = {};
      window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'prompt-reply') {
          const r = _pendingPrompts[e.data.id];
          if (r) { delete _pendingPrompts[e.data.id]; r(e.data.value); }
        }
      });
      window.__prompt = function(msg) {
        return new Promise(resolve => {
          const id = ++_promptCounter;
          _pendingPrompts[id] = resolve;
          window.parent.postMessage({ type: 'sandbox-prompt', id, message: msg || '' }, '*');
        });
      };
      window.addEventListener('unhandledrejection', (e) => {
        let msg = e.reason ? (e.reason.message || String(e.reason)) : 'Unhandled Promise Rejection';
        let line = '?';
        if (e.reason && e.reason.stack) {
          const m = e.reason.stack.match(/<anonymous>:(\\d+):/);
          if (m) line = Math.max(1, parseInt(m[1]) - ${wrapperOffset});
        }
        _sendErr(msg, line);
      });
    <\/script></head><body><script>
      (async function() {
        try {
          ${transformedCode}
        } catch(e) {
          let line = '?';
          if (e.stack) {
            const m = e.stack.match(/<anonymous>:(\\d+):/);
            if (m) line = Math.max(1, parseInt(m[1]) - ${wrapperOffset});
          }
          _sendErr(e.name + ': ' + e.message, line);
        } finally {
          window.parent.postMessage({ type: 'sandbox-end' }, '*');
        }
      })();
    <\/script></body></html>`;

    sandbox.srcdoc = html;
  }
});

/* ─── CodeMirror 6 Initialisation ────────────────────────────────────────── */
function initCodeMirror() {
  const {
    EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter,
    drawSelection, rectangularSelection, crosshairCursor,
    EditorState,
    defaultKeymap, history, historyKeymap, indentWithTab,
    searchKeymap, highlightSelectionMatches,
    javascript,
    syntaxHighlighting, indentOnInput, bracketMatching,
    closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap,
    lintGutter, linter, lintKeymap,
    acornParse,
    codexDarkTheme, codexHighlightStyle,
  } = window.CodexEditor;

  const jsLinter = linter((view) => {
    const code = view.state.doc.toString();
    const diagnostics = [];
    
    // Simulate our prompt transformation before linting so 'await window.__prompt' doesn't 
    // cause "await outside async function" errors when the student writes top-level prompt.
    // Acorn 'latest' supports top-level await in modules, so we just set sourceType: 'module'.
    try {
      // Actually we just parse the raw code. If they use top-level prompt, acorn might complain 
      // if it thinks it's a script without top-level await. sourceType: module fixes that.
      acornParse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    } catch (err) {
      const pos = err.pos ?? 0;
      const end = Math.min(pos + 1, code.length);
      diagnostics.push({
        from: pos,
        to: end,
        severity: 'error',
        message: err.message?.replace(/ \(\d+:\d+\)$/, '') ?? 'Syntax error',
      });
    }
    
    currentDiagnostics = diagnostics;
    updateProblemsPanel(view, diagnostics);
    return diagnostics;
  }, { delay: 400 });

  const savedCode = localStorage.getItem(STORAGE_KEY) ?? DEFAULT_CODE;

  const startState = EditorState.create({
    doc: savedCode,
    extensions: [
      codexDarkTheme,
      syntaxHighlighting(codexHighlightStyle),
      lineNumbers(),
      highlightActiveLineGutter(),
      lintGutter(),
      highlightActiveLine(),
      drawSelection(),
      bracketMatching(),
      highlightSelectionMatches(),
      history(),
      indentOnInput(),
      closeBrackets(),
      javascript({ jsx: false, typescript: false }),
      autocompletion({ override: [jsCompletions] }),
      jsLinter,
      keymap.of([
        indentWithTab,
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...completionKeymap,
        ...lintKeymap,
      ]),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) localStorage.setItem(STORAGE_KEY, update.state.doc.toString());
      }),
      EditorView.lineWrapping,
    ],
  });

  const editorContainer = document.getElementById('editor-container');
  editorView = new EditorView({ state: startState, parent: editorContainer });
}

/* ─── Problems Panel ─────────────────────────────────────────────────────── */
function updateProblemsPanel(view, diagnostics) {
  const list   = document.getElementById('problems-list');
  const badge  = document.getElementById('problem-count');
  if (!list || !badge) return;

  badge.textContent = diagnostics.length;
  badge.style.background = diagnostics.length > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.15)';
  badge.style.color = diagnostics.length > 0 ? 'var(--accent-crimson)' : 'var(--accent-emerald)';

  if (diagnostics.length === 0) {
    list.innerHTML = `<div class="problem-empty">✓ No problems detected</div>`;
    return;
  }

  list.innerHTML = diagnostics.map((d, i) => {
    const doc = view.state.doc;
    const line = doc.lineAt(d.from);
    return `
      <div class="problem-item" data-from="${d.from}" tabindex="0">
        <span class="problem-icon">❌</span>
        <span class="problem-msg">${escapeHtml(d.message)}</span>
        <span class="problem-loc">Line ${line.number}, Col ${d.from - line.from + 1}</span>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.problem-item').forEach(el => {
    const go = () => {
      const from = parseInt(el.dataset.from, 10);
      if (editorView && !isNaN(from)) {
        editorView.dispatch({ selection: { anchor: from }, scrollIntoView: true });
        editorView.focus();
      }
    };
    el.addEventListener('click', go);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') go(); });
  });
}

/* ─── Custom JS completions ──────────────────────────────────────────────── */
function jsCompletions(context) {
  const word = context.matchBefore(/\w*/);
  const before = context.state.doc.sliceString(0, context.pos);
  const isAfterDot = /\.\s*\w*$/.test(before);

  if (/console\.\w*$/.test(before)) {
    return {
      from: context.pos - (word?.text.length ?? 0),
      options: [
        { label: 'log', type: 'function' }, { label: 'warn', type: 'function' },
        { label: 'error', type: 'function' }, { label: 'info', type: 'function' },
        { label: 'clear', type: 'function' }, { label: 'table', type: 'function' }
      ]
    };
  }

  if (/Math\.\w*$/.test(before)) {
    return {
      from: context.pos - (word?.text.length ?? 0),
      options: [
        { label: 'abs', type: 'function' }, { label: 'round', type: 'function' },
        { label: 'floor', type: 'function' }, { label: 'ceil', type: 'function' },
        { label: 'random', type: 'function' }, { label: 'max', type: 'function' },
        { label: 'min', type: 'function' }, { label: 'sqrt', type: 'function' },
        { label: 'pow', type: 'function' }, { label: 'PI', type: 'constant' }
      ]
    };
  }

  if (!isAfterDot && word && (word.text.length >= 1 || context.explicit)) {
    return {
      from: word.from,
      options: [
        { label: 'let', type: 'keyword' }, { label: 'const', type: 'keyword' },
        { label: 'var', type: 'keyword' }, { label: 'function', type: 'keyword' },
        { label: 'if', type: 'keyword' }, { label: 'else', type: 'keyword' },
        { label: 'for', type: 'keyword' }, { label: 'while', type: 'keyword' },
        { label: 'return', type: 'keyword' }, { label: 'true', type: 'keyword' },
        { label: 'false', type: 'keyword' }, { label: 'null', type: 'keyword' },
        { label: 'undefined', type: 'keyword' },
        { label: 'console', type: 'variable' }, { label: 'Math', type: 'variable' },
        { label: 'Number', type: 'class' }, { label: 'String', type: 'class' },
        { label: 'Boolean', type: 'class' }, { label: 'Array', type: 'class' },
        { label: 'Object', type: 'class' }, { label: 'prompt', type: 'function' },
        { label: 'alert', type: 'function' }, { label: 'setTimeout', type: 'function' }
      ]
    };
  }
  return null;
}

/* ─── Fallback ───────────────────────────────────────────────────────────── */
function initFallback() {
  const container = document.getElementById('editor-container');
  container.innerHTML = `<textarea id="code-editor-fallback" spellcheck="false"></textarea>`;
  const ta = document.getElementById('code-editor-fallback');
  ta.value = localStorage.getItem(STORAGE_KEY) ?? DEFAULT_CODE;
  ta.addEventListener('input', () => localStorage.setItem(STORAGE_KEY, ta.value));
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
