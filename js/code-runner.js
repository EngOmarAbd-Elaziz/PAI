/**
 * CODEX Library — Web Compiler (HTML + CSS + JavaScript Lab)
 * IDE features: CodeMirror 6, Live Diagnostics, Interactive Console, Async Prompt, Live Preview
 */

const STORAGE_KEY_JS = 'codex_lab_code_js';
const STORAGE_KEY_HTML = 'codex_lab_code_html';
const STORAGE_KEY_CSS = 'codex_lab_code_css';
const LEGACY_STORAGE_KEY = 'codex_lab_code';

const DEFAULT_CODE_JS = `// Write your JavaScript here — use Run to execute!

let name = prompt("Enter your name:");
console.log("Hello, " + name + "!");

for (let i = 1; i <= 3; i++) {
  console.log("Count:", i);
}
`;

const DEFAULT_CODE_HTML = ``;
const DEFAULT_CODE_CSS = ``;

/* ─── State ──────────────────────────────────────────────────────────────── */
let editorViews = { html: null, css: null, js: null };
let editorView = null; // Backwards compatibility for single editorView reference
let currentLang = 'js';
let currentDiagnostics = [];
let executionState = 'IDLE'; // IDLE, RUNNING, WAITING, STOPPED

/* ─── Helper: check if code is truly empty (ignoring whitespace & comments) ─── */
function isCodeEmpty(code, lang) {
  if (!code) return true;
  const trimmed = code.trim();
  if (trimmed === '') return true;
  if (lang === 'html') {
    return trimmed.replace(/<!--[\s\S]*?-->/g, '').trim() === '';
  }
  if (lang === 'css') {
    return trimmed.replace(/\/\*[\s\S]*?\*\//g, '').trim() === '';
  }
  if (lang === 'js') {
    return trimmed.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim() === '';
  }
  return false;
}

/* ─── Initialise ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const btnRun   = document.getElementById('btn-run');
  const btnClear = document.getElementById('btn-clear');
  const btnReset = document.getElementById('btn-reset');
  const output   = document.getElementById('console-output');
  let sandbox    = document.getElementById('sandbox');

  /* ── Tab setup ────────────────────────────────────────────────────────── */
  const tabs = document.querySelectorAll('.editor-tab');
  function switchTab(lang) {
    currentLang = lang;
    tabs.forEach(t => {
      if (t.getAttribute('data-lang') === lang) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    ['html', 'css', 'js'].forEach(l => {
      const el = document.getElementById(`editor-container-${l}`);
      if (el) el.style.display = (l === lang) ? 'block' : 'none';
    });

    if (editorViews[lang]) {
      if (typeof editorViews[lang].requestMeasure === 'function') {
        editorViews[lang].requestMeasure();
      }
      editorViews[lang].focus();
    }
  }
  window.switchTab = switchTab;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.getAttribute('data-lang'));
    });
  });

  /* ── Output Mode Toggle ────────────────────────────────────────────────── */
  const outputModeToggle = document.getElementById('output-mode-toggle');
  const btnViewPreview   = document.getElementById('btn-view-preview');
  const btnViewConsole   = document.getElementById('btn-view-console');

  function setOutputView(view) {
    const currentSandbox = document.getElementById('sandbox');
    if (view === 'preview') {
      if (currentSandbox) currentSandbox.style.display = 'block';
      output.style.display = 'none';
      btnViewPreview?.classList.add('active');
      btnViewConsole?.classList.remove('active');
    } else {
      if (currentSandbox) currentSandbox.style.display = 'none';
      output.style.display = 'block';
      btnViewConsole?.classList.add('active');
      btnViewPreview?.classList.remove('active');
    }
  }
  window.setOutputView = setOutputView;

  btnViewPreview?.addEventListener('click', () => setOutputView('preview'));
  btnViewConsole?.addEventListener('click', () => setOutputView('console'));

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
      runCode();
    }
  });

  btnClear.addEventListener('click', () => {
    output.innerHTML = '';
  });

  btnReset.addEventListener('click', () => {
    if (confirm('Reset your code to the default example?')) {
      setCode('js', DEFAULT_CODE_JS);
      setCode('html', DEFAULT_CODE_HTML);
      setCode('css', DEFAULT_CODE_CSS);
      localStorage.setItem(STORAGE_KEY_JS, DEFAULT_CODE_JS);
      localStorage.setItem(LEGACY_STORAGE_KEY, DEFAULT_CODE_JS);
      localStorage.setItem(STORAGE_KEY_HTML, DEFAULT_CODE_HTML);
      localStorage.setItem(STORAGE_KEY_CSS, DEFAULT_CODE_CSS);
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
        appendError(event.data.message, event.data.line, event.data.source || 'JavaScript');
        break;
      case 'sandbox-alert':
        try {
          alert(event.data.message);
        } catch (e) {
          appendOutput([event.data.message], 'info');
        }
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
  window.setLabCode = (arg1, arg2) => {
    if (arg2 === undefined && typeof arg1 === 'string') {
      setCode('js', arg1);
    } else {
      setCode(arg1, arg2);
    }
  };
  window.getLabCode = (lang) => getCode(lang || currentLang);
  window.runLabCode = runCode;
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
    const s = document.getElementById('sandbox');
    if (s) s.srcdoc = ''; // Kill the iframe
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
    
    const formattedArgs = args.map((arg, idx) => {
      if (typeof arg === 'string' && args.length === 1) return escapeHtml(arg);
      if (typeof arg === 'string' && idx === 0) return escapeHtml(arg);
      return formatValue(arg);
    });

    div.innerHTML = formattedArgs.join(' ');
    output.appendChild(div);
    scrollToBottom();
  }

  function appendError(message, line, sourceLang = 'JavaScript') {
    const div = document.createElement('div');
    div.className = `log-entry error`;
    div.innerHTML = `<strong>${escapeHtml(sourceLang)} Error</strong><br>${escapeHtml(message)}<br><span class="problem-loc">Line: ${line}</span>`;
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
      promptContainer.innerHTML = `
        <div class="prompt-msg">${escapeHtml(promptContainer.querySelector('.prompt-msg').textContent)}</div>
        <div class="prompt-answered"><span class="prompt-caret">&gt;</span> <span class="fmt-string">"${escapeHtml(value)}"</span></div>
      `;
      promptContainer.id = '';
      promptContainer.classList.add('prompt-completed');
    }

    currentPromptId = null;
    setExecutionState('RUNNING');
    
    const currentSandbox = document.getElementById('sandbox');
    if (currentSandbox && currentSandbox.contentWindow) {
      currentSandbox.contentWindow.postMessage({ type: 'prompt-reply', id: id, value: value }, '*');
    }
  }

  function removePromptUI() {
    const promptContainer = document.getElementById('active-prompt');
    if (promptContainer) {
      promptContainer.remove();
    }
  }

  /* ── Execution ────────────────────────────────────────────────────────── */
  function getCode(lang = currentLang) {
    if (editorViews[lang]) return editorViews[lang].state.doc.toString();
    return document.getElementById(`code-editor-fallback-${lang}`)?.value ?? '';
  }

  function setCode(lang, code) {
    if (code === undefined && typeof lang === 'string') {
      code = lang;
      lang = currentLang;
    }
    if (editorViews[lang]) {
      editorViews[lang].dispatch({ changes: { from: 0, to: editorViews[lang].state.doc.length, insert: code } });
    } else {
      const ta = document.getElementById(`code-editor-fallback-${lang}`);
      if (ta) ta.value = code;
    }
  }

  function runCode() {
    const codeJs   = getCode('js');
    const codeHtml = getCode('html');
    const codeCss  = getCode('css');

    output.innerHTML = '';
    removePromptUI();
    setExecutionState('RUNNING');

    const outputTitle = document.getElementById('output-title');
    const hasHtml = !isCodeEmpty(codeHtml, 'html');
    const hasCss  = !isCodeEmpty(codeCss, 'css');

    if (!hasHtml && !hasCss) {
      // Case A: Pure JavaScript
      if (outputModeToggle) outputModeToggle.style.display = 'none';
      if (outputTitle) outputTitle.textContent = '⬛ Output';
      output.style.display = 'block';
      const curSandbox = document.getElementById('sandbox');
      if (curSandbox) curSandbox.style.display = 'none';
      runJSOnly(codeJs);
    } else if (!hasHtml && hasCss) {
      // CSS only without HTML
      if (outputModeToggle) outputModeToggle.style.display = 'none';
      if (outputTitle) outputTitle.textContent = '⬛ Output';
      output.style.display = 'block';
      const curSandbox = document.getElementById('sandbox');
      if (curSandbox) curSandbox.style.display = 'none';
      appendSystemMessage('CSS requires HTML content to be previewed.', 'system');
      setExecutionState('IDLE');
    } else {
      // Webpage Mode (HTML exists: Case B HTML only, Case C HTML+CSS, Case D HTML+JS, Case E HTML+CSS+JS)
      if (outputModeToggle) outputModeToggle.style.display = 'flex';
      if (outputTitle) outputTitle.textContent = '🌐 Web Page Preview';
      setOutputView('preview');
      runWebPage(codeHtml, codeCss, codeJs);
    }
  }

  function runJSOnly(code) {
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
        window.parent.postMessage({ type: 'sandbox-error', message: msg, line: line, source: 'JavaScript' }, '*');
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
        _sendErr(msg, line, 'JavaScript');
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
          _sendErr(e.name + ': ' + e.message, line, 'JavaScript');
        } finally {
          window.parent.postMessage({ type: 'sandbox-end' }, '*');
        }
      })();
    <\/script></body></html>`;

    // Recreate/update sandbox for clean run
    const container = document.querySelector('.output-panel');
    let oldSandbox = document.getElementById('sandbox');
    const newSandbox = document.createElement('iframe');
    newSandbox.id = 'sandbox';
    newSandbox.className = 'sandbox-output';
    newSandbox.setAttribute('sandbox', 'allow-scripts allow-modals allow-same-origin');
    newSandbox.setAttribute('title', 'Code execution sandbox');
    newSandbox.style.display = 'none';

    if (oldSandbox) {
      oldSandbox.replaceWith(newSandbox);
    } else {
      container.appendChild(newSandbox);
    }

    newSandbox.srcdoc = html;
  }

  function runWebPage(codeHtml, codeCss, codeJs) {
    // 1. Recreate iframe to guarantee a 100% fresh, isolated DOM & JS context without lingering timers/listeners
    const container = document.querySelector('.output-panel');
    let oldSandbox = document.getElementById('sandbox');
    const newSandbox = document.createElement('iframe');
    newSandbox.id = 'sandbox';
    newSandbox.className = 'sandbox-output';
    newSandbox.setAttribute('sandbox', 'allow-scripts allow-modals allow-same-origin');
    newSandbox.setAttribute('title', 'Web Page Preview');
    newSandbox.style.display = 'block';

    if (oldSandbox) {
      oldSandbox.replaceWith(newSandbox);
    } else {
      container.appendChild(newSandbox);
    }

    // 2. CSS Syntax validation
    const cssErr = checkCssSyntax(codeCss);
    if (cssErr) {
      appendError(cssErr.message, cssErr.line, 'CSS');
    }

    // 3. Escape student JavaScript to prevent premature </script> closing
    const safeJs = codeJs ? codeJs.replace(/<\/script>/gi, '<\\/script>') : '';

    // 4. Bridge script injected into the preview for logging, error catching, and alert handling
    const bridgeScript = `
      <script>
        (function() {
          var _errorSent = false;
          function _sendErr(msg, line, src) {
            window.parent.postMessage({ type: 'sandbox-error', message: msg, line: line, source: src || 'JavaScript' }, '*');
          }
          function _send(level, args) {
            window.parent.postMessage({ type: 'sandbox-log', level: level, args: Array.from(args) }, '*');
          }
          console.log   = function() { _send('log',   arguments); };
          console.warn  = function() { _send('warn',  arguments); };
          console.error = function() { _send('error', arguments); };
          console.info  = function() { _send('info',  arguments); };
          console.clear = function() { window.parent.postMessage({ type: 'sandbox-clear' }, '*'); };

          window.alert = function(msg) {
            try {
              window.parent.postMessage({ type: 'sandbox-alert', message: String(msg) }, '*');
            } catch(e) {}
          };

          window.addEventListener('error', function(e) {
            var line = e.lineno || '?';
            _sendErr(e.message || 'Error in JavaScript', line, 'JavaScript');
          });

          window.addEventListener('unhandledrejection', function(e) {
            var msg = e.reason ? (e.reason.message || String(e.reason)) : 'Unhandled Promise Rejection';
            _sendErr(msg, '?', 'JavaScript');
          });
        })();
      </script>
    `;

    const styleTag = codeCss.trim() ? `<style id="__codex_user_styles">\n${codeCss}\n</style>` : '';
    const scriptTag = safeJs.trim() ? `<script id="__codex_user_script">\n${safeJs}\n</script>` : '';

    const hasHtmlTag = /<html[\s>]/i.test(codeHtml);
    const hasHeadTag = /<head[\s>]/i.test(codeHtml);
    const hasBodyTag = /<body[\s>]/i.test(codeHtml);

    let fullDoc = '';
    if (hasHtmlTag) {
      fullDoc = codeHtml;
      if (hasHeadTag) {
        fullDoc = fullDoc.replace(/<head[\s>]/i, (m) => `${m}\n${bridgeScript}\n${styleTag}\n`);
      } else {
        fullDoc = bridgeScript + '\n' + styleTag + '\n' + fullDoc;
      }
      if (hasBodyTag && /<\/body>/i.test(fullDoc)) {
        fullDoc = fullDoc.replace(/<\/body>/i, `\n${scriptTag}\n</body>`);
      } else {
        fullDoc += `\n${scriptTag}`;
      }
    } else {
      fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${bridgeScript}
  ${styleTag}
</head>
<body>
  ${codeHtml}
  ${scriptTag}
</body>
</html>`;
    }

    newSandbox.srcdoc = fullDoc;
    setExecutionState('IDLE');
  }

  function checkCssSyntax(css) {
    if (!css.trim()) return null;
    let depth = 0;
    const lines = css.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      for (let ch of l) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
        if (depth < 0) {
          return { message: 'Unexpected closing brace "}"', line: i + 1 };
        }
      }
    }
    if (depth > 0) {
      return { message: 'Unclosed style block; missing "}"', line: lines.length };
    }
    return null;
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
    javascript, html, css,
    syntaxHighlighting, indentOnInput, bracketMatching,
    closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap,
    lintGutter, linter, lintKeymap,
    acornParse,
    codexDarkTheme, codexHighlightStyle,
  } = window.CodexEditor;

  const commonExtensions = [
    codexDarkTheme,
    syntaxHighlighting(codexHighlightStyle),
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightActiveLine(),
    drawSelection(),
    bracketMatching(),
    highlightSelectionMatches(),
    history(),
    indentOnInput(),
    closeBrackets(),
    keymap.of([
      indentWithTab,
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...completionKeymap,
      ...lintKeymap,
    ]),
    EditorView.lineWrapping,
  ];

  // ── HTML Editor ───────────────────────────────────────────────────────────
  const savedHtml = localStorage.getItem(STORAGE_KEY_HTML) ?? DEFAULT_CODE_HTML;
  const stateHtml = EditorState.create({
    doc: savedHtml,
    extensions: [
      ...commonExtensions,
      html ? html({ autoCloseTags: true }) : [],
      autocompletion({ override: [htmlCompletions] }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) localStorage.setItem(STORAGE_KEY_HTML, update.state.doc.toString());
      }),
    ],
  });
  const containerHtml = document.getElementById('editor-container-html');
  if (containerHtml) {
    editorViews.html = new EditorView({ state: stateHtml, parent: containerHtml });
  }

  // ── CSS Editor ────────────────────────────────────────────────────────────
  const savedCss = localStorage.getItem(STORAGE_KEY_CSS) ?? DEFAULT_CODE_CSS;
  const stateCss = EditorState.create({
    doc: savedCss,
    extensions: [
      ...commonExtensions,
      css ? css() : [],
      autocompletion({ override: [cssCompletions] }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) localStorage.setItem(STORAGE_KEY_CSS, update.state.doc.toString());
      }),
    ],
  });
  const containerCss = document.getElementById('editor-container-css');
  if (containerCss) {
    editorViews.css = new EditorView({ state: stateCss, parent: containerCss });
  }

  // ── JavaScript Editor ─────────────────────────────────────────────────────
  const jsLinter = linter((view) => {
    const code = view.state.doc.toString();
    const diagnostics = [];
    try {
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

  const savedJs = localStorage.getItem(STORAGE_KEY_JS) ?? localStorage.getItem(LEGACY_STORAGE_KEY) ?? DEFAULT_CODE_JS;
  const stateJs = EditorState.create({
    doc: savedJs,
    extensions: [
      ...commonExtensions,
      lintGutter(),
      javascript({ jsx: false, typescript: false }),
      autocompletion({ override: [jsCompletions] }),
      jsLinter,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const str = update.state.doc.toString();
          localStorage.setItem(STORAGE_KEY_JS, str);
          localStorage.setItem(LEGACY_STORAGE_KEY, str);
        }
      }),
    ],
  });
  const containerJs = document.getElementById('editor-container-js');
  if (containerJs) {
    editorViews.js = new EditorView({ state: stateJs, parent: containerJs });
    editorView = editorViews.js;
  }

  window.editorViews = editorViews;
  window.editorView = editorViews.js;
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
      if (window.switchTab) window.switchTab('js');
      if (editorViews.js && !isNaN(from)) {
        editorViews.js.dispatch({ selection: { anchor: from }, scrollIntoView: true });
        editorViews.js.focus();
      }
    };
    el.addEventListener('click', go);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') go(); });
  });
}

