const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const output = document.getElementById("output");

let lastScannedBarcode = null;

// إعداد الكاميرا
async function setupCamera() {
    try {
        output.textContent = "جاري طلب إذن الوصول إلى الكاميرا...";

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" } // الكاميرا الخلفية
        });

        video.srcObject = stream;
        output.textContent = "الكاميرا جاهزة. جاري مسح أكواد QR...";
    } catch (err) {
        console.error("فشل إعداد الكاميرا:", err);
        output.textContent = "فشل في الوصول إلى الكاميرا. من فضلك تأكد من إذن الوصول.";
    }
}

// قراءة الباركود
function scanBarcode() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // رسم الفيديو على الكانفاس
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // استخراج بيانات الصورة
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // تحليل الصورة باستخدام jsQR
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
        console.log("تم العثور على باركود:", code.data);

        if (code.data !== lastScannedBarcode) {
            lastScannedBarcode = code.data;
            output.textContent = `تم اكتشاف رمز QR: ${code.data}`;
        }

        // رسم مستطيل حول الباركود
        context.beginPath();
        context.lineWidth = 4;
        context.strokeStyle = "red";

        const { topLeft, topRight, bottomRight, bottomLeft } = code.location;

        context.moveTo(topLeft.x, topLeft.y);
        context.lineTo(topRight.x, topRight.y);
        context.lineTo(bottomRight.x, bottomRight.y);
        context.lineTo(bottomLeft.x, bottomLeft.y);
        context.closePath();
        context.stroke();
    } else {
        console.log("لم يتم العثور على باركود في هذه الإطار.");
    }

    // استدعاء الفحص مجددًا
    requestAnimationFrame(scanBarcode);
}

// بدء تشغيل الكاميرا
setupCamera().then(() => {
    video.addEventListener("play", () => {
        scanBarcode();
    });
});
