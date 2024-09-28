from asyncio import sleep
import aiofiles

import os

current_directory = os.getcwd()
uploads_directory = os.path.join(current_directory, "../uploads")

async def get_tags(filename: str, title: str, description: str):
    async with aiofiles.open(os.path.join(uploads_directory, filename), 'rb') as in_file:
        content = await in_file.read()
        
    await sleep(5)
    return ["Аниме>Жанр>Этти", "Аниме>Страна>Северная Корея", filename]