document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const textToCopy = urlParams.get("text");

    const messageElement = document.getElementById("copyMessage");
    const ALERT_INNER_TEXT = document.getElementById("allert-inner-text");
    
    const TBC_BUTTON = document.getElementById("tbc-btn");
    const BOG_BUTTON = document.getElementById("bog-btn");
    //const SERVICE_FEE = document.getElementById("service-fee");
    const RECEIVER = document.getElementById("boombuli-receiver");

    const tbc_scheme_url = "https://tbconline.ge/MB/TT"; //"tbc://";
    const bog_scheme_url = "bogmBank://";
    
    const tbc_account = "GE69TB7003612365100038";
    const bog_account = "GE25BG0000000542914598";
    //const service_fee = "Service Fee";
    const receiver = "Garegin Epranosyan";
    

    const androidRedirect = function(scheme_url, iBan, rediredtPath) {
        const url = `intent://tbconline.ge/MB/${rediredtPath}/#Intent;scheme=https;package=com.icomvision.bsc.tbc;end`;
        window.location.replace(url);

        setTimeout(() => {
        window.location.replace(
            "https://play.google.com/store/apps/details?id=com.icomvision.bsc.tbc"
        );
        }, 5000);
    }

    const iphoneRedirect = function(scheme_url, iBan) {
        // https://tbconline.ge/MB/TT
        window.location.replace(`${scheme_url}/${iBan}`);
    
        setTimeout(() => {
        window.location.replace(
            "https://apps.apple.com/us/app/tbc-bank/id766598432"
        );
        }, 5000);
    }

    const redirectToMobileApp = function(scheme_url, iBan) {
        const userAgent = navigator.userAgent.toLowerCase();
        const isAndroid = userAgent.indexOf("android") > -1;
        const isIphone = userAgent.indexOf("iphone") > -1;
    
        const url = window.location.href.toLowerCase();
        var rediredtPath = url.substring(url.indexOf("/mb/") + 4);
    
        if (isAndroid) {
            androidRedirect(scheme_url, iBan, rediredtPath);
        } else if (isIphone) {
            iphoneRedirect(scheme_url, iBan);
        } else {
            window.location.replace("https://tbconline.ge/tbcrd");
        };
    };

    const copyTextToClipboard = (scheme_url, iBan) => {
        navigator.clipboard.writeText(iBan)
        .then(() => {
            messageElement.style.display = "block";
            redirectToMobileApp(scheme_url, iBan);
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
        copyTextToClipboard(tbc_scheme_url, tbc_account);
    });

    BOG_BUTTON.addEventListener("click", () => {
        ALERT_INNER_TEXT.innerText = "iBan Copied!";
        copyTextToClipboard(bog_scheme_url, bog_account);
    });
    
    // redirectToMobileApp();

    // SERVICE_FEE.addEventListener("click", () => {
    //     ALERT_INNER_TEXT.innerText = "Text Copied!";
    //     copyTextToClipboard(service_fee);
    // });

    // RECEIVER.addEventListener("click", () => {
    //     ALERT_INNER_TEXT.innerText = "Receiver Copied!";
    //     copyTextToClipboard(receiver);
    // });

});
