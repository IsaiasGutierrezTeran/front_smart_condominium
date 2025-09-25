// src/pages/Comprobante.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/Card';
import { Button } from '../components/UI/Button';

const Comprobante = () => {
  const { pagoId } = useParams();

  const handleDescargar = () => {
    // Lógica para descargar comprobante
    alert(`Descargando comprobante del pago ${pagoId}`);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Comprobante de Pago</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Número de Comprobante:</span>
              <span className="font-semibold">COMP-20241201-0001</span>
            </div>
            <div className="flex justify-between">
              <span>Fecha de Emisión:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Monto Total:</span>
              <span className="font-bold text-green-600">$150.00</span>
            </div>
            <div className="flex justify-between">
              <span>Método de Pago:</span>
              <span>Transferencia Bancaria</span>
            </div>
            <div className="mt-6">
              <Button onClick={handleDescargar} className="w-full">
                Descargar Comprobante PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comprobante;