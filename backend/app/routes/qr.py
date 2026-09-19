from fastapi import APIRouter, UploadFile, File
import os
import uuid

from app.services.qr_analyzer import (
    decode_qr_from_image,
    analyze_qr_content,
)


router = APIRouter(
    prefix="/api/qr",
    tags=["QR Scanner"]
)


@router.post("/scan")
async def scan_qr(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join("uploads", filename)

    content = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(content)

    try:
        decoded_data = decode_qr_from_image(file_path)

        result = analyze_qr_content(decoded_data)

        # Add decoded QR information to the response
        result["decoded_data"] = decoded_data

        return result

    except Exception as error:

        return {
            "risk_score": 40,
            "status": "warning",
            "title": "QR Analysis Incomplete",
            "description": str(error),
            "findings": [
                {
                    "category": "QR Processing",
                    "severity": "medium",
                    "description": str(error)
                }
            ],
            "recommendations": [
                "Make sure the QR code is clearly visible.",
                "Upload a higher-quality QR image.",
                "Avoid blurry or heavily distorted QR codes."
            ]
        }

    finally:
        # Remove temporary uploaded file
        if os.path.exists(file_path):
            os.remove(file_path)