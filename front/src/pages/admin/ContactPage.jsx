import { useState, useEffect } from "react";
import { getAllContacts, getContactsByDateRange } from "../../api/contact";
import "./ContactPage.css";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  // filtros de fecha
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchContacts = async (pageNumber = 1) => {
    setLoading(true);
    const res = startDate && endDate
      ? await getContactsByDateRange(startDate, endDate, pageNumber)
      : await getAllContacts(pageNumber);

    if (res.success && res.data) {
      const contactsData = res.data.contacts || res.data.data;
      setContacts(contactsData || []);
      setTotalPages(res.data.totalPages || res.data.total_pages || 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  const handleFilter = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      setPage(1);
      fetchContacts(1);
    }
  };

  return (
    <div className="contact-page">
      <h2 className="contact-title">📬 Formularios de Contacto</h2>

      <form className="contact-filter" onSubmit={handleFilter}>
        <label>
          Desde:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          Hasta:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button type="submit">Filtrar</button>
        <button type="button" onClick={() => { setStartDate(""); setEndDate(""); fetchContacts(1); }}>
          Limpiar
        </button>
      </form>

      {loading ? (
        <p className="loading">Cargando contactos...</p>
      ) : contacts.length === 0 ? (
        <p className="no-results">No hay contactos disponibles</p>
      ) : (
        <table className="contact-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} onClick={() => setSelectedContact(c)}>
                <td>{`${c.first_name} ${c.last_name}`}</td>
                <td>{c.company || "-"}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                    <button
                        className="reply-button"
                        onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `mailto:${c.email}?subject=Respuesta a tu mensaje&body=Hola ${c.first_name},%0A%0AGracias por contactarte con Innovativa 4.0.%0A%0AAtentamente,%0ASoporte Innovativa 4.0`;
                        }}
                    >
                        Responder
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          ⬅️ Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Siguiente ➡️
        </button>
      </div>

      {/* Modal */}
      {selectedContact && (
        <div className="modal-contact-overlay" onClick={() => setSelectedContact(null)}>
          <div className="modal-contact-content" onClick={(e) => e.stopPropagation()}>
            <h3>Detalle del Contacto</h3>
            <p><strong>Nombre:</strong> {selectedContact.first_name} {selectedContact.last_name}</p>
            <p><strong>Empresa:</strong> {selectedContact.company || "-"}</p>
            <p><strong>Correo:</strong> {selectedContact.email}</p>
            <p><strong>Teléfono:</strong> {selectedContact.phone}</p>
            <p><strong>Mensaje:</strong> {selectedContact.message}</p>
            <p><strong>IP:</strong> {selectedContact.ip_address}</p>
            <p><strong>Fecha:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
            <button onClick={() => setSelectedContact(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
