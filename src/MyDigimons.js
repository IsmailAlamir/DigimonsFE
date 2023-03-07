import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';


export default function MyDigimons() {

    const [flag, setFlag] = useState(false);
    const [data, setData] = useState([]);
    const [cardName, setCardName] = useState("");
    const [cardImage, setCardImage] = useState("");
    const [cardLevel, setCardLevel] = useState("");
    const [cardID, setCardID] = useState("");



    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://127.0.0.1:8000/api/v1/digimons/");
            const jsonData = response.data;
            setData(jsonData);
        }
        fetchData();
    }, []);


    const handleUpdate = async (card) => {
        setFlag(true);
        setCardName(card.name)
        setCardImage(card.img)
        setCardLevel(card.level)
        setCardID(card.id)


    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFlag(false);

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/v1/digimons/${cardID}`, {
                "name": cardName,
                "img": cardImage,
                "level": cardLevel
            });

            console.log(response.data);
            const responseUpdate = await axios.get("http://127.0.0.1:8000/api/v1/digimons/");
            const jsonDataUpdate = responseUpdate.data;
            setData(jsonDataUpdate);

        } catch (error) {
            console.error(error);
        }
    }


    const handleDelete = async (card) => {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/v1/digimons/${card.id}`);
            console.log(res);
            setData(data.filter((c) => c.id !== card.id));
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            {flag ? <Form>
                <Form.Group style={{ display: "flex", gap: "1rem" }} className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" value={cardImage} onChange={(e) => setCardImage(e.target.value)} />
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" value={cardLevel} onChange={(e) => setCardLevel(e.target.value)} />

                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
                : <></>}


            {data.length ? (<Row xs={1} md={4} className="g-4" style={{ padding: "3rem 10rem" }}>
                {data.map((card) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={card.img} />
                            <Card.Body>
                                <Card.Title> {card.name} </Card.Title>
                                <Card.Text>
                                    {card.level}
                                </Card.Text>
                                <Button style={{ marginRight: "1rem" }} variant="primary" onClick={() => handleUpdate(card)}>Update</Button>
                                <Button variant="danger" onClick={() => handleDelete(card)}>Delete</Button>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            ) : (
                <h3 style={{ padding: "5rem", marginBottom: "24%" }}>No Available Digimons ¯\_(ツ)_/¯</h3>
            )}


        </div>
    )
}