import sys
import io

new_content = """            <!-- EVENTS COLLECTION -->
            <div class="empty-space col-xs-b55 col-sm-b110"></div>
            <div class="text-center">
                <div class="h2 small"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important; line-height: 1em;">EVENTS WE COVER</b></div>
                <div class="title-line"><span></span></div>
            </div>
            <div class="empty-space col-xs-b35 col-sm-b70"></div>
            <div class="portfolio-4-wrapper">
                <div class="row nopadding">
                    <!-- Event 1 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/10.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">CULTURAL & RELIGIOUS EVENTS</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">CULTURAL & RELIGIOUS EVENTS</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Capturing the devotion and vibrant spirit of cultural gatherings.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 2 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/16.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">CONCERTS & LIVE SHOWS</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">CONCERTS & LIVE SHOWS</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Electrifying visuals mapping the energy of live performances.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 3 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/5.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">BIRTHDAY & PRIVATE PARTIES</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">BIRTHDAY & PRIVATE PARTIES</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Documenting joyful milestones and intimate private events.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 4 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/8.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">SOCIAL GATHERINGS & CELEBRATIONS</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">SOCIAL GATHERINGS & CELEBRATIONS</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Beautiful memories of get-togethers and social functions.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 5 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/11.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">FESTIVE EVENTS</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">FESTIVE EVENTS</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Joyful moments highlighting your favorite festive traditions.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 6 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/13.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">COLLEGE EVENTS & YOUTH FESTIVALS</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">COLLEGE EVENTS & YOUTH FESTIVALS</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Dynamic shots of youth festivals and high-energy campus events.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 7 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/content/socialM_reels.JPG);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">DJ NIGHTS & CLUB EVENTS</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">DJ NIGHTS & CLUB EVENTS</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Fast-paced, vibrant photography for music and nightlife.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 8 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/14.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">STAGE PERFORMANCES & COMPETITIONS</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">STAGE PERFORMANCES & COMPETITIONS</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Crisp captures of dramatic acts and competitive events.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 9 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/3.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">BABY SHOOT OUTDOOR</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">BABY SHOOT OUTDOOR</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Natural, candid portraits for your little ones in open spaces.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 10 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/1.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">MATERNITY</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">MATERNITY</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Elegant and timeless memories immortalizing motherhood.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 11 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/gallery/6.jpg);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">POST WEDDING</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">POST WEDDING</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Romantic and relaxed shots celebrating your new beginnings.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- Event 12 -->
                    <div class="col-sm-6 col-md-4">
                        <div class="homepage-portfolio-preview-1">
                            <a href="#">
                                <span class="background full-size" style="background-image: url(../assets/img/content/corp.JPG);"></span>
                                <span class="label h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">CORPORATE EVENTS</b></span>
                                <span class="text">
                                    <span class="h4 light"><b style="font-family: 'Cormorant Garamond', serif; font-weight: 800 !important;">CORPORATE EVENTS</b></span>
                                    <span class="empty-space col-xs-b15"></span>
                                    <span class="simple-article large light transparent">Professional imagery for business conferences and corporate gatherings.</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>\n"""

file_path = "c:\\Users\\sai\\Desktop\\vavi\\pages\\events.html"

with io.open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

start_index = 175 # line 176
end_index = 497 # line 497 inclusive (up to index 496, wait index 496 is line 497, so 497 is not included)
# Let's verify line numbers:
# line 175 is `        <div>`
# line 176 is `            <!-- FAMILY & PERSONAL EVENTS -->`
# line 497 is `            </div>` which ends `.portfolio-4-wrapper`
# line 498 is ` `
# So we want to replace from index 175 (line 176) to index 497 (line 497) meaning we slice [0:175] + new_content + [497:]

with io.open(file_path, "w", encoding="utf-8") as f:
    f.writelines(lines[:175])
    f.write(new_content)
    f.writelines(lines[497:])

print("File updated.")
