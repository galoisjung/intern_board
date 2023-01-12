import React, {useState} from "react";
import axios from "axios";
import ReplyView from "./ReplyView";


export const Reply = (props) => {

    const [comment, setComment] = useState('')
    const [aid] = useState(props.aid)


    function write() {

        let data = {
            reply: comment,
        }

        axios.post(`http://localhost:5000/comment/${aid}/create`,
            data, {
                headers: {
                    "Content-Type": "application/json",
                    "Connection": "keep-alive"
                },
            })
            .then((res) => {
                window.location.reload()
            })
    }

    return (
        <div>
            <ReplyView aid={aid}/>
            <input style={{width: '85%'}} value={comment} onChange={(e) => setComment(e.target.value)} type="Reply"
                   placeholder="댓글을 달아주세요" id="Reply" name="Reply"/>
            <button style={{marginLeft: '1%'}} className="link-btn"
                    onClick={() => write()}>댓글달기
            </button>
        </div>
    )
}