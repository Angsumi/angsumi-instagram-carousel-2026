from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json, shutil, zipfile
r=Path(__file__).parent
old=r.parent/'carousel-MB01-bioinformatics-team'
updates=json.loads((r/'updates.json').read_text())
manifest=json.loads((old/'manifest.json').read_text())
manifest['status']='Partial revision. Requested Ant-Man and Vision edits blocked by image service; not published.'
manifest['creative_change']='Card 2 now features Shuri. Card 3 draft features Loki. Cards 1, 4, 5, 6 and 7 preserved from version 1. Ant-Man on card 6 and Vision on card 4 could not be generated.'
manifest['review_note']='Card 3 central model is single-stranded, but small paper symbols resemble double helices. The requested correction was blocked. Treat card 3 as a draft pending correction.'
thumbs=[]
for i in range(1,8):
    n=f'card-{i:02}.png';src=Path(updates[str(i)]) if str(i) in updates else old/'originals'/n
    shutil.copy2(src,r/'originals'/n)
    im=Image.open(src).convert('RGB');fit=ImageOps.contain(im,(1080,1350),Image.Resampling.LANCZOS)
    out=Image.new('RGB',(1080,1350),'#F7F2E8');out.paste(fit,((1080-fit.width)//2,(1350-fit.height)//2));out.save(r/n)
    thumbs.append(out.resize((270,338),Image.Resampling.LANCZOS))
    manifest['cards'][i-1]['native_dimensions']=list(im.size)
    if i==2:manifest['cards'][i-1]['alt_text']='Card 2 of 7. Genomics: what is in the DNA? Shuri studies an illustrated DNA notebook at a research desk. Text explains that genomics studies genome sequence, genes and variation, and asks which DNA variants differ between samples. A note states that variants alone do not establish phenotype or causation. ANGSUMI branding and ivory, maroon and green colors.'
    if i==3:manifest['cards'][i-1]['alt_text']='Draft card 3 of 7. Transcriptomics: which RNAs change? Loki conjures illustrated message slips over a wavy molecular ribbon model. Text explains RNA abundance and transcript patterns, asks which genes show different RNA levels between conditions, and states that RNA levels do not directly measure protein activity. The small drawings on message slips require scientific correction.'
preview=Image.new('RGB',(1160,800),'#F7F2E8');d=ImageDraw.Draw(preview)
d.text((10,8),'PARTIAL REVISION: cards 2 and 3 updated; card 3 needs symbol correction. Ant-Man render blocked.',fill='#6F2437')
for j,im in enumerate(thumbs):
    x=j%4*290+10;y=j//4*380+35;preview.paste(im,(x,y));d.text((x,y+343),f'CARD {j+1:02}',fill='#6F2437')
preview.save(r/'preview-gallery.jpg',quality=92)
for name in ['captions.txt','sources.txt','search-phrases.txt']:shutil.copy2(old/name,r/name)
(r/'manifest.json').write_text(json.dumps(manifest,indent=2))
(r/'alt-text.txt').write_text('\n\n'.join(c['file']+'\n'+c['alt_text'] for c in manifest['cards']))
(r/'REVISION-NOTES.txt').write_text(manifest['creative_change']+'\n\n'+manifest['review_note']+'\n\nBuilt-in image_gen used. Originals retained. Native images 1122x1402; publishing copies 1080x1350 with proportional resizing and no crop.\n')
with zipfile.ZipFile(r/'ANGSUMI_MB01_Partial_Revision.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in r.iterdir():
        if p.suffix in ['.png','.jpg','.txt','.json'] and p.name!='updates.json':z.write(p,p.name)
    for p in (r/'originals').glob('*.png'):z.write(p,'originals/'+p.name)
assert all(Image.open(r/f'card-{i:02}.png').size==(1080,1350) for i in range(1,8))
print('Saved seven-card partial revision; cards 2 and 3 updated, limitations documented.')
