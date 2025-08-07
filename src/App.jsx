import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(1);

  const generatePDF = () => {
    const doc = new jsPDF();
    let x = 10;
    let y = 10;
    const labelHeight = 30;

    for (let i = 0; i < quantity; i++) {
      doc.text(`Producto: ${productName}`, x, y);
      doc.text(`SKU: ${sku}`, x, y + 10);
      doc.text(`--------------------------------`, x, y + 20);

      y += labelHeight;

      if (y > 270) { // Página llena
        doc.addPage();
        y = 10;
      }
    }

    doc.save(`${productName}_etiquetas.pdf`);
  };

  return (
    <main className="container">
      <h1>Generador de Etiquetas PDF</h1>
      <form className="form" onSubmit={(e) => { e.preventDefault(); generatePDF(); }}>
        <div className="form-group">
          <label>Nombre del producto:</label><br />
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>SKU o código:</label><br />
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Cantidad de etiquetas:</label><br />
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            required
          />
        </div>

        <button type="submit" className="generate-btn">
          <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generar PDF
        </button>
      </form>
    </main>
  );
}

export default App