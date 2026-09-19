from pydantic import BaseModel
from typing import List


class URLScanRequest(BaseModel):
    url: str


class MessageScanRequest(BaseModel):
    message: str


class EmailScanRequest(BaseModel):
    email: str


class Finding(BaseModel):
    category: str
    severity: str
    description: str


class ScanResponse(BaseModel):
    risk_score: int
    status: str
    title: str
    description: str
    findings: List[Finding]
    recommendations: List[str]