$pagesDir = "d:\website\VAVI HTML DEC\pages"
$logoHtml = @"
                        <div class="footer-logo" style="margin-bottom: 20px;">
                            <img src="../assets/img/logo2.png" alt="Logo 2" class="logo-3d" style="max-width: 100px;">
                        </div>
"@

$files = Get-ChildItem -Path $pagesDir -Filter "*.html"
foreach ($file in $files) {
    echo "Processing $($file.Name)..."
    $content = Get-Content -Path $file.FullName -Raw
    
    # We are replacing the existing footer-logo block with the one containing class="logo-3d"
    # The existing block looks like:
    # <div class="footer-logo" ...>
    #     <img src="../assets/img/logo2.png" alt="Logo 2" style="max-width: 100px;">
    # </div>
    
    # Start simply by replacing the whole block if found.
    if ($content -match '<div class="footer-logo"[\s\S]*?</div>') {
        $content = $content -replace '<div class="footer-logo"[\s\S]*?</div>', $logoHtml
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  Applied 3D class to $($file.Name)"
    }
    else {
        Write-Host "  Skipped $($file.Name) (Logo block not found)"
    }
}
