import {Component, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Axios from "axios";

// export const Update = (props) => {
//     const [title, setTitle] = useState([props.title])
//     const [content, setContent] = useState([props.content])
// }


class Update extends Component {

    state = {
        aid: this.props.aid,
        subject: this.props.title,
        content: this.props.content,
    }
    update = () => {

        Axios.post("http://localhost:5000/board/update",
            this.state
        ).then(() => {
            window.location.href = "/board"
        }).catch((e) => {
            console.error(e);
        });

    };

    // eslint-disable-next-line
    handleChange = (e) => {
        this.setState({

            [e.target.id]: e.target.value,

        });
    };


    render() {
        return (
            <div>
                <Form.Group className="mb-3" controlId="subject">
                    <Form.Control style={{width: '72vw'}} type="text" onChange={this.handleChange}
                                  defaultValue={this.props.title}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Control style={{width: '72vw', height: '20vw', borderRadius: '20px', padding: '1rem'}}
                                  as="textarea" onChange={this.handleChange} defaultValue={this.props.content}/>
                </Form.Group>
                {/* <Button onClick={() => props.setWriting('False')}>취소</Button> */}

                <Button variant="info" onClick={this.update}>
                    수정완료
                </Button>
                <button className="link-btn" onClick={() => window.location.href = "/board"}>
                    취소
                </button>
            </div>
        );
    }
}

export default Update;
