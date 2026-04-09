import glob
import re
import os

html_files = glob.glob('*.html') + glob.glob('pages/*.html')

# Patterns to match the Gallery nav link (both index.html and pages/ variants)
patterns = [
    # <li>\n  <a href="pages/portfolio.html">Gallery</a>\n</li>
    r'<li>\s*\n?\s*<a href="pages/portfolio\.html">Gallery</a>\s*\n?\s*</li>\s*\n?',
    # <li>\n  <a href="portfolio.html">Gallery</a>\n</li>
    r'<li>\s*\n?\s*<a href="portfolio\.html">Gallery</a>\s*\n?\s*</li>\s*\n?',
]

for f in html_files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    original = content
    for pat in patterns:
        content = re.sub(pat, '', content)
    
    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        print(f'{f}: Removed Gallery link')
    else:
        print(f'{f}: No Gallery link found')

# Delete portfolio.html
portfolio_path = 'pages/portfolio.html'
if os.path.exists(portfolio_path):
    os.remove(portfolio_path)
    print(f'\nDeleted {portfolio_path}')
else:
    print(f'\n{portfolio_path} not found')
