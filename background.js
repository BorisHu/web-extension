function clickAction(info) {
    const url = info.linkUrl ?? info.pageUrl;
  
    chrome.windows.getAll({ windowTypes: ["normal"] }).then((windows) => {
      const incognitoWin = windows.find((w) => w.incognito === true);
      const incognitoId = incognitoWin?.id ?? null;
  
      if (incognitoId !== null) {
        chrome.tabs.create({ windowId: incognitoId, url: url }).then((tab) => {
          chrome.tabs.update(tab.id, { active: true });
        });
      } else {
        chrome.windows.create({ url: url, incognito: true });
      }
    });
  }