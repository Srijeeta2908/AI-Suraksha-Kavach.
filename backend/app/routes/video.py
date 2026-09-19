from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.video_analyzer import analyze_video

router = APIRouter(
    prefix="/api/video",
    tags=["Video Scanner"]
)


@router.post("/scan")
async def scan_video(file: UploadFile = File(...)):
    content = await file.read()

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Empty video file."
        )

    return analyze_video(
        file.filename or "unknown",
        content
    )