import { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from "axios";

import './App.css'

function App() {

		const [precios, setPrecios] = useState("");
		const [negocio, setNegocio] = useState("");
		const [coordenadas, setCoordenadas] = useState("");
		const token = 'aa165f7a-ed0c-4c15-b6a7-ba3f0f186e4c'
 
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {			
			setCoordenadas(position)
		})
	}, []);
	


	const onChange = (e) => {
		setNegocio(e.target.value);
		console.log("name", negocio);
	};

	const peticiona = () => {
    
		axios
			.get(
				//` https://api.datos.gob.mx/v1/precio.gasolina.publico`
        
				`https://www.inegi.org.mx/app/api/denue/v1/consulta/buscar/${negocio}/${coordenadas['coords']['latitude']}, ${coordenadas['coords']['longitude']}/2000/${token}`
			)
			.then((res) => {
				console.log('data', res.data[0]);
				setPrecios(res.data);			
			})
		}
 
  return (
    <>
       
      {
        precios
							? console.log("precios",precios):''
      }
      <Container fluid>
				<h2>Buscar negocios cerca</h2>
				
				<Row>
				
					<Col xs={12} sm={12}  md={6} lg={4} xl={4} >
						<InputGroup className="mb-3">
						 
							<Form.Control
								aria-label="Default"
								aria-describedby="inputGroup-sizing-default"
									onChange={onChange}
							/>
						</InputGroup>
		
					</Col>
				</Row>
	 
					<Row    >
						{precios
            ? precios.map((el, index) => {
                
									return (
										<Col xs={12} sm={12}  md={6} lg={4} xl={4} key={index}>
											<Card style={{ width: "18rem" }} className="bg-red mt-4"   >
									 
                        <Card.Body>
                       
													<Card.Title>{el.Nombre}</Card.Title>
													<Card.Subtitle>{el.Clase_actividad}</Card.Subtitle>
													<Card.Text>{el.Telefono}</Card.Text>
													<Card.Text>{el.Calle} {el.Num_Exterior}</Card.Text>
													<Card.Text>{el.Latitud}</Card.Text>
													<Card.Text>{el.Longitud}</Card.Text>
									 
												</Card.Body>
											</Card>
										</Col>
									);
							  })
						: ""}
					
						</Row>
          
			</Container>
			
			<Container fluid>
			
				<Row >
						<Col  md={4} lg={4} sm={12} > 
							<Button onClick={peticiona}> buscar </Button>
						</Col>
				</Row>
		
			</Container>
      

    </>
  )
}

export default App
