// Initialize the QR code scanner
let html5QrCodeScanner = new Html5QrcodeScanner("scanner-container", {
    fps: 10,
    qrbox: { width: 250, height: 250 },
});

let flashOn = false; // Track flash state

function onScanSuccess(decodedText, decodedResult) {
    alert(`QR Code detected: ${decodedText}`);
    
    // Clear the scanner and restart it to be ready for new scans
    html5QrCodeScanner.clear().then(() => {
        html5QrCodeScanner.render(onScanSuccess, onScanError);
    });
}

function onScanError(errorMessage) {
    console.error(errorMessage);
}

// Start the QR code scanner
html5QrCodeScanner.render(onScanSuccess, onScanError);

// Toggle flash functionality
document.getElementById('toggle-flash').addEventListener('click', function () {
    flashOn = !flashOn;
    // Apply video constraints to toggle the flash
    html5QrCodeScanner.getCameras().then(cameras => {
        if (cameras.length > 0) {
            const camera = cameras[0];
            const constraints = {
                video: { facingMode: "environment", torch: flashOn }
            };
            html5QrCodeScanner.setCamera(camera.id, constraints);
        }
    }).catch(err => {
        console.error("Error accessing cameras: ", err);
    });
});

// Switch to QR code generator
document.getElementById('toggle-to-generator').addEventListener('click', function () {
    document.getElementById('scanner-section').style.display = 'none';
    document.getElementById('generator-section').style.display = 'block';
});
