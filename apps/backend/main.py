from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from typing import List

app = FastAPI()


@app.post("/", response_model=List[str])
async def process_video(title: str = Form(...), description: str = Form(...), file: UploadFile = File(...)):
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a video file.")
    
    try:
        video_bytes = await file.read()
        print(title, description)
        # TODO: эээ процессинг
        # print(video_bytes)


        result = ["Тег-1", "Тег-2", "Тег-3"]

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

