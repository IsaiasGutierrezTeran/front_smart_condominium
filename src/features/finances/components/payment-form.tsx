"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CreditCard, DollarSign, Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"

const paymentSchema = z.object({
  paymentType: z.string().min(1, "Please select a payment type"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardholderName: z.string().optional(),
  saveCard: z.boolean().optional(),
})

type PaymentFormData = z.infer<typeof paymentSchema>

export function PaymentForm() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      saveCard: false,
    },
  })

  const paymentMethod = watch("paymentMethod")
  const paymentType = watch("paymentType")

  const paymentOptions = [
    {
      id: "maintenance",
      title: "Monthly Maintenance Fee",
      amount: 1250.0,
      dueDate: "Due in 5 days",
      description: "Regular monthly maintenance and common area fees",
    },
    {
      id: "special",
      title: "Special Assessment - Roof Repair",
      amount: 500.0,
      dueDate: "Due in 15 days",
      description: "One-time assessment for building roof repairs",
    },
    {
      id: "parking",
      title: "Parking Fee",
      amount: 150.0,
      dueDate: "Due in 10 days",
      description: "Monthly parking space rental fee",
    },
    {
      id: "custom",
      title: "Custom Amount",
      amount: 0,
      dueDate: "Immediate",
      description: "Enter a custom payment amount",
    },
  ]

  const selectedPayment = paymentOptions.find((option) => option.id === paymentType)

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setPaymentSuccess(true)

    toast({
      title: "Payment Successful",
      description: `Your payment of ${formatCurrency(data.amount)} has been processed successfully.`,
    })
  }

  if (paymentSuccess) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Payment Successful!</h3>
            <p className="text-muted-foreground">Your payment has been processed successfully.</p>
          </div>
          <Button onClick={() => setPaymentSuccess(false)} className="w-full">
            Make Another Payment
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Make a Payment
          </CardTitle>
          <CardDescription>Select a payment type and enter your payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Payment Type Selection */}
            <div className="space-y-4">
              <Label>Select Payment Type</Label>
              <div className="grid gap-3">
                {paymentOptions.map((option) => (
                  <div
                    key={option.id}
                    className={cn(
                      "p-4 border rounded-lg cursor-pointer transition-colors",
                      paymentType === option.id ? "border-primary bg-primary/5" : "hover:bg-muted/50",
                    )}
                    onClick={() => {
                      setValue("paymentType", option.id)
                      if (option.id !== "custom") {
                        setValue("amount", option.amount)
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{option.title}</p>
                          {option.id === "special" && <Badge variant="destructive">Special</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                        <p className="text-xs text-muted-foreground">{option.dueDate}</p>
                      </div>
                      <div className="text-right">
                        {option.id !== "custom" && <p className="text-lg font-bold">{formatCurrency(option.amount)}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.paymentType && <p className="text-sm text-destructive">{errors.paymentType.message}</p>}
            </div>

            {/* Custom Amount Input */}
            {paymentType === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount", { valueAsNumber: true })}
                  className={cn(errors.amount && "border-destructive")}
                />
                {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
              </div>
            )}

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select onValueChange={(value) => setValue("paymentMethod", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentMethod && <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>}
            </div>

            {/* Credit Card Details */}
            {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
              <div className="space-y-4">
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      {...register("cardholderName")}
                      className={cn(errors.cardholderName && "border-destructive")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        {...register("cardNumber")}
                        className={cn(errors.cardNumber && "border-destructive", "pl-10")}
                      />
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        {...register("expiryDate")}
                        className={cn(errors.expiryDate && "border-destructive")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        {...register("cvv")}
                        className={cn(errors.cvv && "border-destructive")}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveCard"
                      {...register("saveCard")}
                      onCheckedChange={(checked) => setValue("saveCard", checked as boolean)}
                    />
                    <Label htmlFor="saveCard" className="text-sm">
                      Save this card for future payments
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Summary */}
            {selectedPayment && selectedPayment.id !== "custom" && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Payment Type:</span>
                      <span className="font-medium">{selectedPayment.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-bold text-lg">{formatCurrency(selectedPayment.amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Processing Fee:</span>
                      <span>$0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(selectedPayment.amount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Your payment information is encrypted and secure. We never store your full card details.
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay {selectedPayment ? formatCurrency(selectedPayment.amount) : "Now"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
