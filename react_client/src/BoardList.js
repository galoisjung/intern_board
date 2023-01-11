import { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Board = ({
    id,
    title,
    registerId,
    registerDate,
}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{title}</td>
            <td>{registerId}</td>
            <td>{registerDate}</td>
        </tr>
    );
};

/**
 * BoardList class
 */
class BoardList extends Component {
    state = {
        boardList: [],
    };

    getList = () => {
        Axios.get("http://localhost:5000/board/list", {})
            .then((res) => {
                console.log(res.data)
                const data  = res.data;
                this.setState({
                    boardList: data,
                });
                console.log(this.state.boardList)
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
        const { boardList } = this.state;

        return (
            <div>
                <div style={{
                    backgroundColor:'#46536B',
                    paddingTop: '7px',
                    // width: '100vh',
                    color: 'white',
                    height: '30px',
                    justifyContent:'center',
                    borderRadius: '999px'
                    }}>Contents</div>
                <Table align="center" position="relative" width='800vmin20vw'>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // eslint-disable-next-line
                            this.state.boardList.map((v) => {
                                console.log(v)
                                return (
                                    
                                    <Board
                                        id={v.BOARD_ID}
                                        title={v.BOARD_TITLE}
                                        // registerId={v.REGISTER_ID}
                                        // registerDate={v.REGISTER_DATE}
                                        // key={v.BOARD_ID}
                                    />
                                );
                            }
                            
                            )
                            }
                    </tbody>
                </Table>
                {/* <Button variant="secondary">수정하기</Button>
                <Button variant="danger">삭제하기</Button>
                <Button variant="info">글쓰기</Button> */}
            </div>
        );
    }
}

export default BoardList;