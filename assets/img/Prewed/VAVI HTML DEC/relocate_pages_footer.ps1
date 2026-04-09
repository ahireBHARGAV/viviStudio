$pagesDir = "d:\website\VAVI HTML DEC\pages"
$logoHtml = @"
                        <div class="footer-logo" style="margin-bottom: 20px;">
                            <img src="../assets/img/VAVI STUDIOS.png" alt="Vavi Studios" style="max-width: 100px; margin-right: 15px;">
                            <img src="../assets/img/logo2.png" alt="Logo 2" style="max-width: 100px;">
                        </div>
"@

$files = Get-ChildItem -Path $pagesDir -Filter "*.html"
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # 1. Remove the old logo block we added (it was in the left column)
    # The regex tries to match the div we added.
    # Note: We used a specific style, so we can match on that.
    $content = $content -replace '<div class="footer-logo"[\s\S]*?</div>\s*', ''
    
    # 2. Insert into the new location: Right column, before Copyright
    # We look for <div class="copyright"> and loop to make sure we are in the text-right column context if possible
    # But since these files are consistent, finding <div class="copyright"> appearing after "Follow us" is key.
    
    # In pages/*.html, "Follow us" and "Copyright" are adjacent in the code.
    # Structure:
    # <div class="follow style-1">...</div>
    # <div class="empty-space col-xs-b15"></div>
    # <div class="copyright">...</div>
    
    if ($content.Contains('<div class="copyright">')) {
        $target = '<div class="copyright">'
        # We assume the last occurrence or the one in the footer is what we want. 
        # Since we are doing replace, we rely on the specific string.
        # It's safer to target the specific structure in the footer.
        
        # Insert BEFORE copyright
        $replacement = $logoHtml + "`r`n" + '                        ' + $target
        $content = $content.Replace($target, $replacement)
        
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Relocated logo in $($file.Name)"
    }
    else {
        Write-Host "Skipped $($file.Name) (Copyright div not found)"
    }
}
