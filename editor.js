const DEFAULT_CSS = "body { font-family: sans-serif; padding: 16px; }";

function createPlayground(section) {
  const initialHTML = section.dataset.html || "<h1>Hello HTML</h1>";
  const initialCSS = section.dataset.css || DEFAULT_CSS;

  section.insertAdjacentHTML(
    "beforeend",
    `
    <div class="playground-grid">
      <div>
        <h3>HTML</h3>
        <textarea class="playground-editor" data-type="html"></textarea>
        <h3>CSS</h3>
        <textarea class="playground-editor" data-type="css"></textarea>
        <div class="playground-actions">
          <button class="playground-button" data-action="run">プレビュー更新</button>
          <button class="playground-button secondary" data-action="reset">初期コードに戻す</button>
        </div>
      </div>
      <iframe class="playground-preview" title="コードプレビュー" sandbox></iframe>
    </div>
  `
  );

  const htmlEditor = section.querySelector("[data-type='html']");
  const cssEditor = section.querySelector("[data-type='css']");
  const preview = section.querySelector("iframe");

  function render() {
    preview.srcdoc = `<!doctype html><html><head><style>${cssEditor.value}</style></head><body>${htmlEditor.value}</body></html>`;
  }

  function reset() {
    htmlEditor.value = initialHTML;
    cssEditor.value = initialCSS;
    render();
  }

  section.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;

    const action = target.dataset.action;
    if (action === "run") render();
    if (action === "reset") reset();
  });

  reset();
}

document.querySelectorAll(".playground").forEach(createPlayground);
