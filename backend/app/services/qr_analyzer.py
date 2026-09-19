import cv2
import re

from .message_analyzer import analyze_message
from .url_analyzer import analyze_url


def decode_qr_from_image(file_path: str) -> str:
    image = cv2.imread(file_path)

    if image is None:
        raise RuntimeError("Unable to read the QR image.")

    detector = cv2.QRCodeDetector()

    data, points, _ = detector.detectAndDecode(image)

    if not data:
        raise RuntimeError(
            "No readable QR code was detected in the image."
        )

    return data.strip()


def analyze_qr_content(data: str):

    if not data:
        return {
            "risk_score": 0,
            "status": "safe",
            "title": "No QR Data",
            "description": "No readable data was found in the QR code.",
            "findings": [],
            "recommendations": [
                "Upload a clear QR code image."
            ]
        }

    data = data.strip()

    print("====================================")
    print("DECODED QR DATA:")
    print(repr(data))
    print("====================================")

    # Check whether QR contains a URL
    if data.lower().startswith(("http://", "https://")):

        print("QR DATA TYPE: URL")

        result = analyze_url(data)

        print(
            "URL ANALYZER SCORE:",
            result.get("risk_score")
        )

        print(
            "URL ANALYZER FINDINGS:",
            result.get("findings")
        )

        return result

    # QR contains normal text
    print("QR DATA TYPE: TEXT")

    result = analyze_message(data)

    print(
        "MESSAGE ANALYZER SCORE:",
        result.get("risk_score")
    )

    return result