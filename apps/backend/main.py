import uuid
from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from typing import List
from asyncio import sleep
import aiofiles

app = FastAPI()


@app.post("/", response_model=List[str])
async def process_video(title: str = Form(...), description: str = Form(...), file: UploadFile = File(...)):
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a video file.")
    
    try:
        unique_filename = f"{uuid.uuid4()}.{file.filename.split('.')[-1]}"

        async with aiofiles.open(f"uploads/{unique_filename}", 'wb') as out_file:
            video_bytes = await file.read()
            await out_file.write(video_bytes)
            
        print(title, description)
        # TODO: эээ процессинг
        # print(video_bytes)
        await sleep(5)

        result = ["Тег1", "Тег2", "Тег3"]

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

