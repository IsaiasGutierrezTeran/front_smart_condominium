interface MaintenanceFormProps {
  onClose: () => void
}

export function MaintenanceForm({ onClose }: MaintenanceFormProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Nueva Solicitud de Mantenimiento</h2>
        <div className="text-center py-8">
          <p>Formulario de mantenimiento en desarrollo</p>
        </div>
        <button 
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}