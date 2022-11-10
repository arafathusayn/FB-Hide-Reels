(chrome || browser).runtime.onInstalled.addListener((details) => {
  if (["install", "update"].includes(details.reason)) {
    // no need
  }
});
