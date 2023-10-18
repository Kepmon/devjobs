export interface Job {
  company: string
  contract: string
  description: string
  id: string
  location: string
  website: string
  logo: string
  logoBackground: string
  position: string
  xata: {
    createdAt: string
    updatedAt: string
    version: number
  }
}

export interface SearchQuery {
  location: string
  contract: string
  $or: [
    { company: string },
    { description: string },
    { position: string }
  ]
}