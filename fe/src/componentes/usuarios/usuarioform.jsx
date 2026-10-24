import React, { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField
} from '@mui/material';

import { Close } from '@mui/icons-material';

function UsuarioForm({
  open,
  usuario,
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    nomecompleto: '',
    nomeusuario: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    ativo: true
  });

  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setForm({
        nomecompleto:
          usuario.nomecompleto || '',
        nomeusuario:
          usuario.nomeusuario || '',
        email:
          usuario.email || '',
        senha: '',
        confirmarSenha: '',
        ativo:
          usuario.ativo !== undefined
            ? usuario.ativo
            : true
      });
    } else {
      setForm({
        nomecompleto: '',
        nomeusuario: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        ativo: true
      });
    }

    setErro('');
  }, [usuario, open]);

  const alterarCampo = (campo, valor) => {
    setForm((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');
    if (!form.nomecompleto.trim()) {
      setErro('Informe o nome completo.');
      return;
    }
    if (!form.nomeusuario.trim()) {
      setErro('Informe o nome de usuário.');
      return;
    }
    if (!form.email.trim()) {
      setErro('Informe o email.');
      return;
    }
    // Senha é obrigatória somente ao criar.
    if (!usuario && !form.senha) {
      setErro('Informe a senha.');
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setErro(
        'A senha e a confirmação da senha não são iguais.'
      );
      return;
    }
    try {
      setSalvando(true);

      const dados = {
        nomecompleto: form.nomecompleto.trim(),
        nomeusuario: form.nomeusuario.trim(),
        email: form.email.trim(),
        ativo: form.ativo
      };
      // Só envia senha quando foi preenchida.
      if (form.senha) {
        dados.senha = form.senha;
      }
      await onSave(dados);
    } catch (error) {
      setErro(
        error.message ||
        'Não foi possível salvar o usuário.'
      );
    } finally {
      setSalvando(false);
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={salvando ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {usuario
          ? 'Editar usuário'
          : 'Adicionar usuário'}

        <IconButton
          onClick={onClose}
          disabled={salvando}
          aria-label="Fechar"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent
          dividers
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {erro && (
            <div
              style={{
                color: '#d32f2f',
                fontSize: '14px'
              }}
            >
              {erro}
            </div>
          )}

          <TextField
            label="Nome"
            placeholder="Nome completo"
            value={form.nomecompleto}
            onChange={(event) =>
              alterarCampo(
                'nomecompleto',
                event.target.value
              )
            }
            inputProps={{
              maxLength: 100
            }}
            required
            fullWidth
          />

          <TextField
            label="Usuário"
            placeholder="Nome de usuário"
            value={form.nomeusuario}
            onChange={(event) =>
              alterarCampo(
                'nomeusuario',
                event.target.value
              )
            }
            inputProps={{
              maxLength: 50
            }}
            required
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            placeholder="email@exemplo.com"
            value={form.email}
            onChange={(event) =>
              alterarCampo(
                'email',
                event.target.value
              )
            }
            inputProps={{
              maxLength: 255
            }}
            required
            fullWidth
          />

          <TextField
            label={
              usuario
                ? 'Nova senha'
                : 'Senha'
            }
            type="password"
            placeholder={
              usuario
                ? 'Deixe vazio para manter a senha'
                : 'Digite a senha'
            }
            value={form.senha}
            onChange={(event) =>
              alterarCampo(
                'senha',
                event.target.value
              )
            }
            inputProps={{
              maxLength: 100
            }}
            required={!usuario}
            fullWidth
          />

          <TextField
            label="Confirmar senha"
            type="password"
            placeholder="Digite a senha novamente"
            value={form.confirmarSenha}
            onChange={(event) =>
              alterarCampo(
                'confirmarSenha',
                event.target.value
              )
            }
            inputProps={{
              maxLength: 100
            }}
            required={!usuario && Boolean(form.senha)}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={form.ativo}
                onChange={(event) =>
                  alterarCampo(
                    'ativo',
                    event.target.checked
                  )
                }
              />
            }
            label="Usuário ativo"
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            disabled={salvando}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={salvando}
          >
            {salvando
              ? 'Salvando...'
              : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UsuarioForm;