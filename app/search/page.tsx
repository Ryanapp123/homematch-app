'use client'

import { useState } from 'react'
import { Header } from '../../components/header'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AffordabilityCalculator } from '../../components/AffordabilityCalculator'

export default function Search() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    listingType: '',
  })
  const [affordability, setAffordability] = useState(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setSearchParams({
      ...searchParams,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (affordability) {
      params.append('maxPrice', affordability.maxHomePrice.toString())
    }
    router.push(`/results?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Your Perfect Home Across All Platforms</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    placeholder="Enter city, state, or zip code"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <Select name="propertyType" onValueChange={(value) => handleSelectChange('propertyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="listingType" className="block text-sm font-medium text-gray-700">
                    Listing Type
                  </label>
                  <Select name="listingType" onValueChange={(value) => handleSelectChange('listingType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                      Min Price
                    </label>
                    <Input
                      id="minPrice"
                      name="minPrice"
                      type="number"
                      value={searchParams.minPrice}
                      onChange={handleInputChange}
                      placeholder="Minimum price"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                      Max Price
                    </label>
                    <Input
                      id="maxPrice"
                      name="maxPrice"
                      type="number"
                      value={searchParams.maxPrice}
                      onChange={handleInputChange}
                      placeholder="Maximum price"
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
          <AffordabilityCalculator
            onCalculate={(result) => setAffordability(result)}
          />
        </div>
        {affordability && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Affordability Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Based on your input, you can afford:</p>
              <p className="text-2xl font-bold text-green-600">
                Home price up to: ${affordability.maxHomePrice.toLocaleString()}
              </p>
              <p className="text-xl">
                Estimated monthly payment: ${affordability.monthlyPayment.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
