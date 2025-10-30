import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFoundPage.css"

function NotFoundPage() {
  return (
    <div class="section-error">
      <h1 class="error">404</h1>
      <div class="page-error">La página que solicitó no existe</div>
      <a class="btn-orange" href="/">Volver a inicio</a>
    </div>
  );
}

export default NotFoundPage;