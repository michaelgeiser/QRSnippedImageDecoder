chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "pasteQR",
        title: "Paste QR Code",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "pasteQR") {
        // Send message to all extension views
        chrome.runtime.sendMessage({action: "triggerPaste"});
    }
});
