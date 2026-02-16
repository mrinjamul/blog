document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll("div.highlight").forEach((block) => {
		const copyHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
     <path d="M10 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8v-1H2V2h8V1z"/>
     <path d="M14 3H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm0 12H6V4h8v11z"/>
     </svg>`;

		const copiedHTML = `<b><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="green" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M13.485 1.929a1 1 0 0 1 1.414 1.414l-8.07 8.071L2.1 6.686a1 1 0 1 1 1.414-1.414L6.828 9.586l6.657-6.657z"/>
    </svg></b>`;

		const div = document.createElement("div");
		div.className = "copy-icon-button-holder";

		const button = document.createElement("span");
		button.className = "copy-icon-button";
		button.innerHTML = copyHTML;
		div.appendChild(button);
		block.parentElement.appendChild(div);

		button.addEventListener("click", async () => {
			const code = block.querySelector(
				"td.rouge-code > pre, pre.highlight > code, pre > code",
			);
			try {
				await navigator.clipboard.writeText(code.innerText);
				button.innerHTML = copiedHTML;
				setTimeout(() => (button.innerHTML = copyHTML), 2000);
			} catch (err) {
				button.textContent = "Error";
			}
		});
	});
});

const style = document.createElement("style");
style.innerHTML = `
    .copy-icon-button-holder {
      position: relative;
      top: -18px;
      display: flex;
      justify-content: flex-end;
      align-items: right;
      text-align: right;
      vertical-align: middle;
      width: 100%;
      height: 0px;
    }

    .copy-icon-button {
      display: inline-flex;
      gap: 5px;
      align-items: center;
      cursor: pointer;
      z-index: 10;
      font-size: 14px;
      right: 0px;
      vertical-align: middle;
      color: var(--highlight-lineno-color);
      padding: 5px;
    }

    .copy-icon-button:hover {
      color: rgb(116, 178, 243);
    }

    .copy-icon-button svg {
      vertical-align: middle;
      position: relative;
    }
  `;
document.head.appendChild(style);
