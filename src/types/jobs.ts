export interface Job {
  company: string,
  contract: string,
  description: string,
  id: string,
  location: string,
  logo: string,
  logoBackground: string,
  position: string
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