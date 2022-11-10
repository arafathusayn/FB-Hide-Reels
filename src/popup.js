// popup.js

for (let elem of document.getElementsByClassName("app_version")) {
  elem.innerText = (chrome || browser).runtime.getManifest().version;
}

const configElems = ["reels", "i_reels", "reels_header", "i_reels_header"];

document.body.onload = () => {
  chrome.storage.sync.get("data", (items) => {
    const data = (items || {}).data || {};

    console.log("Restore", JSON.stringify(data, null, 2));

    //if (chrome.runtime.error) return;

    for (let configElem of configElems) {
      if (data[configElem]) {
        document.getElementById(configElem).value = data[configElem];
      }
    }
  });
};

const changeEvent = () => {
  const d = {};

  for (let configElem of configElems) {
    d[configElem] = configElem.startsWith("i_")
      ? parseInt(document.getElementById(configElem).value)
      : document.getElementById(configElem).value;
  }

  chrome.storage.sync.set({ data: d }, () => {
    //if (chrome.runtime.error) return;
    console.log(d);
  });
};

for (let configElem of configElems) {
  document.getElementById(configElem).onkeyup = changeEvent;
}
