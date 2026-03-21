$pagesDir = "d:\website\VAVI HTML DEC\pages"

# Regex pattern to match the logo block, including preceding whitespace/newlines
$pattern = '(\s*)<div class="footer-logo" style="margin-bottom: 20px;">[\s\S]*?</div>'

$files = Get-ChildItem -Path $pagesDir -Filter "*.html"
foreach ($file in $files) {
    echo "Processing $($file.Name)..."
    $content = Get-Content -Path $file.FullName -Raw
    
    $regex = [regex]::new($pattern)
    $matches = $regex.Matches($content)
    
    if ($matches.Count -gt 1) {
        echo "  Found $($matches.Count) occurrences. Removing the first one (Header)."
        # Remove the first match
        # We replace the text range of the first match with empty string
        $match = $matches[0]
        $content = $content.Remove($match.Index, $match.Length)
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    }
    elseif ($matches.Count -eq 1) {
        $match = $matches[0]
        if ($match.Index -lt 3000) {
            # Adjusted threshold for header
            echo "  Only one match, but at index $($match.Index) (Header). Removing it."
            $content = $content.Remove($match.Index, $match.Length)
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        }
        else {
            echo "  Only one match at index $($match.Index). Leaving it (Footer)."
        }
    }
    else {
        echo "  No matches found."
    }
}
