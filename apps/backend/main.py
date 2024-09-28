import uuid
from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from typing import List
from asyncio import sleep
import aiofiles
import os

current_directory = os.getcwd()
uploads_directory = os.path.join(current_directory, "../uploads")


import sys
from pathlib import Path

# Добавляем путь к саб-пакету в sys.path чтобы всё работало ибо poetry установить локальный пакет не осилил
sys.path.append(str(Path(__file__).resolve().parent.parent / "av_keywords"))
sys.path.append(str(Path(__file__).resolve().parent.parent))
print(sys.path)

from av_keywords import get_tags

app = FastAPI()


@app.post("/", response_model=List[str])
async def process_video(title: str = Form(...), description: str = Form(...), file: UploadFile = File(...)):
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a video file.")
    
    try:
        unique_filename = f"{uuid.uuid4()}.{file.filename.split('.')[-1]}"

        async with aiofiles.open(os.path.join(uploads_directory, unique_filename), 'wb') as out_file:
            video_bytes = await file.read()
            await out_file.write(video_bytes)
            
        print(title, description)
        # TODO: эээ процессинг
        # print(video_bytes)
        
        result = ["Тег1", "Тег2", "Тег3"]

        return await get_tags(unique_filename, title, description)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

