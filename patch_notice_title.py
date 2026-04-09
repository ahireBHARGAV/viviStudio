import glob

html_files = glob.glob('*.html') + glob.glob('pages/*.html')

old = '<div class="h4 small">NOTICE</div>'
new = '<div class="h4 small" style="color: #000; font-weight: bold;">NOTICE !!</div>'

for f in html_files:
    content = open(f, encoding='utf-8').read()
    if old in content:
        open(f, 'w', encoding='utf-8').write(content.replace(old, new))
        print(f + ': Updated')
