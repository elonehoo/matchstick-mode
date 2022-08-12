const template = document.createElement('template')

template.innerHTML = `<style>
    *,::after,::before{
      box-sizing:border-box
    }
    :host{
      contain:content;
      display:inline-block;
    }
    :host img {
        max-width: 100%;
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
        margin-bottom: 1.75rem;
    }
    .toggle {
        position: relative;
        touch-action: pan-x;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        padding: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
    }
    .toggle .track {
        width: 50px;
        height: 24px;
        padding: 0;
        border-radius: 30px;
        background-color: #0f1114;
        transition: all .2s ease;
    }
    .toggle .track .check, .toggle .track .x {
        position: absolute;
        width: 17px;
        height: 17px;
        top: 0;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
        line-height: 0;
    }
    .toggle .track .check {
        left: 5px;
        opacity: 0;
        transition: opacity .25s ease;
    }
    .toggle .track .x {
        right: 5px;
    }
    .toggle.dark .track .check, .toggle.dark .track .x{
        opacity: 1;
        transition: opacity .25s ease;
    }
    .toggle.dark .track .x {
        opacity: 0;
    }
    .toggle .thumb {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: #fafafa;
        box-sizing: border-box;
        transition: all .5s cubic-bezier(.23,1,.32,1) 0ms;
        transform: translateX(0);
    }
    .toggle.dark .thumb {
        transform: translateX(26px);
        border-color: #19ab27;
    }
  </style>
  <div class="toggle">
    <div class="track">
      <div class="check">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1meGVtb2ppIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjRkRFMzY0IiBkPSJNNTAzLjg1MSAyMTAuMjA0QzQ5Mi41NjMgMTIwLjY1NyA0MzQuMzggNDQuNDg1IDM1NS4xOTIgNy4yMzVjLTExLjI3OS01LjMwNi0yMi4zMzcgNy41NzItMTUuNDcgMTcuOTgyYzE4LjQ4IDI4LjAyOSAzMC45MTkgNjAuMjc4IDM1LjI3MyA5NC44MzhjMTguNzMzIDE0OC42NTktMTA2LjI4MSAyNzMuNjczLTI1NC45NCAyNTQuOTRjLTM0LjU2LTQuMzU0LTY2LjgxLTE2Ljc5My05NC44MzktMzUuMjczYy0xMC40MS02Ljg2Ni0yMy4yODcgNC4xOTEtMTcuOTgyIDE1LjQ3OGMzNy4yNSA3OS4xODIgMTEzLjQyMiAxMzcuMzY0IDIwMi45NjkgMTQ4LjY1MWMxNzEuMjI2IDIxLjU3OSAzMTUuMjI2LTEyMi40MTQgMjkzLjY0OC0yOTMuNjQ3Ij48L3BhdGg+PC9zdmc+" width="16" height="16" role="presentation" style="pointer-events: none;">
      </div>
      <div class="x">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1ub3RvLXYxIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBmaWxsPSIjZmNjMjFiIiBkPSJNNjQgMzAuMzRjLTE4LjU5IDAtMzMuNjYgMTUuMDctMzMuNjYgMzMuNjVjMCAxOC41OSAxNS4wNyAzMy42NiAzMy42NiAzMy42NmMxOC41OSAwIDMzLjY2LTE1LjA3IDMzLjY2LTMzLjY2YzAtMTguNTgtMTUuMDctMzMuNjUtMzMuNjYtMzMuNjV6bS03LjI0LTYuMTNoMTQuNDljLjY3IDAgMS4yOS0uMzMgMS42OC0uODhjLjM4LS41NC40Ny0xLjI1LjI0LTEuODhMNjUuOTIgMS44M0M2NS42MiAxLjAyIDY0Ljg2LjQ5IDY0IC40OXMtMS42Mi41NC0xLjkyIDEuMzRsLTcuMjUgMTkuNjNjLS4yMy42My0uMTQgMS4zMy4yNCAxLjg4Yy4zOS41NSAxLjAyLjg3IDEuNjkuODd6bTQwLjUgMTYuNzhjLjM4LjM5LjkxLjYgMS40NC42Yy4xMiAwIC4yNC0uMDEuMzYtLjAzYy42Ni0uMTIgMS4yMS0uNTUgMS41LTEuMTZsOC43Ni0xOS4wMWMuMzYtLjc4LjE5LTEuNjktLjQxLTIuM2MtLjYxLS42MS0xLjUzLS43Ny0yLjMxLS40MmwtMTkgOC43N2MtLjYxLjI4LTEuMDQuODQtMS4xNiAxLjVjLS4xMi42Ni4xIDEuMzMuNTYgMS44MWwxMC4yNiAxMC4yNHptMjguOTIgMjEuMDlsLTE5LjY0LTcuMjRjLS42My0uMjMtMS4zMy0uMTQtMS44OC4yNGMtLjU1LjM4LS44NyAxLS44NyAxLjY3bC4wMSAxNC40OWMwIC42Ny4zMyAxLjMuODggMS42OGMuMzUuMjMuNzYuMzYgMS4xNy4zNmMuMjQgMCAuNDgtLjA0LjcxLS4xM2wxOS42NC03LjI0Yy44LS4yOSAxLjM0LTEuMDYgMS4zNC0xLjkzYy0uMDItLjg0LS41NS0xLjYtMS4zNi0xLjl6TTEwMC41NiA4Ny42YTIuMDUgMi4wNSAwIDAgMC0xLjUtMS4xNmMtLjY2LS4xMS0xLjM0LjEtMS44LjU3TDg3LjAxIDk3LjI2Yy0uNDcuNDctLjY5IDEuMTUtLjU3IDEuODFjLjEyLjY1LjU1IDEuMjIgMS4xNiAxLjVsMTkuMDEgOC43NmMuMjcuMTMuNTYuMTguODYuMThjLjUzIDAgMS4wNS0uMjEgMS40NC0uNmMuNjEtLjYxLjc3LTEuNTIuNDEtMi4zbC04Ljc2LTE5LjAxem0tMjkuMzIgMTYuMThsLTE0LjQ5LjAxYy0uNjcgMC0xLjI5LjMzLTEuNjcuODhjLS4zOC41NS0uNDcgMS4yNS0uMjUgMS44N2w3LjI1IDE5LjY0Yy4zLjggMS4wNiAxLjM0IDEuOTIgMS4zNHMxLjYyLS41NCAxLjkyLTEuMzRsNy4yNS0xOS42NGMuMjMtLjYzLjE0LTEuMzMtLjI0LTEuODhjLS4zOS0uNTUtMS4wMS0uODgtMS42OS0uODh6bS00MC41LTE2Ljc3Yy0uNDctLjQ3LTEuMTQtLjY4LTEuOC0uNTdjLS42Ni4xMi0xLjIyLjU1LTEuNSAxLjE2bC04Ljc2IDE5LjAxYy0uMzYuNzgtLjE5IDEuNy40MiAyLjNhMi4wMzggMi4wMzggMCAwIDAgMi4zLjQxbDE5LjAxLTguNzdhMi4wNSAyLjA1IDAgMCAwIDEuMTYtMS41Yy4xMi0uNjYtLjEtMS4zMy0uNTctMS44TDMwLjc0IDg3LjAxem0tOC41Ny0xMy43MmMuNDEgMCAuODItLjEzIDEuMTctLjM3Yy41NS0uMzguODgtMS4wMS44OC0xLjY4bC0uMDEtMTQuNDlhMi4wNDUgMi4wNDUgMCAwIDAtMi43NS0xLjkyTDEuODIgNjIuMDhhMi4wNDUgMi4wNDUgMCAwIDAgMCAzLjg0bDE5LjY1IDcuMjRjLjIzLjA5LjQ2LjEzLjcuMTN6bTUuMjgtMzIuODlhMi4wNSAyLjA1IDAgMCAwIDMuMzEuNTlMNDEgMzAuNzRjLjQ3LS40OC42OC0xLjE1LjU2LTEuODFjLS4xMi0uNjUtLjU1LTEuMjEtMS4xNi0xLjQ5bC0xOS4wMi04Ljc2Yy0uNzgtLjM2LTEuNjktLjE5LTIuMy40MmMtLjYxLjYxLS43NyAxLjUyLS40MSAyLjNsOC43OCAxOXoiPjwvcGF0aD48L3N2Zz4=" width="16" height="16" role="presentation" style="pointer-events: none;">
      </div>
    </div>
    <div class="thumb"></div>
  </div>
`

