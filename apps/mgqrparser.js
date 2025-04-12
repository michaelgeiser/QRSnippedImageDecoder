document.addEventListener('DOMContentLoaded', function() {
    const qrPasteArea = document.getElementById('qrPasteArea');
    const urlDisplay = document.getElementById('urlDisplay');
    const urlText = document.getElementById('urlText');
    const defaultText = qrPasteArea.innerHTML;
    const hoverText = "Now use CRTL-V to paste the copied image of a QR code of a URL";


    qrPasteArea.addEventListener('mouseover', function() {
        if (!qrPasteArea.querySelector('img')) {
            qrPasteArea.innerHTML = hoverText;
        }
    });

    qrPasteArea.addEventListener('mouseout', function() {
        if (!qrPasteArea.querySelector('img')) {
            qrPasteArea.innerHTML = defaultText;
        }
    });

    // Function to process the image and QR code
    function processQRImage(imageSource) {
        const processImg = new Image();
        processImg.src = imageSource;
        
        processImg.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = processImg.width;
            canvas.height = processImg.height;
            ctx.drawImage(processImg, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
           
            if (code) {
                if (isValidUrl(code.data)) {
                    // Display the image in the paste area
                    qrPasteArea.innerHTML = '';
                    const displayImg = new Image();
                    displayImg.src = imageSource;
                    displayImg.style.maxWidth = '100%';
                    displayImg.style.maxHeight = '100%';
                    displayImg.style.objectFit = 'contain';
                    qrPasteArea.appendChild(displayImg);
                    urlDisplay.style.visibility  = 'visible';
                    urlText.textContent = code.data;
                } else {
                    qrPasteArea.innerHTML = "Please post a valid QR code for a URL";
                    urlDisplay.style.visibility = 'hidden';
                    urlText.textContent = '';
                }
            } else {
                qrPasteArea.innerHTML = "Not able to parse the QR code, please try again";
                urlText.textContent = '';
            }
        };
    }

    // Handle paste event
    document.addEventListener('paste', function(event) {
        event.preventDefault();
        const items = event.clipboardData.items;
        
        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    processQRImage(e.target.result);
                };
                reader.readAsDataURL(blob);
                break;
            }
        }
    });

    // Handle context menu paste message
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "triggerPaste") {
            navigator.clipboard.read()
                .then(async (clipboardItems) => {
                    for (const clipboardItem of clipboardItems) {
                        for (const type of clipboardItem.types) {
                            if (type.startsWith('image/')) {
                                const blob = await clipboardItem.getType(type);
                                const reader = new FileReader();
                                reader.onload = function(e) {
                                    processQRImage(e.target.result);
                                };
                                reader.readAsDataURL(blob);
                            }
                        }
                    }
                })
                .catch(err => console.error('Failed to read clipboard:', err));
        }
    });

    // Handle URL display click
    urlDisplay.addEventListener('click', function() {
        if (urlText.textContent) {
            chrome.tabs.create({ url: urlText.textContent });
        }
    });
});

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
