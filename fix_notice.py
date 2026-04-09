import glob

html_files = glob.glob('*.html') + glob.glob('pages/*.html')

# The issue: there's an extra </div> closing the .row BEFORE the notice column div.
# We need to:
# 1. Remove that extra </div> so the notice column is INSIDE the row
# 2. Add display:flex; align-items:flex-start to the row so columns line up horizontally

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'VAVI STUDIOS INVITES SKILLED PHOTOGRAPHERS' not in content:
        continue

    # Fix the spurious closing </div> that appears between the info column and notice column.
    # Pattern: the info col ends with </div>, then immediately a stray </div> closes the row,
    # then the notice div starts.
    # We look for this exact sequence and remove the extra </div>
    bad_seq  = '                        </div>\n                        </div>\n                        <div class="col-sm-12 col-md-5 col-xs-b30 col-sm-0">'
    good_seq = '                        </div>\n                        <div class="col-sm-12 col-md-5 col-xs-b30 col-sm-0" style="display:flex; align-items:stretch;">'

    if bad_seq in content:
        content = content.replace(bad_seq, good_seq)
        # Also make the row a flexbox container so cols align side by side
        content = content.replace(
            '<div class="row">\n                        <div class="col-md-2 col-xs-b30 col-sm-0">\n                            <nav',
            '<div class="row" style="display:flex; flex-wrap:wrap; align-items:flex-start;">\n                        <div class="col-md-2 col-xs-b30 col-sm-0">\n                            <nav'
        )
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'{file}: Fixed')
    else:
        print(f'{file}: Pattern not found (may already be fixed or different structure)')
