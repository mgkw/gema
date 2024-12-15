const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const output = document.getElementById("output");

// إعداد الكاميرا
async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Camera setup failed:", err);
        alert("Failed to access the camera.");
    }
}

// قراءة الباركود وتحديده بمستطيل
function scanBarcode() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // رسم إطار الفيديو على الكانفاس
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // استخراج بيانات الصورة
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // تحليل الصورة باستخدام jsQR
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
        // عرض بيانات الباركود
        output.textContent = `Barcode: ${code.data}`;
        console.log(`Barcode detected: ${code.data}`);

        // رسم مستطيل حول الباركود
        context.beginPath();
        context.lineWidth = 4;
        context.strokeStyle = "red";
        context.rect(
            code.location.topLeftCorner.x,
            code.location.topLeftCorner.y,
            code.location.bottomRightCorner.x - code.location.topLeftCorner.x,
            code.location.bottomRightCorner.y - code.location.topLeftCorner.y
        );
        context.stroke();
    } else {
        output.textContent = "Scanning...";
    }

    // استدعاء الفحص مجددًا
    requestAnimationFrame(scanBarcode);
}

// تشغيل الكاميرا وبدء الفحص
setupCamera().then(() => {
    video.addEventListener("play", () => {
        scanBarcode();
    });
});
