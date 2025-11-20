import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFoundPage.css"

function NotFoundPage() {
  return (
    <div className="section-error">
      <h1 className="error">404</h1>
      <div className="page-error">La página que solicitó no existe</div>
      <a className="btn-orange" href="/">Volver a inicio</a>
    </div>
  );
}

export default NotFoundPage;