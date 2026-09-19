from fastapi import APIRouter
from app.schemas.scan_schema import EmailScanRequest, ScanResponse
from app.services.email_analyzer import analyze_email

router = APIRouter(
    prefix="/api/email",
    tags=["Email Scanner"]
)


@router.post("/scan", response_model=ScanResponse)
def scan_email(request: EmailScanRequest):
    result = analyze_email(request.email)

    return result