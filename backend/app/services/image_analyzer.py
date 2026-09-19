import os

from .ocr_service import extract_text_from_image
from .message_analyzer import analyze_message


ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
}


def analyze_image(file_path: str):

    filename = os.path.basename(file_path)
    extension = os.path.splitext(filename)[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        return {
            "risk_score": 25,
            "status": "warning",
            "title": "Unsupported Image Format",
            "description": "The uploaded image format is not supported.",
            "findings": [
                {
                    "category": "File Format",
                    "severity": "medium",
                    "description": (
                        "Only JPG, JPEG, PNG and WEBP images "
                        "are currently supported."
                    )
                }
            ],
            "recommendations": [
                "Upload a JPG, JPEG, PNG or WEBP image."
            ]
        }

    try:
        file_size = os.path.getsize(file_path)

        if file_size == 0:
            return {
                "risk_score": 25,
                "status": "warning",
                "title": "Empty Image File",
                "description": "The uploaded image contains no data.",
                "findings": [
                    {
                        "category": "File Integrity",
                        "severity": "medium",
                        "description": "The uploaded image file is empty."
                    }
                ],
                "recommendations": [
                    "Upload a valid image file."
                ]
            }

        extracted_text = extract_text_from_image(file_path)

        if not extracted_text:
            return {
                "risk_score": 0,
                "status": "safe",
                "title": "No Suspicious Text Detected",
                "description": (
                    "The image was processed successfully, "
                    "but no readable text was detected."
                ),
                "findings": [],
                "recommendations": [
                    "Continue to verify suspicious images "
                    "through trusted sources."
                ]
            }

        result = analyze_message(extracted_text)

        result["description"] = (
            "Text was extracted from the image using OCR "
            "and analyzed for suspicious security indicators."
        )

        return result

    except Exception as error:

        return {
            "risk_score": 40,
            "status": "warning",
            "title": "Image Analysis Incomplete",
            "description": (
                "The image was uploaded, but OCR analysis "
                "could not be completed."
            ),
            "findings": [
                {
                    "category": "OCR Processing",
                    "severity": "medium",
                    "description": str(error)
                }
            ],
            "recommendations": [
                "Try uploading a clearer image.",
                "Make sure the image contains readable text."
            ]
        }