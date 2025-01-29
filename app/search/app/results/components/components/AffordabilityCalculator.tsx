'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AffordabilityResult {
  maxHomePrice: number
  monthlyPayment: number
}

export function AffordabilityCalculator({ onCalculate }: { onCalculate: (result: AffordabilityResult) => void }) {
  const [annualIncome, setAnnualIncome] = useState(50000)
  const [downPayment, setDownPayment] = useState(20000)
  const [interestRate, setInterestRate] = useState(3)
  const [loanTerm, setLoanTerm] = useState(30)

  const calculateAffordability = () => {
    // This is a simplified calculation and should be refined for a real application
    const monthlyIncome = annualIncome / 12
    const maxMonthlyPayment = monthlyIncome * 0.28 // Using 28% rule
    
    const r = interestRate / 100 / 12
    const n = loanTerm * 12
    const presentValueFactor = (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))
    
    const maxLoanAmount = maxMonthlyPayment * presentValueFactor
    const maxHomePrice = maxLoanAmount + downPayment

    onCalculate({
      maxHomePrice: Math.round(maxHomePrice),
      monthlyPayment: Math.round(maxMonthlyPayment)
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Affordability Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">
            Annual Income
          </label>
          <Input
            id="annualIncome"
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700">
            Down Payment
          </label>
          <Input
            id="downPayment"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
            Interest Rate: {interestRate}%
          </label>
          <Slider
            id="interestRate"
            min={0}
            max={10}
            step={0.1}
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700">
            Loan Term (years): {loanTerm}
          </label>
          <Slider
            id="loanTerm"
            min={5}
            max={30}
            step={5}
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
            className="mt-1"
          />
        </div>
        <Button onClick={calculateAffordability} className="w-full">
          Calculate Affordability
        </Button>
      </CardContent>
    </Card>
  )
}
