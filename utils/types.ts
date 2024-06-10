export type Response<T> = {
  status: 'success' | 'error',
  data: T | null,
  message: string
}
export type ZayavkaCreateInput = {
  equipment: string
  clientId: number
  description: string
  issueType: string
  executorId?: number | null
  status: string
}