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
      aux2:'',
      aux3:'',
      usunombre:'',
      contra:'',
    };

    this.handleChangeWeight= this.handleChangeWeight.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.handleChangeInsert = this.handleChangeInsert.bind(this);
    this.handleChangeInsert2 = this.handleChangeInsert2.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);


    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeContra = this.handleChangeContra.bind(this);
    this.onSubmit3 = this.onSubmit3.bind(this);
  }


  componentDidMount() {
    fetch(API + '/getjuegos') //obtiene todos los jeugos q insertaron
      .then(response => response.json())
      .then(data => this.setState({ juegos: data }));

    
    fetch(API + '/getdescargas') //obtiene todas las descargas
      .then(response => response.json())
      .then(data => this.setState({ descargas: data }));     
         
  }

  handleChangeWeight(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleChangeInsert(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleChangeInsert2(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleChangeNombre(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }



  handleChangeContra(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  onSubmit3(event) {
    event.preventDefault();
    const nombree = {id:this.state.usunombre};
    const contra = {id:this.state.contra};
  
    console.log(nombree.id);
    console.log(contra.id);
  
    fetch(`http://35.239.171.80/insertusuario?nombre=${nombree.id}&contrasena=${contra.id}`, {
      method: "POST"  
    }).then((response) => response.json())
    
  }


  onSubmit(event) {
    event.preventDefault();
    const data = {id:this.state.auxiliar};

    fetch(`http://35.239.171.80/getusuario?auxiliar=${data.id}`, {
      method: "GET"  
    }).then((response) => response.json())
    .then(data => this.setState({usuario:data}));

    fetch(`http://35.239.171.80/getalldescargas?auxiliar=${data.id}`, {
      method: "GET"  
    }).then((response) => response.json())
    .then(data => this.setState({todasDescargas:data}));
}


onSubmit2(event) {
  event.preventDefault();
  const idJuego = {id:this.state.aux2};
  const idUsu = {id:this.state.aux3};

  console.log(idUsu.id);
  console.log(idJuego.id);

  fetch(`http://35.239.171.80/insertdescarga?id_usuario=${idUsu.id}&id_juego=${idJuego.id}`, {
    method: "POST"  
  }).then((response) => response.json())
  
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
                <p>IdJuego: {depa.id}, Nombre: {depa.nombre}</p>               
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
                    value={this.state.auxiliar}
                    onChange={this.handleChangeWeight} 
                    placeholder="auxiliar"></input>

                <button type="submit">Ver datos</button>                
            </form>

            <h4>Datos del usuario</h4>
            <ul>              
              {usuario.map(depa =>
                <li>
                  <p>Usuario: {depa.id_usuario}, Nombre: {depa.nombre_usuario}, Contrasenia: {depa.contasena}</p>               
                </li>
              )}
            </ul>   

            <h4>Descargas del usuario</h4>
            <ul>              
              {todasDescargas.map(depa =>
                <li>
                  <p>Id del juego: {depa.id_juego}, Total descargas: {depa.total}</p>               
                </li>
              )}
            </ul>
                                  
        </div>         
        </div>  

        <div>
          <h4>Descargar juego</h4>                    
          <form onSubmit={this.onSubmit2}>
                <input 
                    name="aux2" 
                    value={this.state.aux2}
                    onChange={this.handleChangeInsert} 
                    placeholder="Ingrese el id del juego"></input>
                    
                    <input 
                    name="aux3" 
                    value={this.state.aux3}
                    onChange={this.handleChangeInsert2} 
                    placeholder="Ingrese Id del usuario"></input>

                <button type="submit">Insertar</button>                
            </form>          


            <h4>Insertar usuario</h4>                    
          <form onSubmit={this.onSubmit3}>
                <input 
                    name="usunombre" 
                    value={this.state.usunombre}
                    onChange={this.handleChangeNombre} 
                    placeholder="Ingrese el nombre del usuario"></input>
                    
                    <input 
                    name="contra" 
                    value={this.state.contra}
                    onChange={this.handleChangeContra} 
                    placeholder="Ingrese la contrasenia"></input>

                <button type="submit">Insertar Usuario</button>                
            </form>  
        </div> 

      </div>);}
}

export default App;
