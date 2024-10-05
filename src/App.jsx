import { useState } from 'react'
 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from "axios";

import './App.css'

function App() {

    	const [precios, setPrecios] = useState("");
    	const [coordenadas, setCoordenadas] = useState("");

  
  const token = 'aa165f7a-ed0c-4c15-b6a7-ba3f0f186e4c'
 
  let coordenadas_2 

	let obtCoord=(otra) => {
	 		console.log("entro al 1")
		setTimeout(() => {
		
 otra()
		},500)
	}
	
	let ejecuta = () => {
		console.log("entro al 2")
		navigator.geolocation.getCurrentPosition(position => {
      coordenadas_2= position
		});
		
	}

   obtCoord(ejecuta);

 
	let peticiona = () => {
		
 console.log("coor", coordenadas_2['coords']['latitude'] )


    	axios
			.get(
        //` https://api.datos.gob.mx/v1/precio.gasolina.publico`
        
				`https://www.inegi.org.mx/app/api/denue/v1/consulta/buscar/restaurantes/${coordenadas_2['coords']['latitude']}, ${coordenadas_2['coords']['longitude']}/2000/${token}`
			)
			.then((res) => {
				console.log('data',res.data[0]);
        setPrecios(res.data);
        
        
			});
 
	 
};

 
  

  return (
    <>
       
      {
        precios
							? console.log("precios",precios):''
      }
        <Container>
        <h1>Buscar restaurantes cerca</h1>
	 
 
					<Row  fluid="lg" >
						{precios
            ? precios.map((el, index) => {
                
									return (
										<Col md={6} lg={4} sm={12} key={index}>
											<Card style={{ width: "18rem" }} className="mt-4">
												{el.poster_path == null ? (
													<Card.Img
														variant="top"
/>
												) : (
													<Card.Img
														variant="top"
														src={`http://image.tmdb.org/t/p/w185${el.poster_path}`}
													/>
												)}
 
                        <Card.Body>
                       
													<Card.Title>{el.Nombre}</Card.Title>
													<Card.Text>{el.Clase_actividad}</Card.Text>
													<Card.Text>{el.Telefono}</Card.Text>
													<Card.Text>{el.Calle}</Card.Text>
													<Card.Text>{el.Latitud}</Card.Text>
													<Card.Text>{el.Longitud}</Card.Text>
									 
												</Card.Body>
											</Card>
										</Col>
									);
							  })
            : ""}
          
          {
            coordenadas?	<Button onClick={peticiona}>peticiona</Button> :''
          }

          	<Button onClick={peticiona}>Busca</Button>

          </Row>
          
          
			</Container>
    </>
  )
}

export default App
