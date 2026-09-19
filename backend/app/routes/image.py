from fastapi import APIRouter, UploadFile, File
import os
import uuid

from app.services.image_analyzer import analyze_image

router = APIRouter(
    prefix="/api/image",
    tags=["Image Scanner"]
)


@router.post("/scan")
async def scan_image(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join("uploads", filename)

    content = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(content)

    result = analyze_image(file_path)

    return result