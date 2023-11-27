import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

const CardForm = ({ onSubmit, onClose }) => {
  const [name, setCardName] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, image, status, species, gender);
    onClose();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <TextField style={{width: '100%', marginBottom: '10px'}} id="standard-basic" label="Name" variant="standard" value={name} onChange={(e) => setCardName(e.target.value)}/>
        <TextField style={{width: '100%', marginBottom: '10px'}} id="standard-basic" label="Image Url" variant="standard" value={image} onChange={(e) => setImage(e.target.value)}/>
        <TextField style={{width: '100%', marginBottom: '10px'}} id="standard-basic" label="Status" variant="standard" value={status} onChange={(e) => setStatus(e.target.value)}/>
        <TextField style={{width: '100%', marginBottom: '10px'}} id="standard-basic" label="Specie" variant="standard" value={species} onChange={(e) => setSpecies(e.target.value)}/>
        <TextField style={{width: '100%', marginBottom: '10px'}} id="standard-basic" label="Gender" variant="standard" value={gender} onChange={(e) => setGender(e.target.value)}/>
      </label>
      <Button type='submit' variant="contained" style={{ marginRight: '20px', backgroundColor: '#ADFF2F', color: 'black', width: '10rem' }}
                >Salvar</Button>
    </form>
  );
};

export default CardForm;