// src/pages/Pagos.js
import React, { useState, useEffect } from 'react';
import { residenteService } from '../services/residenteService';

const Pagos = () => {
  const [obligaciones, setObligaciones] = useState([]);
  const [selectedObligaciones, setSelectedObligaciones] = useState([]);
  const [metodoPago, setMetodoPago] = useState('');
  const [referencia, setReferencia] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchObligaciones = async () => {
      try {
        const response = await residenteService.getObligaciones({ estado: 'PENDIENTE' });
        setObligaciones(response.data.obligaciones);
      } catch (error) {
        setError('Error al cargar las obligaciones');
      }
    };

    fetchObligaciones();
  }, []);

  const handleSelectObligacion = (id) => {
    setSelectedObligaciones(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = {
        obligaciones: selectedObligaciones,
        metodo_pago: metodoPago,
        referencia: referencia
      };
      const response = await residenteService.realizarPago(data);
      setSuccess('Pago realizado exitosamente. Número de comprobante: ' + response.data.comprobante_numero);
      // Recargar las obligaciones
      const obligacionesResponse = await residenteService.getObligaciones({ estado: 'PENDIENTE' });
      setObligaciones(obligacionesResponse.data.obligaciones);
      setSelectedObligaciones([]);
    } catch (error) {
      setError('Error al realizar el pago');
    } finally {
      setLoading(false);
    }
  };

  const total = obligaciones
    .filter(obligacion => selectedObligaciones.includes(obligacion.id))
    .reduce((sum, obligacion) => sum + parseFloat(obligacion.monto), 0);

  return (
    <div>
      <h1>Pagar Cuotas</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Seleccione las obligaciones a pagar</h2>
          {obligaciones.map(obligacion => (
            <div key={obligacion.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedObligaciones.includes(obligacion.id)}
                  onChange={() => handleSelectObligacion(obligacion.id)}
                />
                {obligacion.concepto_nombre} - ${obligacion.monto} - Vence: {obligacion.fecha_vencimiento}
              </label>
            </div>
          ))}
        </div>

        <div>
          <label>Método de Pago:</label>
          <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} required>
            <option value="">Seleccione</option>
            <option value="TARJETA_CREDITO">Tarjeta de Crédito</option>
            <option value="TARJETA_DEBITO">Tarjeta de Débito</option>
            <option value="TRANSFERENCIA">Transferencia Bancaria</option>
            <option value="EFECTIVO">Efectivo</option>
          </select>
        </div>

        <div>
          <label>Referencia (opcional):</label>
          <input
            type="text"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
          />
        </div>

        <div>
          <h3>Total a Pagar: ${total.toFixed(2)}</h3>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <button type="submit" disabled={loading || selectedObligaciones.length === 0}>
          {loading ? 'Procesando...' : 'Realizar Pago'}
        </button>
      </form>
    </div>
  );
};

export default Pagos;