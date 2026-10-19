from pathlib import Path
import re
ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'dist' if (ROOT / 'dist' / 'index.html').exists() else ROOT
page = OUT / 'index.html'
source = page.read_text()
source = re.sub(r'<!-- FW HOME PHOTOS START -->.*?<!-- FW HOME PHOTOS END -->', '', source, flags=re.S)
snippet = (ROOT / 'homepage-photos.html').read_text()
heading = source.find('<h2', source.find('<main'))
end = source.find('</section>', heading)
if end < 0: raise RuntimeError('Homepage photo insertion point not found')
end += len('</section>')
page.write_text(source[:end] + snippet + source[end:])
