"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, DollarSign, Calendar, Download, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"

export function FinancialReports() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [reportType, setReportType] = useState("monthly")

  // Mock data for charts
  const monthlyData = [
    { month: "Jan", maintenance: 1250, parking: 150, special: 0, total: 1400 },
    { month: "Feb", maintenance: 1250, parking: 150, special: 0, total: 1400 },
    { month: "Mar", maintenance: 1250, parking: 150, special: 500, total: 1900 },
    { month: "Apr", maintenance: 1250, parking: 150, special: 0, total: 1400 },
    { month: "May", maintenance: 1250, parking: 150, special: 0, total: 1400 },
    { month: "Jun", maintenance: 1250, parking: 150, special: 0, total: 1400 },
    { month: "Jul", maintenance: 1250, parking: 150, special: 0, total: 1400 },
    { month: "Aug", maintenance: 1250, parking: 150, special: 0, total: 1400 },
    { month: "Sep", maintenance: 1250, parking: 150, special: 0, total: 1400 },
    { month: "Oct", maintenance: 1250, parking: 150, special: 0, total: 1400 },
    { month: "Nov", maintenance: 1250, parking: 150, special: 500, total: 1900 },
    { month: "Dec", maintenance: 1250, parking: 150, special: 0, total: 1400 },
  ]

  const categoryData = [
    { name: "Maintenance Fees", value: 15000, color: "#3b82f6" },
    { name: "Parking Fees", value: 1800, color: "#8b5cf6" },
    { name: "Special Assessments", value: 1000, color: "#ef4444" },
    { name: "Late Fees", value: 200, color: "#f59e0b" },
  ]

  const yearlyComparison = [
    { year: "2022", total: 16500 },
    { year: "2023", total: 17200 },
    { year: "2024", total: 18000 },
  ]

  const totalPaid = monthlyData.reduce((sum, month) => sum + month.total, 0)
  const averageMonthly = totalPaid / 12

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Reports</h2>
          <p className="text-muted-foreground">Analyze your payment patterns and financial data</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid {selectedYear}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPaid)}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageMonthly)}</div>
            <p className="text-xs text-muted-foreground">Regular payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Special Assessments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1000)}</div>
            <p className="text-xs text-muted-foreground">2 assessments this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Score</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Excellent</div>
            <p className="text-xs text-muted-foreground">100% on-time payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
          <TabsTrigger value="categories">Payment Categories</TabsTrigger>
          <TabsTrigger value="trends">Yearly Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payment Breakdown - {selectedYear}</CardTitle>
              <CardDescription>Track your monthly payments by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    formatter={(value, name) => [formatCurrency(value as number), name]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="maintenance" stackId="a" fill="#3b82f6" name="Maintenance" />
                  <Bar dataKey="parking" stackId="a" fill="#8b5cf6" name="Parking" />
                  <Bar dataKey="special" stackId="a" fill="#ef4444" name="Special" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Distribution</CardTitle>
                <CardDescription>Breakdown by payment category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Details</CardTitle>
                <CardDescription>Detailed breakdown of each category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(category.value)}</p>
                      <p className="text-xs text-muted-foreground">
                        {((category.value / totalPaid) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Payment Trends</CardTitle>
              <CardDescription>Compare your annual payment totals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
