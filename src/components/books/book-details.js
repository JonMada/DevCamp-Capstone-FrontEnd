// src/components/pages/book-details.js
import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { slug } = useParams();

  // Aquí podrías hacer una solicitud a tu API para obtener los detalles del libro utilizando el slug

  return (
    <div>
      <h1>Detalles del Libro: {slug}</h1>
      {/* Aquí se mostrarían los detalles del libro */}
    </div>
  );
};

export default BookDetails;
