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

		const [lugares, setlugares] = useState("");
		const [nomNegocio, setnomNegocio] = useState("");
		const [coordenadas, setCoordenadas] = useState("");
		const token = 'aa165f7a-ed0c-4c15-b6a7-ba3f0f186e4c'
 
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {			
			setCoordenadas(position)
		})
	}, []);

	const onChange = (e) => {
		setnomNegocio(e.target.value);
		console.log("name", nomNegocio);
	};

	const peticiona = () => {
    
		axios
			.get(
				`https://www.inegi.org.mx/app/api/denue/v1/consulta/buscar/${nomNegocio}/${coordenadas['coords']['latitude']}, ${coordenadas['coords']['longitude']}/2000/${token}`
			)
			.then((res) => {
				setlugares(res.data);		
					console.log('data', res );
			})
		}
 
  return (
    <>
       
      {
        lugares
					? console.log("lugares", lugares)
					: ''
      }
      <Container fluid>
				<h2>Buscar negocios cerca</h2>
				
				<Row>
				
					<Col xs={12} sm={12}  md={6} lg={10} xl={10} >
						<InputGroup className="mb-3">	 
							<Form.Control
		   					aria-label="Large"
         			 	aria-describedby="inputGroup-sizing-sm"
								onChange={onChange}
							/>
						</InputGroup>
						<Button onClick={peticiona}> buscar </Button>
					</Col>
				</Row>				
			</Container>
      

	 			<Container fluid>
					<Row    >
					{						
						lugares!="No hay resultados. </br> "&&lugares!=''
            ?lugares.map((el, index) => {
                
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

				<Row>
					
					{lugares == "No hay resultados. </br> " ?
						<p className='war'>Tu busqueda no generó resultados</p>: ""							
					}
				</Row>
          
			</Container>
 
    </>
  )
}

export default App
