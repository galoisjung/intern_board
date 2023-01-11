import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Axios from "axios";

/**
 * Write class
 */
class Write extends Component {
   
    state = {
        isModifyMode: false,
        title: "",
        content: "",
    };
    
    write = () => {
        Axios.post("http://localhost:5000/insert", {
            title: this.state.title,
            content: this.state.content,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    
    update = () => {
        Axios.put("http://localhost:5000/update", {
            title: this.state.title,
            content: this.state.content,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    
    // eslint-disable-next-line
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    render() {
        return (
            <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label></Form.Label>
                    <Form.Control style={{width:'70vw'}}type="text" onChange={this.handleChange} placeholder="제목" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    {/* <Form.Label></Form.Label> */}
                    <Form.Control style={{width:'72vw', height:'20vw', borderRadius:'10px'}}as="textarea" onChange={this.handleChange} placeholder="내용" />
                </Form.Group>
                {/* <Button onClick={() => props.setWriting('False')}>취소</Button> */}

                <Button variant="info" onClick={this.state.isModifyMode ? this.write : this.update}>
                작성완료
                </Button>
            </div>
        );
    }
}

export default Write;