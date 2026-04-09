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
    
    # Check if the file already has the footer-logo div (from previous run)
    if ($content -match '<div class="footer-logo"[\s\S]*?</div>') {
        # Replace existing footer-logo div with new one containing both logos
        $content = $content -replace '<div class="footer-logo"[\s\S]*?</div>', $logoHtml
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name) (Replaced existing logo block)"
    }
    # If not, check for the address block to insert before it
    elseif ($content.Contains('<div class="h5 small" style="color: #222;"><b>ADDRESS</b></div>')) {
        $target = '<div class="h5 small" style="color: #222;"><b>ADDRESS</b></div>'
        $replacement = $logoHtml + "`r`n" + '                                ' + $target
        $newContent = $content.Replace($target, $replacement)
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Updated $($file.Name) (Inserted new logo block)"
    }
    else {
        Write-Host "Skipped $($file.Name) (Pattern not found)"
    }
}
