document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const textToCopy = urlParams.get("text");

    const messageElement = document.getElementById("copyMessage");
    const ALERT_INNER_TEXT = document.getElementById("allert-inner-text");
    
    const TBC_BUTTON = document.getElementById("tbc-btn");
    const BOG_BUTTON = document.getElementById("bog-btn");
    //const SERVICE_FEE = document.getElementById("service-fee");
    const RECEIVER = document.getElementById("boombuli-receiver");

    
    const tbc_account = "GE18TB7361245164300005";
    const bog_account = "GE17BG0000000131452770";
    //const service_fee = "Service Fee";
    const receiver = "Garegin Epranosyan";
    
    const copyTextToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        .then(() => {
            messageElement.style.display = "block";
            setTimeout(() => {
                messageElement.style.display = "none";
            }, 3000);
        })
        .catch((err) => {
            console.error('Unable to copy text: ', err);
        });
    }

    TBC_BUTTON.addEventListener("click", () => {
        ALERT_INNER_TEXT.innerText = "iBan Copied!";
        copyTextToClipboard(tbc_account);
    });

    BOG_BUTTON.addEventListener("click", () => {
        ALERT_INNER_TEXT.innerText = "iBan Copied!";
        copyTextToClipboard(bog_account);
    });

    // SERVICE_FEE.addEventListener("click", () => {
    //     ALERT_INNER_TEXT.innerText = "Text Copied!";
    //     copyTextToClipboard(service_fee);
    // });

    RECEIVER.addEventListener("click", () => {
        ALERT_INNER_TEXT.innerText = "Receiver Copied!";
        copyTextToClipboard(receiver);
    });

});
