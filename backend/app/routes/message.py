import uuid

from fastapi import APIRouter

from ..schemas.scan_schema import (
    MessageScanRequest,
    ScanResponse,
    Finding
)

from ..services.message_analyzer import (
    analyze_message
)


router = APIRouter(
    prefix="/api/message",
    tags=["Message Scanner"]
)


@router.post(
    "/scan",
    response_model=ScanResponse
)
async def scan_message(
    request: MessageScanRequest
):

    result = analyze_message(
        request.message
    )

    return ScanResponse(
        scan_id=str(uuid.uuid4()),
        scan_type="message",
        risk_score=result["risk_score"],
        status=result["status"],
        title=result["title"],
        description=result["description"],
        findings=[
            Finding(**finding)
            for finding in result["findings"]
        ],
        recommendations=result[
            "recommendations"
        ]
    )