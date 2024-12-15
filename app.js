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

// قراءة الباركود من الصورة
function scanBarcode() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // رسم إطار الفيديو على الكانفاس
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // استخراج الصورة وتحليلها
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // استخدام مكتبة jsQR لتحليل الباركود
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
        output.textContent = `Barcode: ${code.data}`;
        console.log(`Barcode detected: ${code.data}`);
    } else {
        output.textContent = "Scanning...";
    }

    // متابعة الفحص
    requestAnimationFrame(scanBarcode);
}

// تشغيل الكاميرا وبدء الفحص
setupCamera().then(() => {
    video.addEventListener("play", () => {
        scanBarcode();
    });
});
