import React from "react";

function StyleGuide () {
    return (<>
        

    <div id="styleguide" className="content-wrap">
        <h2 class="title">STYLE GUIDE</h2>

        <div class="content">
            <div>
                <div class="title">COLOR</div>

                <div class="box-wrap">
                    <div class="main">
                        <div class="box light">MAIN - LIGHT</div>
                        <div class="box">MAIN</div>
                        <div class="box dark">MAIN - DARK</div>
                    </div>

                    <div class="sub">
                        <div class="box light">SUB - LIGHT</div>
                        <div class="box">SUB</div>
                        <div class="box dark">SUB - DARK</div>
                    </div>

                    <div class="highlight">
                        <div class="box light">HIGHLIGHT - LIGHT</div>
                        <div class="box">HIGHLIGHT</div>
                        <div class="box dark">HIGHLIGHT - DARK</div>
                    </div>

                    <div class="gray">
                        <div class="box light">GRAY - LIGHT</div>
                        <div class="box">GRAY</div>
                        <div class="box dark">GRAY - DARK</div>
                    </div>
                </div>
            </div>    
        </div>    

        <div>
            <div class="title">FORM(.form)</div>

            <div class="content">
                <div class="">
                    <form action="" class="form">
                        <input type="text" placeholder="아이디를 입력하세요."><br/>
                        <input type="password" placeholder="비밀번호를 입력하세요."><br/>
                        <select name="" id="">
                            <option value="">기본값</option>
                            <option value="">값1</option>
                            <option value="">값2</option>
                        </select><br/>

                        <button type="button" class="btn">btn</button>
                        <button type="button" class="btn main">btn main</button>
                        <button type="button" class="btn main bold">btn main bold</button>
                        <button type="button" class="btn sub">btn sub</button>
                        <button type="button" class="btn highlight">btn highlight</button>

                        <p>.btn-wrap.row</p>
                        <div class="btn-wrap row">
                            <button type="button" class="btn">btn</button>
                            <button type="button" class="btn">btn</button>
                        </div>
                        
                        <p>버튼 너비</p>    
                        <button type="button" class="btn half">btn half 50%</button>
                        <button type="button" class="btn over">btn over 75%</button>
                        <button type="button" class="btn full">btn full 100%</button>
                    </form>
                </div>
            </div>
        </div>
    </div>    
</>
    );
}


