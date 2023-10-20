export type JobCardType = 'logoBackground' & 'position' & 'contract' & 'location' & 'company' & 'id' & 'xata.createdAt' & 'logo.url'

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