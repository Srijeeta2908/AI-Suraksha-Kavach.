from fastapi import APIRouter


router = APIRouter(
    prefix="/api/scan",
    tags=["General Scan"]
)


@router.get("/health")
async def scan_health():
    return {
        "status": "ok",
        "service": "scan-engine"
    }