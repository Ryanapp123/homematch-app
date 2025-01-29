"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "../../components/header"
import type { Property } from "../../types/listings"
import { mockCentrisListings } from "../../services/centris"
import { mockRealtorListings } from "../../services/realtor"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bed, Bath, ExternalLink, Home, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Results() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)

  // Use useMemo to memoize the filtered listings
  const filteredListings = useMemo(() => {
    const allListings = [...mockCentrisListings(), ...mockRealtorListings()]
    const maxPrice = searchParams.get("maxPrice")
    let filtered = allListings

    if (maxPrice) {
      filtered = filtered.filter((listing) => listing.price <= Number.parseInt(maxPrice))
    }

    if (selectedSource) {
      filtered = filtered.filter((listing) => listing.source.name === selectedSource)
    }

    return filtered
  }, [searchParams, selectedSource])

  useEffect(() => {
    // Simulate an API call
    const timer = setTimeout(() => {
      setListings(filteredListings)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [filteredListings])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter by source:</span>
            <Button variant={selectedSource === null ? "secondary" : "outline"} onClick={() => setSelectedSource(null)}>
              All
            </Button>
            <Button
              variant={selectedSource === "Centris" ? "secondary" : "outline"}
              onClick={() => setSelectedSource("Centris")}
            >
              Centris
            </Button>
            <Button
              variant={selectedSource === "Realtor.ca" ? "secondary" : "outline"}
              onClick={() => setSelectedSource("Realtor.ca")}
            >
              Realtor.ca
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={listing.images[0] || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
                {listing.virtualTour && (
                  <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    Virtual Tour Available
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow text-sm font-semibold">
                  {listing.source.name}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{listing.title}</CardTitle>
                <p className="text-2xl font-bold text-blue-600">${listing.price.toLocaleString()}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  {listing.bedrooms && (
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{listing.bedrooms} beds</span>
                    </div>
                  )}
                  {listing.bathrooms && (
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{listing.bathrooms} baths</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span>{listing.propertyType}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{listing.location}</p>
                <a
                  href={listing.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                  View on {listing.source.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

