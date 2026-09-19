import os
import cv2
import tempfile

from .ocr_service import extract_text_from_image
from .message_analyzer import analyze_message


def analyze_video(filename: str, content: bytes):

    # -----------------------------------------
    # CHECK FILE
    # -----------------------------------------

    if not content:
        return {
            "risk_score": 40,
            "status": "warning",
            "title": "Empty Video File",
            "description": "The uploaded video contains no data.",
            "findings": [
                {
                    "category": "File Integrity",
                    "severity": "medium",
                    "description": "The uploaded video file is empty."
                }
            ],
            "recommendations": [
                "Upload a valid video file."
            ]
        }

    # -----------------------------------------
    # CREATE TEMPORARY VIDEO FILE
    # -----------------------------------------

    suffix = os.path.splitext(filename)[1].lower()

    if not suffix:
        suffix = ".mp4"

    temp_video = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix
    )

    temp_video.write(content)
    temp_video.close()

    video_path = temp_video.name

    try:

        # -----------------------------------------
        # OPEN VIDEO
        # -----------------------------------------

        video = cv2.VideoCapture(video_path)

        if not video.isOpened():

            return {
                "risk_score": 40,
                "status": "warning",
                "title": "Unable to Read Video",
                "description": (
                    "The uploaded video could not be opened "
                    "for analysis."
                ),
                "findings": [
                    {
                        "category": "Video Processing",
                        "severity": "medium",
                        "description": (
                            "The video format could not be processed."
                        )
                    }
                ],
                "recommendations": [
                    "Upload a valid MP4 video.",
                    "Try converting the video to MP4."
                ]
            }

        # -----------------------------------------
        # VIDEO INFORMATION
        # -----------------------------------------

        fps = video.get(cv2.CAP_PROP_FPS)

        frame_count = video.get(
            cv2.CAP_PROP_FRAME_COUNT
        )

        if fps <= 0:
            fps = 25

        duration = 0

        if frame_count > 0:
            duration = frame_count / fps

        # Analyze approximately one frame every 2 seconds
        frame_interval = int(fps * 2)

        if frame_interval <= 0:
            frame_interval = 1

        current_frame = 0

        extracted_texts = []

        # -----------------------------------------
        # CREATE TEMPORARY FRAME DIRECTORY
        # -----------------------------------------

        with tempfile.TemporaryDirectory() as frame_dir:

            while True:

                success, frame = video.read()

                if not success:
                    break

                # Select frames
                if current_frame % frame_interval == 0:

                    frame_path = os.path.join(
                        frame_dir,
                        f"frame_{current_frame}.jpg"
                    )

                    cv2.imwrite(
                        frame_path,
                        frame
                    )

                    try:

                        text = extract_text_from_image(
                            frame_path
                        )

                        if text and text.strip():

                            extracted_texts.append(
                                text.strip()
                            )

                    except Exception:
                        pass

                current_frame += 1

        video.release()

        # -----------------------------------------
        # NO TEXT FOUND
        # -----------------------------------------

        if not extracted_texts:

            return {
                "risk_score": 0,
                "status": "safe",
                "title": "No Suspicious Text Detected",
                "description": (
                    "The video was processed successfully, "
                    "but no readable text was detected "
                    "in the analyzed frames."
                ),
                "findings": [],
                "recommendations": [
                    "Continue to verify suspicious videos "
                    "through trusted sources."
                ]
            }

        # -----------------------------------------
        # COMBINE OCR TEXT
        # -----------------------------------------

        combined_text = "\n".join(
            extracted_texts
        )

        # -----------------------------------------
        # ANALYZE TEXT
        # -----------------------------------------

        result = analyze_message(
            combined_text
        )

        # -----------------------------------------
        # UPDATE DESCRIPTION
        # -----------------------------------------

        result["description"] = (
            "Text was extracted from multiple video "
            "frames using OCR and analyzed for "
            "suspicious security indicators."
        )

        # -----------------------------------------
        # ADD VIDEO INFORMATION
        # -----------------------------------------

        result["video_duration_seconds"] = round(
            duration,
            2
        )

        result["frames_analyzed"] = len(
            extracted_texts
        )

        return result

    finally:

        # -----------------------------------------
        # DELETE TEMPORARY VIDEO
        # -----------------------------------------

        if os.path.exists(video_path):

            try:
                os.remove(video_path)
            except Exception:
                pass