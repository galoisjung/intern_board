import React, {Component, useEffect, useState} from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Update from "./Update";
import Write from "./Write";
import {Reply} from "./Reply";
import {COMMENT} from "./config";


/**
 * BoardList class
 */
class ReplyView extends Component {
    state = {
        replyList: [],
    };

    getList = (props) => {
        Axios.get(COMMENT.REPLAYLIST + "/" + `${this.props.aid}`)
            .then((res) => {
                const data = res.data;
                this.setState({
                    replyList: data,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };
    delCom = (prop) => {
        Axios.post(COMMENT.DELETE + "/" + `${this.props.aid}`, {id: prop}
        ).then((res) => {
            window.location.reload()
        })
            .catch((e) => {
                console.error(e);
            });
    }
    Board = (
        rid,
        reply,
        uploader,
        date,
    ) => {
        return (
            <tr key={rid}>
                <td>{reply}</td>
                <td>{uploader}</td>
                <td>{date}</td>
                <button id={rid} style={{marginLeft: '1%', background: "red"}} className="link-btn"
                        onClick={() => this.delCom(rid)}>X
                </button>
            </tr>
        )
            ;
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
                            return (

                                this.Board(
                                    v.id,
                                    v.content,
                                    v.creator,
                                    v.create_date,
                                )


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