async function setupCamera() {
    try {
        output.textContent = "Requesting camera access...";
        
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" } // استخدم الكاميرا الخلفية إذا توفرت
        });

        video.srcObject = stream;
        output.textContent = "Camera is ready. Scanning for barcode...";
    } catch (err) {
        console.error("Camera setup failed:", err);

        // التعامل مع الأخطاء
        if (err.name === "NotAllowedError") {
            output.textContent = "Camera access was denied. Please allow access and reload the page.";
        } else if (err.name === "NotFoundError") {
            output.textContent = "No camera was found. Please connect a camera and try again.";
        } else if (err.name === "OverconstrainedError") {
            output.textContent = "No suitable camera found. Please adjust your camera settings.";
        } else {
            output.textContent = "An unexpected error occurred: " + err.message;
        }
    }
}
