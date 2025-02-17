import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import './ListaPostagem.css';
import Postagem from '../../../models/Postagem';
import { busca, post } from '../../../services/Service';
import { Link, useNavigate } from 'react-router-dom';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
  );
  
  useEffect(() => {
  if (token == "") {
          toast.error("Você precisa estar logado",{
            position:"top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        })
          navigate("/login")
  }
  }, [token])

  async function getPost() {
  await busca("/postagem", setPosts, {
          headers: {
  'Authorization': token
          }
  })
      }
  
      useEffect(() => {

      getPost()
  
      }, [posts.length])

  return (
    <>

    <body className="bgpost">

    <Box className='bgtitulopost'>
        <Typography variant="h3" color="textSecondary" component="h1" align="center" className="titulopost">Arquivo de posts</Typography>
    </Box>

    <Box display="flex" flexDirection="row" >
    {
        posts.map(post => (

          <Box m={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Postagens
                </Typography>
                <Typography variant="h5" component="h2">
                  {post.titulo}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.texto}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.tema?.descricao}
                </Typography>
                <Typography variant="body2" component="p">
                    Postado por: {post.usuario?.nome}
                </Typography>

              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft outlinedButtonC" size='small'
                      style={{
                        borderColor: "white",
                        backgroundColor: "#09221a",
                        color: "white",
                        fontWeight: "bold"
                      }}>
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' className='outlinedButtonC'
                      style={{
                        borderColor: "white",
                        backgroundColor: "#09221a",
                        color: "white",
                        fontWeight: "bold"
                      }}>
                        deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      }
    </Box>
        
    </body>
    
    </>)
}

export default ListaPostagem;