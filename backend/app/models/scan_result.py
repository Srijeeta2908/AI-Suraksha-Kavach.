from dataclasses import dataclass, field
from typing import List


@dataclass
class ScanFinding:
    category: str
    description: str
    severity: str


@dataclass
class ScanResult:
    scan_id: str
    scan_type: str
    risk_score: int
    status: str
    title: str
    description: str

    findings: List[ScanFinding] = field(
        default_factory=list
    )

    recommendations: List[str] = field(
        default_factory=list
    )