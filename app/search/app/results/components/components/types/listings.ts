export interface ListingSource {
  name: string
  logo: string
  url: string
}

export interface Property {
  id: string
  title: string
  price: number
  location: string
  bedrooms?: number
  bathrooms?: number
  propertyType: string
  images: string[]
  virtualTour?: string
  source: ListingSource
  sourceUrl: string
  squareFeet?: number
}
