
$path = "d:\website\VAVI HTML DEC\pages\pre-wedding.html"
$content = Get-Content $path -Raw
# Define the new content
$newContent = @"
                        <div class="slides__wrapper">
                            <div class="slides">
                                <!-- slide 1 -->
                                <div class="slide" data-current="">
                                    <div class="slide__inner">
                                        <div class="slide--image__wrapper">
                                            <img alt="Unique Concepts" class="slide--image"
                                                src="../assets/img/Prewed/prewed_slider/slide1.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="slide__bg" data-current=""
                                    style="--bg: url(../assets/img/Prewed/prewed_slider/slide1.jpg); --dir: 0">
                                </div>
                                <!-- slide 2 -->
                                <div class="slide" data-next="">
                                    <div class="slide__inner">
                                        <div class="slide--image__wrapper">
                                            <img alt="Scripted Narratives" class="slide--image"
                                                src="../assets/img/Prewed/prewed_slider/slide2.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="slide__bg" data-next=""
                                    style="--bg: url(../assets/img/Prewed/prewed_slider/slide2.jpg); --dir: 1">
                                </div>
                                <!-- slide 3 -->
                                <div class="slide" data-next-2="">
                                    <div class="slide__inner">
                                        <div class="slide--image__wrapper">
                                            <img alt="Soulful Song Selection" class="slide--image"
                                                src="../assets/img/Prewed/prewed_slider/slide3.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="slide__bg" data-next-2=""
                                    style="--bg: url(../assets/img/Prewed/prewed_slider/slide3.jpg);">
                                </div>
                                <!-- slide 4 -->
                                <div class="slide">
                                    <div class="slide__inner">
                                        <div class="slide--image__wrapper">
                                            <img alt="Picture-Perfect Styles" class="slide--image"
                                                src="../assets/img/Prewed/prewed_slider/slide4.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="slide__bg"
                                    style="--bg: url(../assets/img/Prewed/prewed_slider/slide4.jpg);">
                                </div>
                                <!-- slide 5 -->
                                <div class="slide">
                                    <div class="slide__inner">
                                        <div class="slide--image__wrapper">
                                            <img alt="Outfit and Makeup" class="slide--image"
                                                src="../assets/img/Prewed/prewed_slider/slide5.JPG" />
                                        </div>
                                    </div>
                                </div>
                                <div class="slide__bg"
                                    style="--bg: url(../assets/img/Prewed/prewed_slider/slide5.JPG);">
                                </div>
                                <!-- slide 6 -->
                                <div class="slide">
                                    <div class="slide__inner">
                                        <div class="slide--image__wrapper">
                                            <img alt="Stunning Locations" class="slide--image"
                                                src="../assets/img/Prewed/prewed_slider/slide6.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="slide__bg"
                                    style="--bg: url(../assets/img/Prewed/prewed_slider/slide6.jpg);">
                                </div>
                                <!-- slide 7 -->
                                <div class="slide">
                                    <div class="slide__inner">
                                        <div class="slide--image__wrapper">
                                            <img alt="Cinematography Excellence" class="slide--image"
                                                src="../assets/img/Prewed/prewed_slider/slide7.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="slide__bg"
                                    style="--bg: url(../assets/img/Prewed/prewed_slider/slide7.jpg);">
                                </div>
                                <!-- slide 8 -->
                                <div class="slide" data-previous-2="">
                                    <div class="slide__inner">
                                        <div class="slide--image__wrapper">
                                            <img alt="Flawless Photography" class="slide--image"
                                                src="../assets/img/Prewed/prewed_slider/slide8.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="slide__bg" data-previous-2=""
                                    style="--bg: url(../assets/img/Prewed/prewed_slider/slide8.jpg);">
                                </div>
                                <!-- slide 9 -->
                                <div class="slide" data-previous="">
                                    <div class="slide__inner">
                                        <div class="slide--image__wrapper">
                                            <img alt="Why Choose Us" class="slide--image"
                                                src="../assets/img/Prewed/prewed_slider/slide9.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="slide__bg" data-previous=""
                                    style="--bg: url(../assets/img/Prewed/prewed_slider/slide9.jpg); --dir: -1">
                                </div>
                            </div>
                            <div class="slides--infos">
                                <!-- Slide Info 1 -->
                                <div class="slide-info" data-current="">
                                    <div class="slide-info__inner">
                                        <div class="slide-info--text__wrapper">
                                            <div class="slide-info--text" data-title="">
                                                <span>Unique Concepts</span>
                                            </div>
                                            <div class="slide-info--text" data-subtitle="">
                                                <span>Personalized</span>
                                            </div>
                                            <div class="slide-info--text" data-description="">
                                                <span>Crafting narratives reflecting your journey.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Slide Info 2 -->
                                <div class="slide-info" data-next="">
                                    <div class="slide-info__inner">
                                        <div class="slide-info--text__wrapper">
                                            <div class="slide-info--text" data-title="">
                                                <span>Scripted Narratives</span>
                                            </div>
                                            <div class="slide-info--text" data-subtitle="">
                                                <span>Poetic</span>
                                            </div>
                                            <div class="slide-info--text" data-description="">
                                                <span>Designing romantic or playful stories.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Slide Info 3 -->
                                <div class="slide-info" data-next-2="">
                                    <div class="slide-info__inner">
                                        <div class="slide-info--text__wrapper">
                                            <div class="slide-info--text" data-title="">
                                                <span>Soulful Songs</span>
                                            </div>
                                            <div class="slide-info--text" data-subtitle="">
                                                <span>Atmosphere</span>
                                            </div>
                                            <div class="slide-info--text" data-description="">
                                                <span>Curated soundtracks amplifying emotion.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Slide Info 4 -->
                                <div class="slide-info">
                                    <div class="slide-info__inner">
                                        <div class="slide-info--text__wrapper">
                                            <div class="slide-info--text" data-title="">
                                                <span>Picture Perfect</span>
                                            </div>
                                            <div class="slide-info--text" data-subtitle="">
                                                <span>Timeless</span>
                                            </div>
                                            <div class="slide-info--text" data-description="">
                                                <span>A blend of candid and editorial styles.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Slide Info 5 -->
                                <div class="slide-info">
                                    <div class="slide-info__inner">
                                        <div class="slide-info--text__wrapper">
                                            <div class="slide-info--text" data-title="">
                                                <span>Expert Styling</span>
                                            </div>
                                            <div class="slide-info--text" data-subtitle="">
                                                <span>Details</span>
                                            </div>
                                            <div class="slide-info--text" data-description="">
                                                <span>Collaborating to match looks seamlessly.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Slide Info 6 -->
                                <div class="slide-info">
                                    <div class="slide-info__inner">
                                        <div class="slide-info--text__wrapper">
                                            <div class="slide-info--text" data-title="">
                                                <span>Stunning Locations</span>
                                            </div>
                                            <div class="slide-info--text" data-subtitle="">
                                                <span>Majestic</span>
                                            </div>
                                            <div class="slide-info--text" data-description="">
                                                <span>Venues enhancing your love story beauty.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Slide Info 7 -->
                                <div class="slide-info">
                                    <div class="slide-info__inner">
                                        <div class="slide-info--text__wrapper">
                                            <div class="slide-info--text" data-title="">
                                                <span>Cinematography</span>
                                            </div>
                                            <div class="slide-info--text" data-subtitle="">
                                                <span>Dynamic</span>
                                            </div>
                                            <div class="slide-info--text" data-description="">
                                                <span>Motion storytelling with cinematic brilliance.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Slide Info 8 -->
                                <div class="slide-info" data-previous-2="">
                                    <div class="slide-info__inner">
                                        <div class="slide-info--text__wrapper">
                                            <div class="slide-info--text" data-title="">
                                                <span>Flawless Photos</span>
                                            </div>
                                            <div class="slide-info--text" data-subtitle="">
                                                <span>Emotion</span>
                                            </div>
                                            <div class="slide-info--text" data-description="">
                                                <span>Capturing raw artistic moments masters.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Slide Info 9 -->
                                <div class="slide-info" data-previous="">
                                    <div class="slide-info__inner">
                                        <div class="slide-info--text__wrapper">
                                            <div class="slide-info--text" data-title="">
                                                <span>Why Choose Us</span>
                                            </div>
                                            <div class="slide-info--text" data-subtitle="">
                                                <span>Masterpiece</span>
                                            </div>
                                            <div class="slide-info--text" data-description="">
                                                <span>Turning your journey into unforgettable art.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="slider--btn slider--btn__next">
                                <svg fill="none" height="24" stroke="currentColor"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewbox="0 0 24 24" width="24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </button>
                        </div>
"@

$startMarker = '<div class="slides__wrapper">'
$endMarker = '<div class="text-container"'

$startIndex = $content.IndexOf($startMarker)
$endIndex = $content.IndexOf($endMarker)

if ($startIndex -ge 0 -and $endIndex -ge 0) {
    $finalContent = $content.Substring(0, $startIndex) + $newContent + "`r`n" + (" " * 56) + $content.Substring($endIndex)
    Set-Content -Path $path -Value $finalContent -NoNewline -Encoding UTF8
    Write-Host "Success"
} else {
    Write-Host "Markers not found"
}
