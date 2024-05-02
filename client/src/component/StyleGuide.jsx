import React from "react";

function StyleGuide () {
    return (<>
        

    <div id="style_guide" className="content-wrap">
        <h2 className="title">STYLE GUIDE</h2>

        <div className="content">
            <div>
                <div className="title">COLOR</div>

                <div className="box-wrap">
                    <div className="main">
                        <div className="box light">MAIN - LIGHT</div>                                                                
                        <div className="box">MAIN</div>                        
                        <div className="box dark">MAIN - DARK</div>                        
                    </div>                

                    <div className="sub">                      
                        <div className="box light">SUB - LIGHT</div>
                        <div className="box">SUB</div>
                        <div className="box dark">SUB - DARK</div>
                    </div>

                    <div className="highlight">
                        <div className="box light">HIGHLIGHT - LIGHT</div>
                        <div className="box">HIGHLIGHT</div>                       
                        <div className="box dark">HIGHLIGHT - DARK</div>
                        <div className="box red">HIGHLIGHT - RED</div>    
                    </div>    
                                            
                    <div className="gray">
                        <div className="box light">GRAY - LIGHT</div>
                        <div className="box">GRAY</div>
                        <div className="box dark">GRAY - DARK</div>                        
                        <div className="box green">GRAY - GREEN</div>                        
                    </div>
                </div>
            </div>    
        </div>    

        <div className="content">
            <div className="title">FORM(.form)</div>

            <div className="content">
                <div className="">
                    <form action="" className="form">
                        <input type="text" placeholder="아이디를 입력하세요."/>
                        <input type="password" placeholder="비밀번호를 입력하세요."/>
                        <select name="" id="">
                            <option value="">기본값</option>
                            <option value="">값1</option>
                            <option value="">값2</option>
                        </select>

                        <button type="button" className="btn">btn</button>
                        <button type="button" className="btn main">btn main</button>
                        <button type="button" className="btn main bold">btn main bold</button>
                        <button type="button" className="btn sub">btn sub</button>
                        <button type="button" className="btn highlight">btn highlight</button>

                        <p>.btn-wrap.row</p>
                        <div className="btn-wrap row">
                            <button type="button" className="btn">btn</button>
                            <button type="button" className="btn">btn</button>
                        </div>
                        
                        <p>버튼 너비</p>    
                        <button type="button" className="btn half">btn half 50%</button>
                        <button type="button" className="btn over">btn over 75%</button>
                        <button type="button" className="btn full">btn full 100%</button>
                    </form>
                </div>
            </div>
        </div>
    </div>    
</>
    );
}

export default StyleGuide;


