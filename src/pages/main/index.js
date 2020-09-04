import React , { Component } from 'react';

import Container from '../../components/container';
import { Form ,List, SubmitButton} from './styles';

import { FaGithubAlt , FaPlus , FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default class Main extends Component{
   state={
       newRepo:'',
       repositories:[],
       loading:false,
   }
   
   //Carraegar os dados do localStorage
   componentDidMount(){
       const repositories = localStorage.getItem('repositories');


       if(repositories){
           this.setState({repositories: JSON.parse(repositories)});
       }
   }

   //Salvar os dados no localStorage
   componentDidUpdate(_, prevState){
        const { repositories } = this.state;

        if(prevState.repositories !== repositories){
            localStorage.setItem('repositories' , JSON.stringify(repositories));
        }
   }

   handleInputChange = e => {
       this.setState({ newRepo : e.target.value});
   
    }

   handleSubmit = async e => {
       e.preventDefault();

       const { newRepo  ,repositories} = this.state;

        this.setState({loading:true})

        const response = await api.get(`/repos/${newRepo}`);

        const data = {
            name:response.data.full_name
        }

        this.setState({
            repositories: [...repositories,data],
            newRepo:'',
            loading:false
        })
        console.log(response);
   }
   
    render(){
        const {newRepo , repositories,loading} = this.state;
   
        return(
            <Container>
                <h1>
                    Repositorios
                    <FaGithubAlt />
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Adiconar Repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading} >
                       {loading
                        ? 
                            <FaSpinner color="#fff" size={14}/> 
                        : 
                            <FaPlus color="#fff" size={14}/> }
                       
                    </SubmitButton> 
                </Form>

                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link to={`/repositories/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>

            </Container>
        )
   }
}

