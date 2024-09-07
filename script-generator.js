document.getElementById('generate-qr').addEventListener('click', function () {
    const link = document.getElementById('link-input').value;

    if (isValidURL(link)) {
        const qrcodeContainer = document.getElementById('qrcode');
        qrcodeContainer.innerHTML = ''; // Clear previous QR code

        const qrCodeOptions = {
            text: link,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        };

        new QRCode(qrcodeContainer, qrCodeOptions);
    } else {
        alert('Please enter a valid link.');
    }
});

document.getElementById('toggle-to-scanner').addEventListener('click', function () {
    document.getElementById('generator-section').style.display = 'none';
    document.getElementById('scanner-section').style.display = 'block';
});

document.getElementById('link-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('generate-qr').click();
    }
});

// URL validation function
function isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(www\\.)?localhost|\\d{1,3}\\.)' + // domain
        '(\\.[a-z]{2,6})?$', 'i'); // TLD
    return pattern.test(str);
}
