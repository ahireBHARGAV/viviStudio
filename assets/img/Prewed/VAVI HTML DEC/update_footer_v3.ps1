$pagesDir = "d:\website\VAVI HTML DEC\pages"
$logoHtml = @"
                        <div class="footer-logo" style="margin-bottom: 20px;">
                            <img src="../assets/img/logo2.png" alt="Logo 2" style="max-width: 100px;">
                        </div>
"@

$files = Get-ChildItem -Path $pagesDir -Filter "*.html"
foreach ($file in $files) {
    echo "Processing $($file.Name)..."
    $content = Get-Content -Path $file.FullName -Raw
    
    # 1. Remove the old logo block (wherever it is)
    # The previous block might have two imgs or one, so we match generically on class="footer-logo"
    if ($content -match '<div class="footer-logo"[\s\S]*?</div>') {
        $content = $content -replace '<div class="footer-logo"[\s\S]*?</div>\s*', ''
        echo "  Removed old logo block."
    }
    
    # 2. Insert new logo block BEFORE "Follow us"
    # Target: <div class="follow style-1">
    if ($content.Contains('<div class="follow style-1">')) {
        $target = '<div class="follow style-1">'
        $replacement = $logoHtml + "`r`n" + '                        ' + $target
        $content = $content.Replace($target, $replacement)
        
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  Updated placement in $($file.Name)"
    }
    else {
        Write-Host "  Skipped $($file.Name) ('Follow us' div not found)"
    }
}
