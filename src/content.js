let __FB_REELS_REMOVER_CONFIG__ = {
  reels: `[aria-label*="Reels"]`,
  i_reels: 0,
  reels_header: `[role="tablist"] div:nth-child(2)`,
  i_reels_header: 0,
};

function clean() {
  const config = __FB_REELS_REMOVER_CONFIG__;
  for (const key in config) {
    if (typeof config[key] === "string") {
      const el = document.querySelectorAll(config[key])[
        config[`i_${key}`] ? parseInt(config[`i_${key}`]) : 0
      ];

      if (el) {
        el.style.display = "none";
      }
    }
  }
}

document.body.onload = () => {
  clean();

  chrome = chrome || browser;

  chrome.storage.sync.get("data", (items) => {
    const config = (items || {}).data || {};

    __FB_REELS_REMOVER_CONFIG__ = {
      ...__FB_REELS_REMOVER_CONFIG__,
      ...config,
    };

    clean();
  });
};

const targetNode = document.body;

const config = { childList: true, subtree: true };

const callback = (_mutationList, _observer) => {
  clean();
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
