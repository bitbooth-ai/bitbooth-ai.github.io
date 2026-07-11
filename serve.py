# /// script
# requires-python = ">=3.10"
# dependencies = ["fastapi", "uvicorn"]
# ///
"""Preview server for The Witch's Bakery site. Run: uv run serve.py"""
from pathlib import Path

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/", StaticFiles(directory=Path(__file__).parent, html=True), name="site")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
