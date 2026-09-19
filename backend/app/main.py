from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings

from app.routes import (
    url,
    message,
    email,
    image,
    video,
    qr,
    scan
)


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI Suraksha Kavach cybersecurity scanning API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(url.router)
app.include_router(message.router)
app.include_router(email.router)
app.include_router(image.router)
app.include_router(video.router)
app.include_router(qr.router)
app.include_router(scan.router)


@app.get("/")
def root():
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
        "message": "AI Suraksha Kavach API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }