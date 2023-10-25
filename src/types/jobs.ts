export type JobCardType = 'logoBackground' & 'position' & 'contract' & 'location' & 'company' & 'id' & 'xata.createdAt' & 'logo.url'

export interface Job {
  company: string
  contract: string
  description: string
  id: string
  location: string
  website: string
  logo: [{
    url: string
  }]
  logoBackground: string
  position: string
  xata: {
    createdAt: Date
    updatedAt: Date
    version: number
  }
}