import './App.css';
import React, { Component } from 'react';
import { Button , Form  } from 'react-bootstrap';

const API = 'http://35.239.171.80';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      juegos: [], 
      usuario:[],
      descargas: [], //ya esta
      todasDescargas: [],
      auxiliar:'',
    };

    this.handleChangeWeight= this.handleChangeWeight.bind(this);

//    this.chartReference = React.createRef();
  }


  componentDidMount() {
    fetch(API + '/getjuegos') //obtiene todos los jeugos q insertaron
      .then(response => response.json())
      .then(data => this.setState({ juegos: data }));

    
    fetch(API + '/getdescargas') //obtiene todas las descargas
      .then(response => response.json())
      .then(data => this.setState({ descargas: data }));     

     fetch(API + '/getalldescargas') //obtiene la contidad de juegos descargados por nombre de id_usuario
      .then(response => response.json())
      .then(data => this.setState({ todasDescargas: data }));
      
  }

  handleChangeWeight(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  onSubmit(event) {
    
    console.log("ya llegue bro");
    fetch('http://35.239.171.80/getusuario', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },        
        body: ({
          auxiliar : this.state.auxiliar,                    
        })        
        });
        /*.then(response => response.json())
        .then(data => this.setState({ usuario: data }))*/
    event.preventDefault();
}
  

  render() {
    const { juegos } = this.state;
    const { descargas } = this.state;//asi esta bien
    const {usuario} = this.state;
    const { todasDescargas } = this.state;    


    return (
      <div className="grid-container">
        <div>
          <h4>Juegos</h4>
          <ul>
            {juegos.map(depa =>
              <li>
                <p>Usuario: {depa.id}, Nombre: {depa.nombre}, Imagen:{depa.imagen_juego}</p>               
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4>Descargas</h4>                    
          <ul>
            {descargas.map(depa =>
              <li>
                <p>Usuario: {depa.id_usuario} Juego: {depa.id_juego}</p>               
              </li>
            )}
          </ul>                    
        </div>    

        <div>
          <h4>Usuario Datos</h4>                    
          <div>            

            <form onSubmit={this.onSubmit}>
                <input 
                    name="auxiliar" 
                    onChange={this.handleChangeWeight} 
                    type="json" 
                    placeholder="auxiliar"></input>

                <button type="submit">Ver datos</button>                
            </form>

            <ul>
              {usuario.map(depa =>
                <li>
                  <p>Hola hola</p>
                  <p>Usuario: {depa.id_usuario}, Nombre: {depa.nombre_usuario}, Contrasenia: {depa.contasena}</p>               
                </li>
              )}
          </ul>   
        </div>                 
        </div>    
        
      </div>
    );
  }
}

export default App;
