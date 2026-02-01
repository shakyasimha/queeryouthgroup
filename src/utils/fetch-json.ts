// For fetching json content from dictionary.json

// utils/fetch-json.ts
interface DictionaryEntry {
  id?: number
  english: string
  nepali: string
  definition_en: string
  definition_ne: string
  etymology_en?: string | null
  etymology_ne?: string | null
  explanation_en?: string | null
  explanation_ne?: string | null
}

interface DictionaryResponse {
  data: DictionaryEntry[]
  error: null | string
}

/**
 * Fetches dictionary data from the local JSON file
 * @returns Promise containing dictionary data and error state
 */
export async function fetchDictionaryData(): Promise<DictionaryResponse> {
  try {
    // Import the JSON file directly
    const dictionaryData = await import('@/data/dictionary.json')
    
    return {
      data: dictionaryData.data || [],
      error: null
    }
  } catch (error) {
    console.error('Error loading dictionary data:', error)
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Failed to load dictionary data'
    }
  }
}

/**
 * Alternative: Fetch from public folder (if you move dictionary.json to /public)
 * This would be useful if you want to fetch it as a network request
 */
export async function fetchDictionaryDataFromPublic(): Promise<DictionaryResponse> {
  try {
    const response = await fetch('/data/dictionary.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: DictionaryResponse = await response.json()
    
    return {
      data: data.data || [],
      error: null
    }
  } catch (error) {
    console.error('Error fetching dictionary data:', error)
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch dictionary data'
    }
  }
}