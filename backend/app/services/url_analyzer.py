import re


SUSPICIOUS_KEYWORDS = [
    "login",
    "verify",
    "verification",
    "account",
    "secure",
    "update",
    "password",
    "bank",
    "banking",
    "wallet",
    "payment",
    "claim",
    "reward",
    "prize",
    "free",
    "otp",
    "pin",
    "cvv",
    "urgent",
    "suspended",
    "blocked",
]


def analyze_url(url: str):

    findings = []
    score = 0

    url = url.strip()
    url_lower = url.lower()

    # -------------------------------------------------
    # 1. HTTPS CHECK
    # -------------------------------------------------

    if not url_lower.startswith("https://"):

        findings.append({
            "category": "Connection Security",
            "severity": "medium",
            "description": "The URL does not use HTTPS."
        })

        score += 15

    # -------------------------------------------------
    # 2. SUSPICIOUS KEYWORDS
    # -------------------------------------------------

    detected_keywords = []

    for keyword in SUSPICIOUS_KEYWORDS:

        if keyword in url_lower:
            detected_keywords.append(keyword)

    if len(detected_keywords) >= 5:

        findings.append({
            "category": "Multiple Suspicious Indicators",
            "severity": "critical",
            "description": (
                "The URL contains multiple phishing-related "
                "keywords: "
                + ", ".join(detected_keywords)
            )
        })

        score += 60

    elif len(detected_keywords) >= 3:

        findings.append({
            "category": "Suspicious URL Keywords",
            "severity": "high",
            "description": (
                "The URL contains several suspicious keywords: "
                + ", ".join(detected_keywords)
            )
        })

        score += 45

    elif len(detected_keywords) >= 1:

        findings.append({
            "category": "Suspicious URL Keyword",
            "severity": "medium",
            "description": (
                "The URL contains a suspicious keyword: "
                + ", ".join(detected_keywords)
            )
        })

        score += 25

    # -------------------------------------------------
    # 3. GET HOSTNAME
    # -------------------------------------------------

    hostname = ""

    match = re.search(
        r"https?://([^/:]+)",
        url_lower
    )

    if match:
        hostname = match.group(1)

    # -------------------------------------------------
    # 4. IP ADDRESS CHECK
    # -------------------------------------------------

    if re.match(
        r"^(?:\d{1,3}\.){3}\d{1,3}$",
        hostname
    ):

        findings.append({
            "category": "IP-Based URL",
            "severity": "critical",
            "description": (
                "The URL uses a direct IP address instead "
                "of a normal domain name."
            )
        })

        score += 35

    # -------------------------------------------------
    # 5. MANY SUBDOMAINS
    # -------------------------------------------------

    if hostname.count(".") >= 3:

        findings.append({
            "category": "Domain Structure",
            "severity": "medium",
            "description": (
                "The domain contains an unusually large "
                "number of subdomains."
            )
        })

        score += 10

    # -------------------------------------------------
    # 6. VERY LONG URL
    # -------------------------------------------------

    if len(url) > 150:

        findings.append({
            "category": "URL Length",
            "severity": "medium",
            "description": (
                "The URL is unusually long and contains "
                "a large amount of additional data."
            )
        })

        score += 10

    # -------------------------------------------------
    # 7. SENSITIVE PARAMETERS
    # -------------------------------------------------

    sensitive_parameters = [
        "password",
        "passwd",
        "otp",
        "pin",
        "cvv",
        "card",
        "credential"
    ]

    sensitive_found = []

    for parameter in sensitive_parameters:

        if parameter in url_lower:
            sensitive_found.append(parameter)

    if sensitive_found:

        findings.append({
            "category": "Sensitive Information Request",
            "severity": "critical",
            "description": (
                "The URL contains parameters associated "
                "with sensitive information: "
                + ", ".join(sensitive_found)
            )
        })

        score += 35

    # -------------------------------------------------
    # LIMIT SCORE TO 100
    # -------------------------------------------------

    score = min(score, 100)

    # -------------------------------------------------
    # FINAL RESULT
    # -------------------------------------------------

    if score >= 70:

        status = "danger"

        title = "High Risk Detected"

        description = (
            "Multiple high-risk indicators were detected "
            "in this URL. The link may be associated with "
            "phishing or credential theft."
        )

        recommendations = [
            "Do not open the suspicious link.",
            "Do not enter passwords, OTPs, PINs or banking information.",
            "Verify the website through an official source.",
            "If received through a message or email, verify the sender."
        ]

    elif score >= 40:

        status = "warning"

        title = "Suspicious Activity Detected"

        description = (
            "Some suspicious indicators were detected "
            "in this URL. Proceed carefully."
        )

        recommendations = [
            "Verify the website before taking action.",
            "Do not enter sensitive information.",
            "Avoid clicking unfamiliar links."
        ]

    else:

        status = "safe"

        title = "No Major Threat Detected"

        description = (
            "No major security indicators were detected "
            "by the current URL analysis rules."
        )

        recommendations = [
            "Continue to verify important links before taking action."
        ]

    return {
        "risk_score": score,
        "status": status,
        "title": title,
        "description": description,
        "findings": findings,
        "recommendations": recommendations
    }