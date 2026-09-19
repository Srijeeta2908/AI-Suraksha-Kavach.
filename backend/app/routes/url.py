import uuid

from fastapi import APIRouter

from ..schemas.scan_schema import (
    URLScanRequest,
    ScanResponse,
    Finding
)

from ..services.url_analyzer import (
    analyze_url
)


router = APIRouter(
    prefix="/api/url",
    tags=["URL Scanner"]
)


@router.post(
    "/scan",
    response_model=ScanResponse
)
async def scan_url(
    request: URLScanRequest
):

    result = analyze_url(request.url)

    return ScanResponse(
        scan_id=str(uuid.uuid4()),
        scan_type="url",
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