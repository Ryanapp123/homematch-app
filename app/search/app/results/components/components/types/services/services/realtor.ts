import type { Property, ListingSource } from "../types/listings"

const REALTOR_SOURCE: ListingSource = {
  name: "Realtor.ca",
  logo: "https://www.realtor.ca/images/realtor-ca-logo.png",
  url: "https://www.realtor.ca",
}

export function formatRealtorUrl(params: Record<string, string>) {
  const baseUrl = "https://www.realtor.ca/qc"
  const location = params.location ? `/${params.location.toLowerCase()}` : ""
  return `${baseUrl}${location}/real-estate`
}

export function mockRealtorListings(): Property[] {
  return [
    {
      id: "realtor-1",
      title: "Modern Family Home in Sherbrooke",
      price: 449900,
      location: "Sherbrooke, QC",
      bedrooms: 4,
      bathrooms: 2,
      propertyType: "Single Family",
      images: [
        "https://sjc.microlink.io/SyaogdfDWGEyPzEPujbO8W4SVI7QrOww2JUoXJXm1ExBn2XP1hd68_TvP_yW1XfAhIW7T2PjC6T-WkvC7qxPng.jpeg",
      ],
      source: REALTOR_SOURCE,
      sourceUrl: "https://www.realtor.ca/qc/sherbrooke/real-estate",
    },
    {
      id: "realtor-2",
      title: "Renovated Condo Downtown",
      price: 289000,
      location: "Downtown Sherbrooke, QC",
      bedrooms: 2,
      bathrooms: 1,
      propertyType: "Condo",
      images: [
        "https://sjc.microlink.io/SyaogdfDWGEyPzEPujbO8W4SVI7QrOww2JUoXJXm1ExBn2XP1hd68_TvP_yW1XfAhIW7T2PjC6T-WkvC7qxPng.jpeg",
      ],
      source: REALTOR_SOURCE,
      sourceUrl: "https://www.realtor.ca/qc/sherbrooke/real-estate",
    },
  ]
}
