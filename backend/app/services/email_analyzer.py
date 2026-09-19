import re

from .risk_engine import (
    calculate_risk,
    get_status,
    get_title,
    get_description,
    get_recommendations,
)


SUSPICIOUS_PATTERNS = [
    (
        r"\burgent\b|\bimmediately\b|\baction required\b|\bact now\b|\bwithin \d+ hours?\b",
        "Urgency Language",
        "high",
        "The email uses urgent language to pressure the recipient into acting quickly."
    ),

    (
        r"\bpassword\b|\botp\b|\bpin\b|\bcvv\b|\bverification code\b|\bsecurity code\b",
        "Credential Request",
        "critical",
        "The email appears to request sensitive authentication or financial information."
    ),

    (
        r"\bbank\b|\baccount\b|\bwallet\b|\bpayment\b|\btransaction\b|\brefund\b",
        "Financial Reference",
        "medium",
        "The email contains financial or account-related language."
    ),

    (
        r"\bclick here\b|\bverify now\b|\blogin now\b|\bconfirm now\b|\bopen the link\b",
        "Suspicious Action Request",
        "high",
        "The email asks the recipient to click, verify, log in, or confirm something."
    ),

    (
        r"\bwinner\b|\bprize\b|\breward\b|\blottery\b|\bcash prize\b|\bfree money\b",
        "Prize or Reward Claim",
        "high",
        "The email contains potentially suspicious prize or reward claims."
    ),

    (
        r"\baccount will be closed\b|\baccount will be blocked\b|\blegal action\b|\bsuspended\b",
        "Threat or Account Pressure",
        "high",
        "The email uses threats or account restrictions to pressure the recipient."
    ),
]


def analyze_email(email_text: str):

    if not email_text or not email_text.strip():
        return {
            "risk_score": 0,
            "status": "safe",
            "title": "No Email Content",
            "description": "No email content was provided.",
            "findings": [],
            "recommendations": [
                "Provide email content for analysis."
            ]
        }

    findings = []

    text = email_text.lower()

    # -----------------------------------------
    # Suspicious pattern detection
    # -----------------------------------------

    for pattern, category, severity, description in SUSPICIOUS_PATTERNS:

        if re.search(pattern, text):

            findings.append({
                "category": category,
                "severity": severity,
                "description": description
            })


    # -----------------------------------------
    # URL detection
    # -----------------------------------------

    urls = re.findall(
        r"https?://[^\s<>\"]+",
        email_text
    )

    if urls:

        findings.append({
            "category": "Embedded Link",
            "severity": "medium",
            "description": (
                f"The email contains {len(urls)} web link(s). "
                "Verify the destination before opening them."
            )
        })


    # -----------------------------------------
    # Suspicious URL characteristics
    # -----------------------------------------

    for url in urls:

        lower_url = url.lower()

        suspicious_words = [
            "login",
            "verify",
            "account",
            "password",
            "secure",
            "update",
            "bank",
            "wallet",
        ]

        matched_words = [
            word
            for word in suspicious_words
            if word in lower_url
        ]

        if matched_words:

            findings.append({
                "category": "Suspicious Link Pattern",
                "severity": "high",
                "description": (
                    "A link contains security-sensitive keywords "
                    f"such as: {', '.join(matched_words[:4])}."
                )
            })


    # -----------------------------------------
    # Excessive punctuation
    # -----------------------------------------

    if email_text.count("!") >= 4:

        findings.append({
            "category": "Excessive Punctuation",
            "severity": "low",
            "description": (
                "The email contains unusually high "
                "exclamation-mark usage."
            )
        })


    # -----------------------------------------
    # Excessive capitalization
    # -----------------------------------------

    letters = [
        character
        for character in email_text
        if character.isalpha()
    ]

    uppercase_letters = [
        character
        for character in letters
        if character.isupper()
    ]

    if (
        len(letters) >= 20
        and len(uppercase_letters) / len(letters) > 0.65
    ):

        findings.append({
            "category": "Excessive Capitalization",
            "severity": "medium",
            "description": (
                "A large portion of the email uses "
                "capital letters, which can be used to create urgency."
            )
        })


    # -----------------------------------------
    # Risk calculation
    # -----------------------------------------

    risk = calculate_risk(findings)

    status = get_status(risk)

    title = get_title(risk)

    description = get_description(risk)

    recommendations = get_recommendations(risk)


    return {
        "risk_score": risk,
        "status": status,
        "title": title,
        "description": description,
        "findings": findings,
        "recommendations": recommendations
    }