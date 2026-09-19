import re

from .risk_engine import (
    calculate_risk,
    get_status,
    get_title,
    get_description
)


SCAM_PATTERNS = [
    (
        r"\bwon\b|\bwinner\b|\bprize\b|\breward\b",
        "Prize or reward language",
        "medium"
    ),

    (
        r"\burgent\b|\bimmediately\b|\bact now\b",
        "Urgency pressure",
        "medium"
    ),

    (
        r"\bpassword\b|\botp\b|\bpin\b|\bcvv\b",
        "Request for sensitive credentials",
        "high"
    ),

    (
        r"\bbank\b|\baccount suspended\b|\bverify account\b",
        "Financial/account pressure",
        "high"
    ),

    (
        r"\bclick here\b|\bclick the link\b|\bopen this link\b",
        "Suspicious call-to-action",
        "medium"
    )
]


def analyze_message(message: str):

    indicators = []

    lower_message = message.lower()

    for pattern, category, severity in SCAM_PATTERNS:

        if re.search(
            pattern,
            lower_message
        ):
            indicators.append({
                "category": category,
                "description": (
                    f"The message contains language "
                    f"associated with {category.lower()}."
                ),
                "severity": severity
            })

    # URL detection
    urls = re.findall(
        r"https?://[^\s]+",
        message
    )

    if urls:
        indicators.append({
            "category": "External Link",
            "description": (
                "The message contains an external URL."
            ),
            "severity": "medium"
        })

    # Excessive capitalization
    letters = [
        char for char in message
        if char.isalpha()
    ]

    if len(letters) > 20:

        uppercase_count = sum(
            char.isupper()
            for char in letters
        )

        uppercase_ratio = (
            uppercase_count / len(letters)
        )

        if uppercase_ratio > 0.45:

            indicators.append({
                "category": "Aggressive Formatting",
                "description": (
                    "The message uses unusually high "
                    "levels of capitalization."
                ),
                "severity": "low"
            })

    risk_score = calculate_risk(indicators)

    return {
        "risk_score": risk_score,
        "status": get_status(risk_score),
        "title": get_title(risk_score),
        "description": get_description(risk_score),
        "findings": indicators,
        "recommendations": get_recommendations(
            risk_score
        )
    }


def get_recommendations(score: int):

    if score >= 70:
        return [
            "Do not click links in the message.",
            "Never share OTPs, PINs or passwords.",
            "Verify the sender independently.",
            "Report the message if it appears fraudulent."
        ]

    if score >= 40:
        return [
            "Verify the sender before responding.",
            "Avoid clicking unexpected links.",
            "Do not share sensitive information."
        ]

    return [
        "Remain cautious with unexpected messages.",
        "Verify unusual requests independently."
    ]