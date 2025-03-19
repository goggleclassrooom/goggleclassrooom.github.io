try {
  navigator.serviceWorker.register(location.origin + "/sw.js");
} catch (error) {
  console.error("Service Worker registration failed:", error);
  console.warn("Since the registration of the serivce worker failed, many things will also break.");
}

const jsdelivr = document.createElement("script");
jsdelivr.setAttribute("src", "./js/main.js");
document.head.append(jsdelivr);

var tab = localStorage.getItem("tab");
if (tab) {
  try {
    var tabData = JSON.parse(tab);
  } catch {
    var tabData = {};
  }
} else {
  var tabData = {};
}
if (tabData.title) {
  document.title = tabData.title;
}
if (tabData.icon) {
  document.querySelector("link[rel='icon']").href = tabData.icon;
}

function getContrastHex(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#1c1c1c' : 'white';
}

function getColorHex(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'white' : 'black';
}

var theme = localStorage.getItem("theme") || "default";

const themes = [
  {
    theme: 'default',
    color: '#4caf50'
  },
  {
    theme: 'light',
    color: '#4caf50'
  },
  {
    theme: 'orchid',
    color: '#b625cc'
  },
  {
    theme: 'sky',
    color: '#0084ff'
  },
  {
    theme: 'winter',
    color: '#3da341'
  },
  {
    theme: 'nebelung',
    color: '#3d2d1e'
  },
  {
    theme: 'piplup',
    color: '#0026ff'
  },
  {
    theme: 'forternish',
    color: '#003443'
  },
  {
    theme: 'northernfish',
    color: '#0ec9f8'
  },
  {
    theme: 'forgor',
    color: '#d7d700'
  },
  {
    theme: 'monotonium',
    color: '#fff'
  },
  {
    theme: 'monotonium-dark',
    color: '#000'
  },
  {
    theme: 'concrete',
    color: '#808080'
  },
  {
    theme: 'sunset',
    color: '#e83141'
  },
  {
    theme: 'whoisev',
    color: '#8e8e8e'
  }
]

if (theme !== 'custom') {
  document.body.setAttribute("theme", theme);

  if (location.pathname.includes('/settings')) {
    themes.forEach(palette => {
      if (palette.theme == theme) {
        document.querySelector('#theme_color').value = palette.color;
      }
    });
  }
} else {
  const theme = localStorage.getItem('theme_color');

  document.body.setAttribute('theme', 'custom');
  document.body.style = `--theme: ${theme}; --background: ${getContrastHex(theme)}; --text: ${getColorHex(theme)}; --text-secondary: ${getColorHex(theme)};`;

  if (location.pathname.includes('/settings')) {
    document.querySelector('#theme_color').value = theme;
  }
}

class changelogAdded extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="changelog-item">
        <div class="changelog-type" added></div>
        ${this.innerText}
        </div>
        `;
  }
}

customElements.define("changelog-added", changelogAdded);

class changelogRemoved extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="changelog-item">
        <div class="changelog-type" removed></div>
        ${this.innerText}
        </div>
        `;
  }
}

customElements.define("changelog-removed", changelogRemoved);

class changelogChanged extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="changelog-item">
        <div class="changelog-type" changed></div>
        ${this.innerText}
        </div>
        `;
  }
}

customElements.define("changelog-changed", changelogChanged);

function foundSecretTheme(name) {
  document.body.setAttribute("theme", name);
  localStorage.setItem("theme", name);
  localStorage.setItem(name, "true");
  if (document.querySelector("." + name)) {
    document.querySelector("." + name).removeAttribute("hidden");
  }
}

function secretThemeButton(name) {
  if (localStorage.getItem(name) == "true") {
    if (document.querySelector("." + name)) {
      document.querySelector("." + name).removeAttribute("hidden");
    }
  }
}

function createSecretThemeType(name, pattern) {
window[name + "pattern"] = pattern;
window[name + "current"] = 0;
  
var themePattern = window[name + "pattern"]
var themeCurrent = window[name + "current"]

document.addEventListener("keydown", function (e) {
  if (e.key !== themePattern[themeCurrent]) {
    return (themeCurrent = 0);
  }

  themeCurrent++;

  if (themePattern.length == themeCurrent) {
    themeCurrent = 0;
    foundSecretTheme(name);
  }
});
  
secretThemeButton(name)
}

createSecretThemeType("nebelung", ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"])
createSecretThemeType("piplup", ["p", "i", "p", "l", "u", "p", "i", "s", "c", "o", "o", "l"])
createSecretThemeType("forternish", ["c", "o", "m", "i", "c", "s", "a", "n", "s"])
createSecretThemeType("solarba", ["s", "o", "l", "a", "r", "i", "s", "c", "o", "o", "l"])
