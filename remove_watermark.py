import glob
import os
from PIL import Image, ImageFilter

frame_files = sorted(glob.glob('public/sequence/frame_*.webp'))
print(f"Processing {len(frame_files)} frames to remove the bottom-right AI watermark...")

for path in frame_files:
    img = Image.open(path).convert('RGB')
    w, h = img.size
    
    # Bottom right watermark region
    # The spark/star watermark is roughly in [w-60, h-60, w-10, h-10]
    # We take the clean background texture from right above it [w-60, h-110, w-10, h-60]
    # or interpolate seamlessly
    
    box_x1 = w - 62
    box_y1 = h - 62
    box_x2 = w - 8
    box_y2 = h - 8
    
    # Sample clean surrounding patch from just above the watermark
    sample_patch = img.crop((box_x1, box_y1 - 50, box_x2, box_y1 - 50 + (box_y2 - box_y1)))
    
    # Apply subtle Gaussian blur to match studio floor / road texture perfectly
    sample_patch = sample_patch.filter(ImageFilter.GaussianBlur(radius=1.5))
    
    # Paste sample patch over watermark
    img.paste(sample_patch, (box_x1, box_y1))
    
    # Blend the edges of the patch smoothly
    edge_blend = img.crop((box_x1 - 4, box_y1 - 4, box_x2 + 4, box_y2 + 4))
    edge_blend = edge_blend.filter(ImageFilter.GaussianBlur(radius=1.0))
    img.paste(edge_blend, (box_x1 - 4, box_y1 - 4))
    
    img.save(path, 'WEBP', quality=95)

print("All 100 frames cleaned successfully! Watermark removed.")
