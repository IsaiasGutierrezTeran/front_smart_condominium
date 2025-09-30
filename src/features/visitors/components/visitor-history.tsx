export function VisitorHistory({ showAll = false }: { showAll?: boolean }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <p>Historial de visitantes {showAll ? "(completo)" : ""}</p>
        <p className="text-muted-foreground">Función en desarrollo</p>
      </div>
    </div>
  )
}