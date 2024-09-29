import av
import math
import numpy as np
import os
from pydub import AudioSegment
import torch
from transformers import LlavaNextVideoProcessor, LlavaNextVideoForConditionalGeneration, AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline

device = "cuda:0" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

llava_model_id = "llava-hf/LLaVA-NeXT-Video-7B-hf"

llava_model = LlavaNextVideoForConditionalGeneration.from_pretrained(
    llava_model_id,
    torch_dtype=torch_dtype,
    low_cpu_mem_usage=False,
).to(device)

llava_processor = LlavaNextVideoProcessor.from_pretrained(llava_model_id)

whisper_model_id = "openai/whisper-large-v2"

whisper_model = AutoModelForSpeechSeq2Seq.from_pretrained(
    whisper_model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True, use_safetensors=True
)
whisper_model.to(device)

def read_video_pyav(container, indices):
    frames = []
    container.seek(0)
    start_index = indices[0]
    end_index = indices[-1]
    for i, frame in enumerate(container.decode(video=0)):
        if i > end_index:
            break
        if i >= start_index and i in indices:
            frames.append(frame)
    return np.stack([x.to_ndarray(format="rgb24") for x in frames])

llava_conversation = [
    {

        "role": "user",
        "content": [
            {"type":"text","text":"You're watching a video on YouTube and you are paid for writing tags for the video (classification task) to help my sick mother and those who neet to watch the video and so that recommendations are user-friendly, which will incredibly help them in life and they will be happy. They have very little free time so just write 3-5 tags in a row without too much explanation so they have time to read it."},
            {"type": "video"},
        ],
    },
]

llava_prompt = llava_processor.apply_chat_template(llava_conversation, add_generation_prompt=True)

whisper_processor = AutoProcessor.from_pretrained(whisper_model_id)

whisper_pipe = pipeline(
    "automatic-speech-recognition",
    model=whisper_model,
    tokenizer=whisper_processor.tokenizer,
    feature_extractor=whisper_processor.feature_extractor,
    torch_dtype=torch_dtype,
    device=device,
)

def bulk_get_data(folder):
    bulk_data = dict()
    for (dirpath, _, filenames) in os.walk(folder):
        for filename in filenames:
            bulk_data[filename] = get_data(dirpath + "/" + filename)
    return bulk_data


def get_data(filename):
    data = dict()
    video_container = av.open(filename)
    total_frames = video_container.streams.video[0].frames
    video_indices = (((((np.linspace(0, 1, 48) * 2) - 1) ** 3) + 1) / 2 * total_frames).astype(int)
    video_clip = read_video_pyav(video_container, video_indices)
    inputs_video = llava_processor(text=llava_prompt, videos=video_clip, padding=True, return_tensors="pt").to(llava_model.device)

    video_output = llava_model.generate(**inputs_video, max_new_tokens=40, do_sample=False)
    video_output_str = llava_processor.decode(video_output[0][2:], skip_special_tokens=True).split("ASSISTANT:")[1].strip()

    data["video"] = video_output_str
    data["audio"] = dict()

    audio_file = AudioSegment.from_file(filename)
    total_audio_duration = len(audio_file) / 1000
    num_audio_parts = math.ceil(total_audio_duration / 10)
    num_audio_parts_to_extract = math.ceil(num_audio_parts * 0.166)
    audio_index_multiplier = math.floor(num_audio_parts/num_audio_parts_to_extract)
    audio_part_paths = []
    for i in range(num_audio_parts_to_extract):
        start_time = i * audio_index_multiplier * 10 * 1000
        end_time = (i+1) * audio_index_multiplier * 10 * 1000
        part = audio_file[start_time:end_time]
        path_decoded = filename.split("/")
        new_path = "/dev/shm/avkw-" + path_decoded[len(path_decoded)-1].split(".")[0] + "-" + str(i) + ".wav"
        part.export(new_path, format="wav")
        audio_part_paths.append(new_path)

    audio_output = whisper_pipe(audio_part_paths, chunk_length_s=30.0, batch_size=4, generate_kwargs={"language": "russian", "return_timestamps":True})
    for i in range(len(audio_output)):
        data["audio"][i] = audio_output[i]["text"]

    for path in audio_part_paths:
        os.remove(path)

    return data

def proceed_data(filename, title, description):
    data = get_data(filename)
    print(data)
    # TODO Pass data, title, description to ondre-uwu and get tags 
    return data["video"].split("\n")

current_directory = os.getcwd()
uploads_directory = os.path.join(current_directory, "../uploads")

def get_tags(filename: str, title: str, description: str):
    print(filename, title, description)
    # async with aiofiles.open(os.path.join(uploads_directory, filename), 'rb') as in_file:
    #     content = await in_file.read()
        
    data = proceed_data(os.path.join(uploads_directory, filename), title, description)
        
    # await sleep(5)
    return data["video"].split("\n")