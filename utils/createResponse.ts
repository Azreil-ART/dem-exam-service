import type { Response } from "./types"

export default <T>(status: 'success' | 'error', data: T | null | any, message: string): Response<T> => {
  return { status, data, message }
}
