import re
import os
import base64
from PIL import Image
import io

with open('Itzfizz — Aetheris, driven by your scroll.html', 'r', encoding='utf-8') as f:
    html = f.read()

frames = re.findall(r'data:image/webp;base64,[A-Za-z0-9+/=]+', html)
print(f"Total frame sequences found: {len(frames)}")

os.makedirs('public/sequence', exist_ok=True)

for i, frame_data in enumerate(frames):
    header, b64_str = frame_data.split(';base64,')
    img_bytes = base64.b64decode(b64_str)
    img = Image.open(io.BytesIO(img_bytes))
    img.save(f'public/sequence/frame_{i:03d}.webp', 'WEBP')

print(f"Extracted {len(frames)} frames into public/sequence/")
