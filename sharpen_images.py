from PIL import Image, ImageFilter
import os

# Root folder containing all art subfolders
root_folder = "images"

# Loop through all subfolders and files
for subdir, dirs, files in os.walk(root_folder):
    for file in files:
        if file.lower().endswith(('.jpg','.png')):
            path = os.path.join(subdir, file)
            img = Image.open(path)
            # Apply sharpening
            img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
            # Save (overwrite original or save as new)
            img.save(path)
            print(f"Processed: {path}")
