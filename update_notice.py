import os
import glob
import re

html_files = glob.glob('*.html') + glob.glob('pages/*.html')

new_notice_html = '''<div class="col-sm-6 col-md-4 col-md-offset-1 col-xs-b30 col-sm-0" style="display: flex; align-items: stretch; margin-bottom: 30px;">
                            <div class="simple-article light transparent" style="border: 1px solid rgba(255,255,255,0.2); padding: 40px; background: rgba(0,0,0,0.4); border-radius: 12px; width: 100%; display: flex; flex-direction: column; justify-content: center;">
                                <div class="h4 small text-center" style="color: #fff; letter-spacing: 2px;">CREATIVE COLLABORATION</div>
                                <div class="empty-space col-xs-b20"></div>
                                <p style="text-transform: uppercase; font-size: 13px; line-height: 1.8; margin-bottom: 20px;">
                                    AS WE SCALE NEW HEIGHTS, VAVI STUDIOS INVITES SKILLED PHOTOGRAPHERS, CINEMATOGRAPHERS AND VIDEO EDITORS TO BE PART OF OUR CREATIVE JOURNEY.
                                </p>
                                <p style="text-transform: uppercase; font-size: 13px; line-height: 1.8; margin-bottom: 0;">
                                    IF YOU’RE DRIVEN BY PASSION AND CREATIVITY, WE’D LOVE TO HEAR FROM YOU. FRESHERS ARE WELCOME TOO — LET’S TEAM UP, CREATE SOMETHING EXTRAORDINARY, AND GROW TOGETHER.
                                </p>
                            </div>
                        </div>'''

# Pattern to find the current notice box we added previously
# It starts with: <div class="col-sm-6 col-md-4 col-md-offset-1 col-xs-b30 col-sm-0">
# and contains: VAVI STUDIOS INVITES SKILLED
pattern = re.compile(r'<div class="col-sm-6 col-md-4 col-md-offset-1 col-xs-b30 col-sm-0">\s*<div class="simple-article light transparent" style="border: 1px solid rgba\(255,255,255,0\.2\); padding: 30px; background: rgba\(0,0,0,0\.2\); border-radius: 8px;">.*?</div>\s*</div>', re.DOTALL)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace the notice box html with our flex styled one
    if pattern.search(content):
        content = pattern.sub(new_notice_html, content)
        
        # 2. Make the row display:flex so columns sit perfectly side by side and stretch equally
        # The row is usually exactly:
        # <div class="row">
        #       <div class="col-md-2 col-xs-b30 col-sm-0">
        #           <nav
        # Or similar. We will look for <div class="row"> just after <div class="container"> inside the overlay.
        
        # We can find the overlay block first:
        overlay_start = content.find('<div class="overlay" data-rel="1">')
        if overlay_start != -1:
            row_start = content.find('<div class="row">', overlay_start)
            if row_start != -1 and row_start < overlay_start + 1000:
                # Replace that specific `<div class="row">` with a flex one
                content = content[:row_start] + '<div class="row" style="display: flex; flex-wrap: wrap;">' + content[row_start+17:]
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'{file}: Updated flex layout')