function turnOnLight(e:any) {
  const { width, height } = document.documentElement.getBoundingClientRect();
  const style = document.createElement("style");
  style.id = "dark-light-mode-style";
  style.innerHTML = `body::after {
    content: "";
    position:absolute;
    top: 0;
    left: 0;
    height: ${height}px;
    width: ${width}px;
    min-height: 100vh;
    min-width: 100vw;
    pointer-events: none;
    background: radial-gradient(
      circle at
      var(--dark-light-mode-x, ${e.pageX}px)
      var(--dark-light-mode-y, ${e.pageY}px),
      rgb(255, 255, 0, 0.3),
      rgb(0, 0, 0, 1) 200px
    );
  }`;
  document.head.appendChild(style);
  ["mousemove", "touchstart", "touchmove", "touchend"].forEach((x) => {
    document.addEventListener(x, updateLight, false);
  });
}

function turnOffLight() {
  const el = document.querySelector("#dark-light-mode-style");
  el?.parentNode?.removeChild(el);
  ["mousemove", "touchstart", "touchmove", "touchend"].forEach((x) => {
    document.removeEventListener(x, updateLight, false);
  });
}

function updateLight(e:any) {
  if (!e.pageX || !e.pageY) return;
  const root = document.documentElement;
  root.style.setProperty("--dark-light-mode-x", `${e.pageX}px`);
  root.style.setProperty("--dark-light-mode-y", `${e.pageY}px`);
}

class DarkLightMode extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    const toggle = shadowRoot.querySelector(".toggle");
    toggle?.addEventListener("click", (e) => {
      toggle.classList.toggle("dark");

      if (toggle.classList.contains("dark")) {
        turnOnLight(e);
      } else {
        turnOffLight();
      }
    });
  }
}

customElements.define("dark-light-mode", DarkLightMode)
