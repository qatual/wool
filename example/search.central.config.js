(function () {
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600&display=swap';
  document.head.appendChild(font);

  const pre = document.createElement('link');
  pre.rel = 'preconnect';
  pre.href = 'https://fonts.googleapis.com';
  document.head.appendChild(pre);

  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --c0: #111113; --c1: #18181c; --c2: #1f1f25; --c3: #27272f;
      --c4: #34343f; --c5: #46465a; --ct: #c8c8d8; --cm: #7a7a96;
      --cd: #42425a; --ca: #4f6ef7; --cg: #3db87a;
    }

    html, body {
      height: 100%;
      background: var(--c0);
      font-family: 'Figtree', sans-serif;
      color: var(--ct);
      overflow: hidden;
    }

    #browser {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
    }

    #tabstrip {
      display: flex;
      align-items: flex-end;
      background: var(--c0);
      padding: 8px 6px 0;
      gap: 1px;
      height: 38px;
      flex-shrink: 0;
    }

    .tab {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 10px;
      height: 30px;
      min-width: 160px;
      max-width: 220px;
      border-radius: 7px 7px 0 0;
      background: var(--c1);
      font-size: 12px;
      font-weight: 400;
      color: var(--cm);
      cursor: default;
      user-select: none;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      transition: background 0.1s, color 0.1s;
    }

    .tab.active { background: var(--c2); color: var(--ct); font-weight: 500; }
    .tab-fav { width: 13px; height: 13px; flex-shrink: 0; opacity: 0.7; }
    .tab-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }

    .tab-x {
      width: 16px; height: 16px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; color: var(--cm); cursor: pointer;
      opacity: 0; font-size: 11px;
      transition: background 0.1s, opacity 0.1s;
    }

    .tab:hover .tab-x, .tab.active .tab-x { opacity: 1; }
    .tab-x:hover { background: rgba(255,255,255,0.12); color: var(--ct); }

    #newtab {
      width: 26px; height: 26px; border: none; background: transparent;
      color: var(--cd); cursor: pointer; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 2px; transition: background 0.1s, color 0.1s; flex-shrink: 0;
    }
    #newtab:hover { background: var(--c3); color: var(--cm); }
    #newtab svg { width: 14px; height: 14px; }

    #address_bar {
      display: flex; align-items: center; gap: 3px;
      background: var(--c2); border-bottom: 1px solid var(--c3);
      padding: 0 8px; height: 46px; flex-shrink: 0;
    }

    .nav {
      width: 30px; height: 30px; border: none; background: transparent;
      border-radius: 50%; color: var(--cm); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.1s, color 0.1s; flex-shrink: 0;
    }
    .nav:hover { background: var(--c3); color: var(--ct); }
    .nav:active { background: var(--c4); }
    .nav:disabled { opacity: 0.28; pointer-events: none; }
    .nav svg { width: 15px; height: 15px; stroke-width: 2; }

    #urlbar {
      flex: 1; display: flex; align-items: center; gap: 7px;
      background: var(--c1); border: 1px solid var(--c3);
      border-radius: 22px; height: 32px; padding: 0 11px;
      margin: 0 5px; cursor: text;
      transition: border-color 0.15s, box-shadow 0.15s; max-width: 700px;
    }
    #urlbar:focus-within { border-color: var(--ca); box-shadow: 0 0 0 2px rgba(79,110,247,0.15); }

    #favicon_container { display: flex; align-items: center; flex-shrink: 0; gap: 4px; }
    #lock_icon { color: var(--cg); display: flex; align-items: center; }
    #lock_icon svg { width: 11px; height: 11px; stroke-width: 2.2; }
    #favicon_text { font-size: 11px; color: var(--cd); }
    #favicon_img { width: 14px; height: 14px; border-radius: 2px; }

    #url_box {
      flex: 1; border: none; background: transparent; color: var(--ct);
      font-family: 'Figtree', sans-serif; font-size: 13px; font-weight: 400;
      outline: none; caret-color: var(--ca); min-width: 0;
    }
    #url_box::placeholder { color: var(--cd); }
    #url_box::selection { background: rgba(79,110,247,0.3); }

    #reload_inner {
      width: 20px; height: 20px; border: none; background: transparent;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      color: var(--cd); cursor: pointer; flex-shrink: 0;
      transition: background 0.1s, color 0.1s;
    }
    #reload_inner:hover { background: rgba(255,255,255,0.07); color: var(--cm); }
    #reload_inner svg { width: 12px; height: 12px; stroke-width: 2; }

    #navigate_button { display: none; }

    #options_button {
      width: 30px; height: 30px; border: none; background: transparent;
      border-radius: 50%; color: var(--cm); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.1s, color 0.1s; flex-shrink: 0; margin-left: 1px;
    }
    #options_button:hover { background: var(--c3); color: var(--ct); }
    #options_button svg { width: 17px; height: 17px; }

    #frame_container { flex: 1; background: #fff; position: relative; overflow: hidden; }

    #options_div {
      position: fixed; top: 90px; right: 10px; width: 310px;
      background: var(--c2); border: 1px solid var(--c4); border-radius: 10px;
      box-shadow: 0 16px 48px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4);
      padding: 14px; flex-direction: column; gap: 12px; z-index: 9999; display: none;
    }
    #options_div.open { display: flex; animation: pop 0.15s ease; }

    @keyframes pop {
      from { opacity: 0; transform: scale(0.96) translateY(-4px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    .opts-header { display: flex; align-items: center; }
    .opts-title { font-size: 13px; font-weight: 600; color: var(--ct); }
    .opts-spacer { flex: 1; }

    #close_options_button {
      width: 22px; height: 22px; border: none; background: transparent;
      border-radius: 50%; color: var(--cm); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; transition: background 0.1s, color 0.1s;
    }
    #close_options_button:hover { background: var(--c4); color: var(--ct); }

    .opts-row { display: flex; align-items: center; gap: 8px; }
    .opts-label { font-size: 12px; color: var(--cm); white-space: nowrap; }

    #wisp_url_input {
      flex: 1; background: var(--c1); border: 1px solid var(--c4);
      border-radius: 6px; color: var(--ct); font-family: 'Figtree', sans-serif;
      font-size: 12px; padding: 5px 9px; outline: none;
      transition: border-color 0.12s; min-width: 0;
    }
    #wisp_url_input:focus { border-color: var(--ca); }

    .opts-eval-header { display: flex; align-items: center; }
    .opts-eval-label { font-size: 12px; color: var(--cm); }

    #eval_js_button {
      margin-left: auto; background: var(--c3); border: 1px solid var(--c4);
      border-radius: 5px; color: var(--ct); font-family: 'Figtree', sans-serif;
      font-size: 11px; font-weight: 500; padding: 3px 10px;
      cursor: pointer; transition: background 0.1s;
    }
    #eval_js_button:hover { background: var(--c4); }

    #eval_js_input {
      width: 100%; height: 90px; background: var(--c1);
      border: 1px solid var(--c4); border-radius: 6px; color: var(--ct);
      font-family: 'ui-monospace', 'Cascadia Code', monospace;
      font-size: 11.5px; padding: 8px; outline: none; resize: vertical;
      transition: border-color 0.12s;
    }
    #eval_js_input:focus { border-color: var(--ca); }

    #version_p { font-size: 11px; color: var(--cd); text-align: right; }
    #version_p a { color: var(--cd); text-decoration: none; transition: color 0.1s; }
    #version_p a:hover { color: var(--cm); }
  `;
  document.head.appendChild(style);

  document.body.innerHTML = `
    <div id="browser">
      <div id="tabstrip">
        <div class="tab active">
          <svg class="tab-fav" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          <span class="tab-label">wool://home</span>
          <span class="tab-x">✕</span>
        </div>
        <button id="newtab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      <div id="address_bar">
        <button class="nav" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="nav" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <button class="nav">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        </button>

        <div id="urlbar">
          <div id="favicon_container">
            <p id="favicon_text" style="display:none;">...</p>
            <div id="lock_icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <img id="favicon_img" width="14" height="14" style="display:none;">
          </div>
          <input id="url_box" type="text" placeholder="Search or enter address" value="wool://home" spellcheck="false" autocomplete="off">
          <button id="reload_inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </button>
        </div>

        <button id="navigate_button">Submit</button>

        <button id="options_button">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="12" cy="19" r="1.5"/>
          </svg>
        </button>
      </div>

      <div id="frame_container"></div>
    </div>

    <div id="options_div">
      <div class="opts-header">
        <span class="opts-title">Options</span>
        <div class="opts-spacer"></div>
        <button id="close_options_button">✕</button>
      </div>
      <div class="opts-row">
        <label class="opts-label" for="wisp_url_input">Wisp URL</label>
        <input id="wisp_url_input" type="text" value="wss://wisp.mercurywork.shop">
      </div>
      <div class="opts-eval-header">
        <span class="opts-eval-label">Eval JS</span>
        <button id="eval_js_button">Run</button>
      </div>
      <textarea id="eval_js_input"></textarea>
      <p id="version_p">
        <a href="https://github.com/qatual/wool" target="_blank"><i>wool <span id="version_text"></span></i></a>
      </p>
    </div>
  `;

  const optionsDiv = document.getElementById('options_div');

  document.getElementById('options_button').addEventListener('click', () => {
    optionsDiv.classList.toggle('open');
  });

  document.getElementById('close_options_button').addEventListener('click', () => {
    optionsDiv.classList.remove('open');
  });

  document.getElementById('url_box').addEventListener('focus', function () {
    this.select();
  });

  document.getElementById('url_box').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('navigate_button').click();
    }
  });

  document.getElementById('newtab').addEventListener('click', () => {
    const box = document.getElementById('url_box');
    box.value = '/resources/home.html';
    box.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });
})();