/* ─── Custom HTML completions ────────────────────────────────────────────── */
function htmlCompletions(context) {
  const textBefore = context.state.doc.sliceString(0, context.pos);
  
  // 1. Tag name completion: when typing '<' or '</'
  const tagOpenMatch = context.matchBefore(/<\/?[\w-]*/);
  if (tagOpenMatch) {
    const isClosing = tagOpenMatch.text.startsWith('</');
    const prefixLen = isClosing ? 2 : 1;
    const from = tagOpenMatch.from + prefixLen;

    const htmlTags = [
      'html', 'head', 'body', 'title', 'meta', 'link', 'style', 'script',
      'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'button', 'input', 'form', 'label', 'textarea', 'select', 'option',
      'img', 'a', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
      'header', 'footer', 'nav', 'main', 'section', 'article', 'aside',
      'iframe', 'canvas', 'video', 'audio', 'svg', 'hr', 'br', 'strong', 'em', 'code', 'pre'
    ];

    return {
      from,
      options: htmlTags.map(tag => ({
        label: tag,
        type: 'type',
        info: `HTML <${tag}> element`,
        apply: (view, completion, from, to) => {
          if (isClosing) {
            view.dispatch({ changes: { from, to, insert: `${tag}>` } });
          } else {
            const voidTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
            if (voidTags.includes(tag)) {
              const insertText = `${tag}>`;
              view.dispatch({ changes: { from, to, insert: insertText } });
            } else {
              const insertText = `${tag}></${tag}>`;
              view.dispatch({
                changes: { from, to, insert: insertText },
                selection: { anchor: from + tag.length + 1 } // place cursor inside <tag>|</tag>
              });
            }
          }
        }
      }))
    };
  }

  // 2. Inside an open tag: Attribute or Attribute Value completion
  const lastOpen = textBefore.lastIndexOf('<');
  const lastClose = textBefore.lastIndexOf('>');
  if (lastOpen > lastClose) {
    const tagContent = textBefore.slice(lastOpen + 1);
    const tagNameMatch = tagContent.match(/^([a-zA-Z0-9-]+)/);
    const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';

    // Check if typing attribute value e.g. type="
    const attrValMatch = tagContent.match(/([a-zA-Z-]+)\s*=\s*["']([^"']*)$/);
    if (attrValMatch) {
      const attrName = attrValMatch[1].toLowerCase();
      const valWord = context.matchBefore(/[^"']*/);
      let values = [];
      if (attrName === 'type') {
        values = ['text', 'password', 'email', 'number', 'checkbox', 'radio', 'button', 'submit', 'reset', 'date', 'file', 'color', 'range', 'hidden'];
      } else if (attrName === 'target') {
        values = ['_blank', '_self', '_parent', '_top'];
      } else if (attrName === 'method') {
        values = ['GET', 'POST'];
      } else if (attrName === 'rel') {
        values = ['stylesheet', 'icon', 'noopener', 'noreferrer'];
      }

      if (values.length > 0) {
        return {
          from: valWord ? valWord.from : context.pos,
          options: values.map(v => ({ label: v, type: 'constant' }))
        };
      }
    }

    // Attribute Name
    const attrWord = context.matchBefore(/[\w-]*/);
    let tagAttrs = [];
    if (tagName === 'button') {
      tagAttrs = ['id', 'class', 'type', 'disabled', 'name', 'value', 'title', 'aria-label', 'style', 'onclick', 'autofocus'];
    } else if (tagName === 'img') {
      tagAttrs = ['src', 'alt', 'width', 'height', 'loading', 'id', 'class', 'style', 'title'];
    } else if (tagName === 'input') {
      tagAttrs = ['type', 'name', 'id', 'placeholder', 'value', 'required', 'disabled', 'checked', 'class', 'style', 'min', 'max', 'step', 'maxlength', 'autocomplete'];
    } else if (tagName === 'a') {
      tagAttrs = ['href', 'target', 'rel', 'id', 'class', 'title', 'download'];
    } else if (tagName === 'form') {
      tagAttrs = ['action', 'method', 'id', 'class', 'enctype', 'target'];
    } else {
      tagAttrs = ['id', 'class', 'style', 'title', 'hidden', 'tabindex', 'role', 'aria-label', 'aria-hidden', 'dir', 'lang', 'data-id'];
    }

    const universal = ['id', 'class', 'style', 'title'];
    universal.forEach(u => {
      if (!tagAttrs.includes(u)) tagAttrs.push(u);
    });

    return {
      from: attrWord ? attrWord.from : context.pos,
      options: tagAttrs.map(attr => ({
        label: attr,
        type: 'property',
        info: `Attribute for <${tagName}>`,
        apply: (view, completion, from, to) => {
          const insertText = `${attr}=""`;
          view.dispatch({
            changes: { from, to, insert: insertText },
            selection: { anchor: from + attr.length + 2 } // put cursor inside quotes
          });
        }
      }))
    };
  }

  return null;
}

/* ─── Custom CSS completions ─────────────────────────────────────────────── */
function cssCompletions(context) {
  const textBefore = context.state.doc.sliceString(0, context.pos);
  const lastOpenBrace = textBefore.lastIndexOf('{');
  const lastCloseBrace = textBefore.lastIndexOf('}');

  // 1. Inside a CSS rule block: { ... }
  if (lastOpenBrace > lastCloseBrace) {
    const blockContent = textBefore.slice(lastOpenBrace + 1);
    const lastSemi = blockContent.lastIndexOf(';');
    const currentDecl = lastSemi !== -1 ? blockContent.slice(lastSemi + 1) : blockContent;

    // Check if after ':' -> Property Value
    const colonIdx = currentDecl.lastIndexOf(':');
    if (colonIdx !== -1) {
      const propPart = currentDecl.slice(0, colonIdx).trim();
      const propMatch = propPart.match(/([a-zA-Z-]+)$/);
      const propName = propMatch ? propMatch[1].toLowerCase() : '';
      const valWord = context.matchBefore(/[\w-]*/);

      let valOptions = [];
      if (propName === 'display') {
        valOptions = ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none'];
      } else if (propName === 'position') {
        valOptions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
      } else if (propName === 'font-weight') {
        valOptions = ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
      } else if (propName === 'text-align') {
        valOptions = ['left', 'right', 'center', 'justify'];
      } else if (propName === 'flex-direction') {
        valOptions = ['row', 'row-reverse', 'column', 'column-reverse'];
      } else if (propName === 'justify-content') {
        valOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
      } else if (propName === 'align-items') {
        valOptions = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
      } else if (propName === 'overflow' || propName === 'overflow-x' || propName === 'overflow-y') {
        valOptions = ['visible', 'hidden', 'scroll', 'auto'];
      } else if (propName === 'cursor') {
        valOptions = ['pointer', 'default', 'not-allowed', 'grab', 'grabbing', 'move', 'text'];
      } else if (propName === 'box-sizing') {
        valOptions = ['border-box', 'content-box'];
      } else if (propName === 'border-style') {
        valOptions = ['solid', 'dashed', 'dotted', 'double', 'none'];
      } else if (propName.includes('color') || propName === 'background') {
        valOptions = ['transparent', 'currentColor', 'inherit', 'red', 'blue', 'green', 'yellow', 'cyan', 'white', 'black', 'gray', 'orange', 'purple', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];
      } else {
        valOptions = ['0', 'auto', 'inherit', '100%', '50%', '10px', '20px', '1rem', '2rem'];
      }

      return {
        from: valWord ? valWord.from : context.pos,
        options: valOptions.map(v => ({
          label: v,
          type: 'constant',
          apply: (view, completion, from, to) => {
            const insertText = completion.label.endsWith(';') ? completion.label : `${completion.label};`;
            view.dispatch({ changes: { from, to, insert: insertText } });
          }
        }))
      };
    }

    // Before ':' -> Property Name
    const propWord = context.matchBefore(/[\w-]*/);
    const cssProps = [
      'color', 'background', 'background-color', 'background-image', 'background-size', 'background-position',
      'display', 'position', 'top', 'right', 'bottom', 'left', 'z-index',
      'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'width', 'max-width', 'min-width', 'height', 'max-height', 'min-height',
      'font-size', 'font-family', 'font-weight', 'font-style', 'line-height',
      'text-align', 'text-decoration', 'text-transform', 'letter-spacing',
      'border', 'border-radius', 'border-width', 'border-color', 'border-style',
      'box-shadow', 'box-sizing', 'opacity', 'overflow', 'cursor', 'visibility',
      'transform', 'transition', 'animation',
      'flex', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'align-content', 'gap',
      'grid', 'grid-template-columns', 'grid-template-rows', 'grid-gap'
    ];

    return {
      from: propWord ? propWord.from : context.pos,
      options: cssProps.map(p => ({
        label: p,
        type: 'property',
        info: `CSS property: ${p}`,
        apply: (view, completion, from, to) => {
          const insertText = `${p}: `;
          view.dispatch({
            changes: { from, to, insert: insertText },
            selection: { anchor: from + insertText.length }
          });
        }
      }))
    };
  }

  // 2. Outside a block -> Selectors
  const selWord = context.matchBefore(/[\w-:#.]*/);
  if (selWord && (selWord.text.length >= 1 || context.explicit)) {
    const selectors = [
      'div', 'span', 'p', 'h1', 'h2', 'h3', 'button', 'input', 'form', 'label', 'img', 'a', 'ul', 'ol', 'li', 'table',
      'body', 'html', 'header', 'footer', 'nav', 'main', 'section',
      ':hover', ':active', ':focus', ':first-child', ':last-child', '::before', '::after'
    ];
    return {
      from: selWord.from,
      options: selectors.map(s => ({
        label: s,
        type: 'class',
        apply: (view, completion, from, to) => {
          if (s.startsWith(':')) {
            view.dispatch({ changes: { from, to, insert: s } });
          } else {
            const insertText = `${s} {\n  \n}`;
            view.dispatch({
              changes: { from, to, insert: insertText },
              selection: { anchor: from + s.length + 5 } // place cursor inside braces
            });
          }
        }
      }))
    };
  }

  return null;
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
  ['html', 'css', 'js'].forEach(lang => {
    const container = document.getElementById(`editor-container-${lang}`);
    if (container) {
      container.innerHTML = `<textarea id="code-editor-fallback-${lang}" spellcheck="false" style="width:100%;height:100%;background:transparent;color:#e2e8f0;font-family:monospace;padding:12px;border:none;resize:none;outline:none;box-sizing:border-box;"></textarea>`;
      const ta = document.getElementById(`code-editor-fallback-${lang}`);
      const def = lang === 'js' ? (localStorage.getItem(STORAGE_KEY_JS) ?? localStorage.getItem(LEGACY_STORAGE_KEY) ?? DEFAULT_CODE_JS)
                : lang === 'html' ? (localStorage.getItem(STORAGE_KEY_HTML) ?? DEFAULT_CODE_HTML)
                : (localStorage.getItem(STORAGE_KEY_CSS) ?? DEFAULT_CODE_CSS);
      ta.value = def;
      ta.addEventListener('input', () => {
        const key = lang === 'js' ? STORAGE_KEY_JS : lang === 'html' ? STORAGE_KEY_HTML : STORAGE_KEY_CSS;
        localStorage.setItem(key, ta.value);
        if (lang === 'js') localStorage.setItem(LEGACY_STORAGE_KEY, ta.value);
      });
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
