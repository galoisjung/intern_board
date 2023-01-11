import React, {useState} from "react";
import axios from 'axios';
import {useCookies} from "react-cookie";
import BoardList from './BoardList';
import Write from "./Write";
import Button from "react-bootstrap/esm/Button";


export const Hello = (props) => {
    const [cookies,setCookie,removeCookie] = useCookies(['session_key'])
    
    axios.post('http://localhost:5000/api/phishing/check',
        cookies["session_key"])

    const [isWriting, setWriting] = useState(['False'])


    function onLogout(e) {
        e.preventDefault();

        // let data = {
        //     id: ID,
        //     pw: pass,
        // }

        axios.post('http://localhost:5000/api/phishing/logout',
            JSON.stringify(cookies["session_key"]), {
                headers: {
                    "Content-Type": `application/json`,
                },
            }).then((res) => {
                console.log(res)
                // setCookie('session_key', {
                //     "session_key": res.data.session_key,
                //     "user_id": ID
                // }
                // )
            })
            removeCookie('session_key')
            window.location.href = "/"
        }
        
    return (
        <div className="article-board">
            {/* <div className="login-form"> */}
                {isWriting === 'True' ? <div><Write>
                </Write>
                
                <Button onClick={() => setWriting('False')}>취소</Button>
                {/* <Button style={{marginLeft: '55vw'}} onClick={() => setWriting('False')}>작성완료</Button> */}
            
                 </div>
                 : 
                 <div><BoardList></BoardList>
                 
                    <div style={{
                    justifyContent: 'space-between',
                    // backgroundColor: 'red'
                }}>
                        <button className="link-btn" onClick={onLogout}>
                        <text>로그아웃</text>
                        </button>
                        <Button style={{marginLeft: '90vh'}} onClick={() => setWriting('True')}>글쓰기</Button>
                    </div>
                 {/* <Button>수정하기</Button>
                 <Button>삭제하기</Button> */}
                 </div>
            }
                
                {/* <Write></Write> */}
                {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>d</button> */}
            {/* </div> */}
        </div>
    )
}