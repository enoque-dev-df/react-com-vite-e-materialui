import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';

function ConfirmarExclusao({
  open,
  usuario,
  onClose,
  onConfirm
}) {
  if (!usuario) {
    return null;
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Excluir usuário
      </DialogTitle>

      <DialogContent>
        <Typography>
          Tem certeza que deseja excluir o usuário{' '}
          <strong>
            {usuario.nomecompleto}
          </strong>
          ?
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Esta ação não poderá ser desfeita.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmarExclusao;
