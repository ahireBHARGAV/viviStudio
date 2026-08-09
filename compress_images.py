import os
from PIL import Image

def compress_images(directory, max_size_kb=500, max_width=1920):
    for root, dirs, files in os.walk(directory):
        if "VAVI HTML DEC" in root:
            continue
            
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(root, file)
                size_kb = os.path.getsize(filepath) / 1024
                
                if size_kb > max_size_kb:
                    try:
                        with Image.open(filepath) as img:
                            print(f"Compressing: {filepath} ({size_kb:.1f} KB)")
                            original_format = img.format
                            
                            # Resize if too wide
                            if img.width > max_width:
                                ratio = max_width / img.width
                                new_size = (max_width, int(img.height * ratio))
                                img = img.resize(new_size, Image.Resampling.LANCZOS)
                                
                            # Save with optimization
                            if file.lower().endswith('.png'):
                                img.save(filepath, format='PNG', optimize=True)
                            else:
                                img.save(filepath, format='JPEG', optimize=True, quality=80)
                                
                        new_size_kb = os.path.getsize(filepath) / 1024
                        print(f" -> New size: {new_size_kb:.1f} KB")
                    except Exception as e:
                        print(f"Error compressing {filepath}: {e}")

if __name__ == "__main__":
    compress_images("assets/img", max_size_kb=800)
