import React, { useEffect, useMemo, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import {
  Add,
  Delete,
  Edit,
  Search
} from '@mui/icons-material';

import {
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
  listarUsuarios
} from '../servicos/api';

import UsuarioForm from '../componentes/usuarios/usuarioform.jsx';
import ConfirmarExclusao from '../componentes/usuarios/confirmarexclusao.jsx';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [formAberto, setFormAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [deleteAberto, setDeleteAberto] = useState(false);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      setErro('');
      const dados = await listarUsuarios();
      setUsuarios(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.error(error);
      setErro(
        error.response?.data?.erro ||
        'Não foi possível carregar os usuários.'
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);
  const usuariosFiltrados = useMemo(() => {
    const termo = pesquisa
      .trim()
      .toLowerCase();
    if (!termo) {
      return usuarios;
    }
    return usuarios.filter((usuario) => {
      return (
        usuario.nomecompleto
          ?.toLowerCase()
          .includes(termo) ||
        usuario.nomeusuario
          ?.toLowerCase()
          .includes(termo) ||
        usuario.email
          ?.toLowerCase()
          .includes(termo)
      );
    });
  }, [usuarios, pesquisa]);

  const abrirAdicionar = () => {
    setUsuarioSelecionado(null);
    setFormAberto(true);
  };

  const abrirEditar = (usuario) => {
    setUsuarioSelecionado(usuario);
    setFormAberto(true);
  };

  const fecharFormulario = () => {
    setFormAberto(false);
    setUsuarioSelecionado(null);
  };

  const salvarUsuario = async (dados) => {
    try {
      if (usuarioSelecionado) {
        await atualizarUsuario(
          usuarioSelecionado.idusuario,
          dados
        );
        setMensagem(
          'Usuário atualizado com sucesso!'
        );
      } else {
        await criarUsuario(dados);
        setMensagem(
          'Usuário cadastrado com sucesso!'
        );
      }

      fecharFormulario();
      await carregarUsuarios();
    } catch (error) {
      console.error(error);
      throw new Error(
        error.response?.data?.erro ||
        error.response?.data?.mensagem ||
        'Não foi possível salvar o usuário.'
      );
    }
  };

  const abrirConfirmacaoExclusao = (usuario) => {
    setUsuarioParaExcluir(usuario);
    setDeleteAberto(true);
  };

  const fecharConfirmacaoExclusao = () => {
    setDeleteAberto(false);
    setUsuarioParaExcluir(null);
  };

  const confirmarExclusao = async () => {
    if (!usuarioParaExcluir) {
      return;
    }
    try {
      await excluirUsuario(
        usuarioParaExcluir.idusuario
      );
      setMensagem(
        'Usuário excluído com sucesso!'
      );
      fecharConfirmacaoExclusao();
      await carregarUsuarios();
    } catch (error) {
      console.error(error);
      setErro(
        error.response?.data?.erro ||
        error.response?.data?.mensagem ||
        'Não foi possível excluir o usuário.'
      );
    }
  };

  const formatarData = (data) => {
    if (!data) {
      return '-';
    }

    const dataObj = new Date(data);
    if (Number.isNaN(dataObj.getTime())) {
      return '-';
    }
    return dataObj.toLocaleDateString('pt-BR');
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      {/* CABEÇALHO */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          flexWrap: 'wrap'
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={700}
          >
            Gerenciador de Usuários
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Cadastre, edite e remova usuários do sistema.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={abrirAdicionar}
        >
          Adicionar usuário
        </Button>
      </Box>

      {/* PESQUISA */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
          mb: 3
        }}
      >
        <TextField
          fullWidth
          type="search"
          value={pesquisa}
          onChange={(event) =>
            setPesquisa(event.target.value)
          }
          placeholder="Buscar por nome, usuário ou email..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Paper>

      {/* TABELA */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <strong>Usuário</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Ativo</strong>
              </TableCell>
              <TableCell>
                <strong>Data de cadastro</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {carregando ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                >
                  Carregando usuários...
                </TableCell>
              </TableRow>
            ) : usuariosFiltrados.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                >
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              usuariosFiltrados.map((usuario) => (
                <TableRow
                  key={usuario.idusuario}
                  hover
                >
                  <TableCell>
                    {usuario.nomecompleto}
                  </TableCell>
                  <TableCell>
                    {usuario.nomeusuario}
                  </TableCell>
                  <TableCell>
                    {usuario.email}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        usuario.ativo
                          ? 'Ativo'
                          : 'Inativo'
                      }
                      color={
                        usuario.ativo
                          ? 'success'
                          : 'default'
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {formatarData(
                      usuario.datacadastro
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        abrirEditar(usuario)
                      }
                      aria-label="Editar usuário"
                    >
                      <Edit />

                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() =>
                        abrirConfirmacaoExclusao(
                          usuario
                        )
                      }
                      aria-label="Excluir usuário"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* FORMULÁRIO */}
      <UsuarioForm
        open={formAberto}
        usuario={usuarioSelecionado}
        onClose={fecharFormulario}
        onSave={salvarUsuario}
      />
      {/* CONFIRMAÇÃO DE EXCLUSÃO */}
      <ConfirmarExclusao
        open={deleteAberto}
        usuario={usuarioParaExcluir}
        onClose={fecharConfirmacaoExclusao}
        onConfirm={confirmarExclusao}
      />
      
      {/* MENSAGEM */}
      <Snackbar
        open={Boolean(mensagem)}
        autoHideDuration={4000}
        onClose={() => setMensagem('')}
      >
        <Alert
          severity="success"
          onClose={() => setMensagem('')}
          variant="filled"
        >
          {mensagem}
        </Alert>
      </Snackbar>
      {/* ERRO */}
      <Snackbar
        open={Boolean(erro)}
        autoHideDuration={5000}
        onClose={() => setErro('')}
      >
        <Alert
          severity="error"
          onClose={() => setErro('')}
          variant="filled"
        >
          {erro}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Usuarios;