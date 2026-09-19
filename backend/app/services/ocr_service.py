import pytesseract
from PIL import Image


# Windows Tesseract OCR installation path
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text_from_image(file_path: str) -> str:
    """
    Extract readable text from an image using Tesseract OCR.
    """

    try:
        image = Image.open(file_path)

        text = pytesseract.image_to_string(image)

        return text.strip()

    except Exception as error:
        raise RuntimeError(
            f"OCR processing failed: {str(error)}"
        )