SEVERITY_POINTS = {
    "critical": 35,
    "high": 25,
    "medium": 15,
    "low": 5
}


def calculate_risk(findings):
    score = 0

    for finding in findings:
        severity = finding.get("severity", "low").lower()
        score += SEVERITY_POINTS.get(severity, 0)

    return min(score, 100)


def get_status(score):
    if score >= 70:
        return "danger"

    if score >= 40:
        return "warning"

    return "safe"


def get_title(score):
    if score >= 70:
        return "High Risk Detected"

    if score >= 40:
        return "Suspicious Activity Detected"

    return "No Major Threat Detected"


def get_description(score):
    if score >= 70:
        return (
            "Multiple high-risk indicators were detected. "
            "Avoid interacting with the suspicious content."
        )

    if score >= 40:
        return (
            "Some suspicious indicators were detected. "
            "Proceed carefully and verify the source."
        )

    return (
        "No major security indicators were detected "
        "by the current analysis rules."
    )


def get_recommendations(score):
    if score >= 70:
        return [
            "Do not click suspicious links.",
            "Do not share passwords, OTPs, PINs or banking information.",
            "Verify the source through an independent channel."
        ]

    if score >= 40:
        return [
            "Verify the sender or website before taking action.",
            "Avoid sharing sensitive information.",
            "Do not click unfamiliar links."
        ]

    return [
        "Continue to verify important requests before taking action."
    ]