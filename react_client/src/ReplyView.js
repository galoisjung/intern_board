import React, {Component, useEffect, useState} from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Update from "./Update";
import Write from "./Write";
import {Reply} from "./Reply";


const Board = ({
                   rid,
                   reply,
                   uploader,
                   date,

               }) => {
    return (
        <tr>
            <td>{reply}</td>
            <td>{uploader}</td>
            <td>{date}</td>
            <button id={rid} style={{marginLeft: '1%', background: "red"}} className="link-btn"
                    onClick={()=>delCom(rid)}>X
            </button>
        </tr>
    )
        ;
};

const delCom = (v) => {
    console.log(v)
}

/**
 * BoardList class
 */
class ReplyView extends Component {
    state = {
        replyList: [],
    };

    getList = (props) => {
        Axios.get(`http://localhost:5000/comment/${this.props.aid}`)
            .then((res) => {
                console.log(res.data)
                const data = res.data;
                this.setState({
                    replyList: data,
                });
                console.log(data)
            })
            .catch((e) => {
                console.error(e);
            });
    };


    /**
     */
    componentDidMount() {
        this.getList();
    }

    /**
     * @return {Component} Component
     */
    render() {
        // eslint-disable-next-line
        const {replyList} = this.state;

        return (
            <div>
                <div style={{
                    backgroundColor: '#46536B',
                    paddingTop: '7px',
                    // width: '100vh',
                    color: 'white',
                    height: '30px',
                    justifyContent: 'center',
                    borderRadius: '999px'
                }}>Comment
                </div>
                <Table align="center" position="relative" width='100%'>
                    <tbody>
                    {
                        // eslint-disable-next-line
                        Object.values(this.state.replyList).map((v) => {
                            console.log(v)
                            return (

                                <Board
                                    rid={v.id}
                                    reply={v.content}
                                    uploader={v.creator}
                                    date={v.create_date}
                                    // registerDate={v.REGISTER_DATE}

                                />

                            );
                        })
                    }
                    </tbody>
                </Table>
                {/* <Button style={{marginLeft: '90vh'}} onClick={() => window.location.href = "/write"}>글쓰기</Button>  */}
                {/* <Button variant="secondary">수정하기</Button>
                <Button variant="danger">삭제하기</Button>
                <Button variant="info">글쓰기</Button> */}
            </div>
        );
    }
}

export default ReplyView;