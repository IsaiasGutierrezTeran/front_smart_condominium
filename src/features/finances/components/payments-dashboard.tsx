"use client"

import { CreditCard, DollarSign, TrendingUp, Calendar, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/features/auth/components/auth-provider"
import { formatCurrency, formatDate } from "@/lib/utils"

export function PaymentsDashboard() {
  const { user } = useAuth()

  const currentBalance = -1250.0
  const nextPaymentDue = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
  const lastPayment = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago

  const upcomingPayments = [
    {
      id: "1",
      description: "Monthly Maintenance Fee",
      amount: 1250.0,
      dueDate: nextPaymentDue,
      status: "pending",
      category: "maintenance",
    },
    {
      id: "2",
      description: "Special Assessment - Roof Repair",
      amount: 500.0,
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: "pending",
      category: "special",
    },
    {
      id: "3",
      description: "Parking Fee",
      amount: 150.0,
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: "pending",
      category: "parking",
    },
  ]

  const recentTransactions = [
    {
      id: "1",
      description: "Monthly Maintenance Fee",
      amount: -1250.0,
      date: lastPayment,
      status: "completed",
      method: "Bank Transfer",
    },
    {
      id: "2",
      description: "Late Fee Waiver",
      amount: 25.0,
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      status: "completed",
      method: "Credit",
    },
    {
      id: "3",
      description: "Parking Fee",
      amount: -150.0,
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
      status: "completed",
      method: "Credit Card",
    },
  ]

  const stats = [
    {
      title: "Current Balance",
      value: formatCurrency(Math.abs(currentBalance)),
      description: currentBalance < 0 ? "Amount Due" : "Credit Balance",
      icon: DollarSign,
      color: currentBalance < 0 ? "text-red-500" : "text-green-500",
    },
    {
      title: "Next Payment",
      value: formatDate(nextPaymentDue),
      description: "Due in 5 days",
      icon: Calendar,
      color: "text-orange-500",
    },
    {
      title: "Last Payment",
      value: formatDate(lastPayment),
      description: "Monthly maintenance",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Payment Method",
      value: "Auto-Pay",
      description: "Bank transfer enabled",
      icon: CreditCard,
      color: "text-blue-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Upcoming Payments
            </CardTitle>
            <CardDescription>Payments due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-sm text-muted-foreground">Due: {formatDate(payment.dueDate)}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold">{formatCurrency(payment.amount)}</p>
                  <Badge variant={payment.category === "special" ? "destructive" : "secondary"} className="text-xs">
                    {payment.category}
                  </Badge>
                </div>
              </div>
            ))}
            <Button className="w-full">Pay All Outstanding</Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Your latest payment activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)} • {transaction.method}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className={`font-bold ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                    {transaction.amount < 0 ? "-" : "+"}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Annual Payment Progress</CardTitle>
          <CardDescription>Track your yearly payment obligations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Maintenance Fees</span>
              <span>10/12 months paid</span>
            </div>
            <Progress value={83} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Special Assessments</span>
              <span>2/3 payments made</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Parking Fees</span>
              <span>11/12 months paid</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
