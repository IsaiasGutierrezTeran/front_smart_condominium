"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentsDashboard } from "@/features/finances/components/payments-dashboard"
import { PaymentHistory } from "@/features/finances/components/payment-history"
import { PaymentForm } from "@/features/finances/components/payment-form"
import { FinancialReports } from "@/features/finances/components/financial-reports"
import { useAuth } from "@/features/auth/components/auth-provider"

export function FinancesPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financial Management</h1>
        <p className="text-muted-foreground">Manage payments, fees, and financial reports</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="payments">Make Payment</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <PaymentsDashboard />
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentForm />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <PaymentHistory />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <FinancialReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}
