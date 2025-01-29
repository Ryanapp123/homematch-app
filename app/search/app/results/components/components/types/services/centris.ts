import type { Property, ListingSource } from "../types/listings"

const CENTRIS_SOURCE: ListingSource = {
  name: "Centris",
  logo: "https://www.centris.ca/images/centris-ca.png",
  url: "https://www.centris.ca",
}

export function formatCentrisUrl(params: Record<string, string>) {
  const baseUrl = "https://www.centris.ca/en/properties~for-sale"
  const location = params.location ? `~${params.location}` : ""
  return `${baseUrl}${location}`
}

export function mockCentrisListings(): Property[] {
  return [
    {
      id: "centris-1",
      title: "Beautiful House in Les Nations",
      price: 299000,
      location: "Sherbrooke (Les Nations)",
      bedrooms: 3,
      bathrooms: 1,
      propertyType: "House for sale",
      images: [
        "https://sjc.microlink.io/olPxTGPVp5qiT-NTZhmDXrcqodqMFXe7_HZag9cU-TibY64lfAYURNYODy4PW3aFl7BF5wz2SGDxwjrLnRfmGg.jpeg",
      ],
      virtualTour: "https://my.matterport.com/show/?m=example",
      source: CENTRIS_SOURCE,
      sourceUrl: "https://www.centris.ca/en/properties~for-sale~sherbrooke",
    },
    {
      id: "centris-2",
      title: "Spacious Property in Rock Forest",
      price: 929000,
      location: "Sherbrooke (Rock Forest)",
      bedrooms: 4,
      bathrooms: 3,
      propertyType: "House for sale",
      images: [
        "https://sjc.microlink.io/olPxTGPVp5qiT-NTZhmDXrcqodqMFXe7_HZag9cU-TibY64lfAYURNYODy4PW3aFl7BF5wz2SGDxwjrLnRfmGg.jpeg",
      ],
      source: CENTRIS_SOURCE,
      sourceUrl: "https://www.centris.ca/en/properties~for-sale~sherbrooke",
    },
  ]
}
