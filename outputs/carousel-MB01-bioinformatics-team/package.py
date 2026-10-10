from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json, shutil, zipfile
root=Path(__file__).parent
plan=json.loads((root.parent/'marvel-basics-plan-2026-10-08/plan-content.json').read_text())[0]
paths=json.loads((root/'generated-paths.json').read_text())
visuals=[
'Nick Fury holds a question-mark dossier beside a board with six recruit portraits.',
'An illustrated notebook shows a DNA double helix and two illustrative sequence strips with one differing base highlighted. A note states that variants alone do not establish phenotype or causation.',
'An illustrated research desk holds an RNA ribbon model and message slips.',
'A sculptural folded protein with small spherical modification markers stands on a research workbench.',
'Bruce Banner studies three small containers at a laboratory bench, with conceptual metabolite icons below.',
'Two panels show a diverse microbial community and a folded protein ribbon model.',
'Nick Fury stands beside a six-row reference board matching DNA to genomics, RNA to transcriptomics, proteins to proteomics, metabolites to metabolomics, community DNA to metagenomics, and 3D molecules to structural bioinformatics.'
]
manifest={'id':'MB01','title':plan['title'],'status':'Created; not published or scheduled','generation':'Built-in image_gen','creative_change':'Character renders for cards 2, 3, 4 and 6 were rejected by the image service. Those cards use original scientific illustrations. Cards 1, 5 and 7 retain Marvel characters.','cards':[]}
thumbs=[];alts=[]
for i,src in enumerate(paths,1):
    name=f'card-{i:02}.png'
    shutil.copy2(src,root/'originals'/name)
    im=Image.open(src).convert('RGB')
    native=im.size
    # Size-only publishing derivative: preserve all artwork, no crop.
    resized=ImageOps.contain(im,(1080,1350),Image.Resampling.LANCZOS)
    final=Image.new('RGB',(1080,1350),'#F7F2E8')
    final.paste(resized,((1080-resized.width)//2,(1350-resized.height)//2))
    final.save(root/name)
    thumbs.append(final.resize((270,338),Image.Resampling.LANCZOS))
    c=plan['cards'][i-1]
    alt=f'Card {i} of 7. {c[0]} {c[1].replace(chr(10)," ")} {visuals[i-1]} Ivory, maroon and muted-green editorial design, branded ANGSUMI and @angsumi.online.'
    alts.append(f'{name}\n{alt}')
    manifest['cards'].append({'file':name,'original':f'originals/{name}','native_dimensions':native,'publishing_dimensions':[1080,1350],'resize':'Proportional fit with at most 1px ivory padding, no crop','alt_text':alt})
preview=Image.new('RGB',(4*290,2*380),'#F7F2E8');draw=ImageDraw.Draw(preview)
for j,t in enumerate(thumbs):
    x=(j%4)*290+10;y=(j//4)*380+10
    preview.paste(t,(x,y));draw.text((x,y+345),f'CARD {j+1:02}',fill='#6F2437')
preview.save(root/'preview-gallery.jpg',quality=92)
(root/'alt-text.txt').write_text('\n\n'.join(alts)+'\n')
caption=plan['caption'].replace('The Avengers recruitment board is a memory aid; these are overlapping fields, not six sealed boxes.','The recruitment board is a memory aid. These fields overlap, and this is a starter map rather than an exhaustive list. All molecular drawings and sequence snippets are illustrative, not experimental results.')
(root/'captions.txt').write_text(caption+'\n\n'+plan['tags']+'\n')
(root/'search-phrases.txt').write_text(plan['search']+'\n')
(root/'manifest.json').write_text(json.dumps(manifest,indent=2))
sources='''Scientific references checked during planning on 8 October 2026

General fields, genome variation and proteomics:
https://www.ebi.ac.uk/training/online/courses/methods-in-bioinformatics/introduction/

RNA abundance and expression analysis:
https://bioconductor.org/packages/release/bioc/vignettes/DESeq2/inst/doc/DESeq2.html

Metabolomics:
https://www.ebi.ac.uk/training/online/courses/metabolomics-introduction/what-is-metabolomics/

Metagenomics:
https://www.ebi.ac.uk/training/materials/genome-resolved-metagenomics-bioinformatics-materials/intro/

Structural bioinformatics:
https://www.ebi.ac.uk/training/events/structural-bioinformatics-2026/

Brand source: brand-and-strategy/ANGSUMI_Content_Persona_Brand_Plan.docx and AGENTS.md.
All artwork is conceptual. No dataset was analysed. Character appearances are fictional teaching devices.
'''
(root/'sources.txt').write_text(sources)
with zipfile.ZipFile(root/'ANGSUMI_MB01_Bioinformatics_Team.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in sorted(root.iterdir()):
        if p.suffix in ['.png','.txt','.json','.jpg'] and p.name!='generated-paths.json':z.write(p,p.name)
    for p in sorted((root/'originals').glob('*.png')):z.write(p,'originals/'+p.name)
assert len(list(root.glob('card-*.png')))==7
assert all(Image.open(p).size==(1080,1350) for p in root.glob('card-*.png'))
print(json.dumps({'cards':7,'dimensions':[1080,1350],'original_dimensions':[1122,1402],'zip':str(root/'ANGSUMI_MB01_Bioinformatics_Team.zip')}))
