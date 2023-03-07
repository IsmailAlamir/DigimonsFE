import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function Home() {

  const [data, setData] = useState([]);


  async function addToFav(result) {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/digimons/", {
        "name":result.name
        ,
        "img":result.img
        ,
        "level":result.level

      });
      console.log(response.data);
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Done',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error(error);
    }
  }


  

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://digimon-api.vercel.app/api/digimon");
      const jsonData = response.data;
      setData(jsonData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Row xs={1} md={4} className="g-4" style={{ padding: "3rem 10rem" }}>
        {data.map((result, idx) => (
          <Col>
            <Card>
              <Card.Img variant="top" src={result.img} />
              <Card.Body>
                <Card.Title> {result.name} </Card.Title>
                <Card.Text>
                  {result.level}
                </Card.Text>
               
                <Button  onClick={() => addToFav(result)} variant="primary">Add to favorite</Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div >
  )
}


