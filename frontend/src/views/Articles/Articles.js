import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Zoom,
  Tooltip,
  Alert,
  Snackbar
} from "@mui/material";
import { Edit, Delete, Add, Inventory2 } from "@mui/icons-material";

const Articles = () => {
  const initialArticleState = { id_article: "", nom: "", quantite: "" };
  
  const [articles, setArticles] = useState([
    { id_article: "1", nom: "Article A", quantite: "10" },
    { id_article: "2", nom: "Article B", quantite: "20" },
    { id_article: "3", nom: "Article C", quantite: "15" },
  ]);
  const [newArticle, setNewArticle] = useState(initialArticleState);
  const [editIndex, setEditIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({ ...prev, [name]: value }));
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const openAddDialog = () => {
    setNewArticle(initialArticleState);
    setIsDialogOpen(true);
  };

  const handleAddArticle = () => {
    if (newArticle.id_article && newArticle.nom && newArticle.quantite) {
      setArticles(prev => [...prev, newArticle]);
      setNewArticle(initialArticleState);
      setIsDialogOpen(false);
      showSnackbar("Article ajouté avec succès");
    }
  };

  const openEditDialog = (index) => {
    setEditIndex(index);
    setNewArticle(articles[index]);
    setIsEditDialogOpen(true);
  };

  const handleUpdateArticle = () => {
    setArticles(prev => {
      const updatedArticles = [...prev];
      updatedArticles[editIndex] = newArticle;
      return updatedArticles;
    });
    setNewArticle(initialArticleState);
    setEditIndex(null);
    setIsEditDialogOpen(false);
    showSnackbar("Article mis à jour avec succès");
  };

  const handleDeleteArticle = (index) => {
    setArticles(prev => prev.filter((_, i) => i !== index));
    showSnackbar("Article supprimé", "warning");
  };

  const renderTable = () => (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Nom</TableCell>
            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Quantité</TableCell>
            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((article, index) => (
            <TableRow 
              key={index}
              sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
            >
              <TableCell align="center">{article.id_article}</TableCell>
              <TableCell align="center">{article.nom}</TableCell>
              <TableCell align="center">{article.quantite}</TableCell>
              <TableCell align="center">
                <Tooltip title="Modifier">
                  <IconButton 
                    color="primary" 
                    onClick={() => openEditDialog(index)}
                    sx={{ '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s' } }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteArticle(index)}
                    sx={{ '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s' } }}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderDialog = (isEdit = false) => {
    const title = isEdit ? "Modifier l'article" : "Ajouter un article";
    const buttonLabel = isEdit ? "Mettre à jour" : "Ajouter";
    const handleAction = isEdit ? handleUpdateArticle : handleAddArticle;

    return (
      <Dialog 
        open={isEdit ? isEditDialogOpen : isDialogOpen} 
        onClose={() => (isEdit ? setIsEditDialogOpen(false) : setIsDialogOpen(false))}
        TransitionComponent={Zoom}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle 
          sx={{ 
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            backgroundColor: 'primary.main',
            color: 'white'
          }}
        >
          <Inventory2 />
          {title}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 2 }}>
            <TextField
              label="ID de l'article"
              name="id_article"
              value={newArticle.id_article}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Nom de l'article"
              name="nom"
              value={newArticle.nom}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Quantité de l'article"
              name="quantite"
              value={newArticle.quantite}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              type="number"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
          <Button 
            onClick={() => (isEdit ? setIsEditDialogOpen(false) : setIsDialogOpen(false))} 
            color="inherit"
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleAction} 
            color="primary"
            variant="contained"
            sx={{ minWidth: 100 }}
          >
            {buttonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 4
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2 
        }}>
          <Inventory2 color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h4" component="h1">
            Gestion d'Articles
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Tooltip title="Ajouter un article">
            <Fab 
              color="primary" 
              aria-label="add" 
              onClick={openAddDialog}
              sx={{ 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  transition: 'transform 0.2s' 
                }
              }}
            >
              <Add />
            </Fab>
          </Tooltip>
        </Box>

        {/* Table */}
        {renderTable()}
      </Box>

      {renderDialog()}
      {renderDialog(true)}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Articles;