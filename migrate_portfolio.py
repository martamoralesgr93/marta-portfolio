import os
import shutil
from pathlib import Path

# Instalar Pillow si no está disponible
try:
    from PIL import Image
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def convert_to_webp(src_path, dest_dir):
    """Convierte una imagen a webp y la guarda en el directorio destino."""
    src = Path(src_path)
    dest = Path(dest_dir) / (src.stem + '.webp')
    if src.exists():
        with Image.open(src) as img:
            img.save(dest, 'WEBP')
        print(f"Converted {src.name} to {dest.name}")
        # Eliminar archivo original
        src.unlink()
        return True
    else:
        print(f"Warning: {src} not found.")
        return False

def create_structure(base_path, folders, with_content=True):
    base = Path(base_path)
    base.mkdir(parents=True, exist_ok=True)
    
    # Crear metadata y case-study base
    (base / 'metadata.json').write_text('{\n  "title": "",\n  "description": ""\n}', encoding='utf-8')
    (base / 'case-study.md').write_text('# Case Study\n', encoding='utf-8')
    
    for f in folders:
        folder_path = base / f
        folder_path.mkdir(parents=True, exist_ok=True)
        if with_content:
            (folder_path / 'content.md').write_text(f'# {f.split("-", 1)[-1].capitalize()}\n', encoding='utf-8')

def main():
    root = Path('c:/Users/mmora/Desktop/Marta Morales — Product Designer_files')
    
    # --- 1. Offer Component Redesign ---
    offer_path = root / 'projects/ilunion/offer-component-redesign'
    offer_folders = [
        '01-context', '02-problem', '03-research', '04-hypothesis', 
        '05-design', '06-responsive', '07-results', '08-business-impact'
    ]
    create_structure(offer_path, offer_folders)
    
    # Crear subcarpetas de imagenes
    (offer_path / '01-context/images').mkdir(exist_ok=True)
    (offer_path / '02-problem/images').mkdir(exist_ok=True)
    (offer_path / '03-research/images').mkdir(exist_ok=True)
    (offer_path / '04-hypothesis/images').mkdir(exist_ok=True)
    (offer_path / '05-design/images').mkdir(exist_ok=True)
    (offer_path / '06-responsive/images').mkdir(exist_ok=True)
    (offer_path / '07-results/images').mkdir(exist_ok=True)
    (offer_path / '08-business-impact/images').mkdir(exist_ok=True)
    
    # Mover y convertir imagenes
    old_compo = root / 'ILUNION/COMPONENTE'
    convert_to_webp(old_compo / 'auditoria-compo-ilunion-1.png', offer_path / '02-problem/images')
    convert_to_webp(old_compo / 'auditoria-compo-ilunion-2.png', offer_path / '02-problem/images')
    
    convert_to_webp(old_compo / 'WIREFRAMES/wire-home-desk.png', offer_path / '05-design/images')
    convert_to_webp(old_compo / 'WIREFRAMES/wire-home-mobile.png', offer_path / '05-design/images')
    convert_to_webp(old_compo / 'Compo-desk.png', offer_path / '05-design/images')
    convert_to_webp(old_compo / 'Compo-mobile.png', offer_path / '05-design/images')
    
    # --- 2. Motor Destino ---
    motor_path = root / 'projects/ilunion/cro-optimization/motor-destino'
    create_structure(motor_path, offer_folders, with_content=False) # The structure given didn't explicitly show content.md for motor-destino, but we'll create them for consistency or omit if strict
    
    # Ensure images folders
    (motor_path / '02-problem/images').mkdir(exist_ok=True)
    (motor_path / '05-design/images').mkdir(exist_ok=True)
    
    old_motor = root / 'ILUNION/CRO/MOTOR-DESTINO'
    convert_to_webp(old_motor / 'antes-desk-motor.png', motor_path / '02-problem/images')
    convert_to_webp(old_motor / 'antes-exp-motor-movil.png', motor_path / '02-problem/images')
    convert_to_webp(old_motor / 'compo-result-desk.png', motor_path / '05-design/images')
    convert_to_webp(old_motor / 'compo-result-mobile.png', motor_path / '05-design/images')

    # --- 3. Clean up the specific directories that were migrated ---
    if old_compo.exists():
        try:
            shutil.rmtree(old_compo)
            print(f"Removed {old_compo}")
        except Exception as e:
            print(f"Could not remove {old_compo}: {e}")
            
    if old_motor.exists():
        try:
            shutil.rmtree(old_motor)
            print(f"Removed {old_motor}")
        except Exception as e:
            print(f"Could not remove {old_motor}: {e}")
            
    print("Migration finished successfully.")

if __name__ == "__main__":
    main()
