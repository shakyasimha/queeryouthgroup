'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

// Define the type for your dictionary entry
interface DictionaryEntry {
  id?: number
  english: string
  nepali: string
  definition_en: string
  definition_ne: string
  etymology_en?: string
  etymology_ne?: string
  explanation_en?: string
  explanation_ne?: string
  created_at?: string
}

export default function DictionaryPage() {
  const [entries, setEntries] = useState<DictionaryEntry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<DictionaryEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState<'en' | 'ne'>('en') // Toggle between English and Nepali

  const supabase = createClient()

  // Fetch dictionary entries from Supabase
  const fetchEntries = async () => {
    try {
      setLoading(true)
      console.log('Fetching from Supabase...')
      
      const { data, error } = await supabase
        .from('dictionary_terms') // Updated to correct table name
        .select('*')
        .order('english', { ascending: true })

      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      setEntries(data || [])
      setFilteredEntries(data || [])
      console.log('Entries loaded:', data?.length)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Search functionality
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredEntries(entries)
      return
    }

    const filtered = entries.filter(entry =>
      entry.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.nepali.includes(searchTerm) ||
      entry.definition_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition_ne.includes(searchTerm) ||
      (entry.etymology_en && entry.etymology_en.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (entry.etymology_ne && entry.etymology_ne.includes(searchTerm)) ||
      (entry.explanation_en && entry.explanation_en.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (entry.explanation_ne && entry.explanation_ne.includes(searchTerm))
    )
    setFilteredEntries(filtered)
  }

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(entries)
  }

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ne' : 'en')
  }

  // Fetch entries on component mount
  useEffect(() => {
    fetchEntries()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === 'en' ? 'Loading dictionary...' : 'शब्दकोश लोड हुँदैछ...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            {language === 'en' ? 'Error loading dictionary' : 'शब्दकोश लोड गर्न त्रुटि'}
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEntries}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {language === 'en' ? 'Try Again' : 'पुन: प्रयास'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {language === 'en' ? 'SOGIESC Dictionary' : 'SOGIESC शब्दकोश'}
            </h1>
            <button
              onClick={toggleLanguage}
              className="bg-[#d41367] text-white px-4 py-2 rounded-lg hover:bg-[#d41367]/50 transition-colors text-sm font-medium"
            >
              {language === 'en' ? 'नेपाली' : 'English'}
            </button>
          </div>
          <p className="text-gray-600">
            {language === 'en' 
              ? `Search through ${entries.length} entries` 
              : `${entries.length} शब्दहरू खोज्नुहोस्`
            }
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={language === 'en' 
                  ? "Search for words, definitions, etymology..." 
                  : "शब्द, परिभाषा, व्युत्पत्ति खोज्नुहोस्..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="bg-[#d41367] text-white px-6 py-2 rounded-lg hover:bg-[#d41367]/50 transition-colors font-medium"
              >
                {language === 'en' ? 'Search' : 'खोज्नुहोस्'}
              </button>
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  {language === 'en' ? 'Clear' : 'मेटाउनुहोस्'}
                </button>
              )}
            </div>
          </div>
          
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-3">
              {language === 'en' 
                ? `Found ${filteredEntries.length} result${filteredEntries.length !== 1 ? 's' : ''} for "${searchTerm}"`
                : `"${searchTerm}" का लागि ${filteredEntries.length} परिणाम फेला पर्यो`
              }
            </p>
          )}
        </div>

        {/* Dictionary Entries */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">
                {searchTerm 
                  ? (language === 'en' ? 'No entries found matching your search.' : 'खोजसँग मिल्दो कुनै शब्द फेला परेन।')
                  : (language === 'en' ? 'No entries available.' : 'कुनै शब्द उपलब्ध छैन।')
                }
              </p>
            </div>
          ) : (
            filteredEntries.map((entry, index) => (
              <div key={entry.id || index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                {/* Word Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-1">
                        {entry.english}
                      </h2>
                      <h3 className="text-2xl font-semibold text-indigo-700" style={{ fontFamily: 'serif' }}>
                        {entry.nepali}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Definitions */}
                <div className="space-y-4">
                  {((entry.definition_en && entry.definition_en.trim()) || (entry.definition_ne && entry.definition_ne.trim())) && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* English Definition */}
                      {entry.definition_en && entry.definition_en.trim() && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">
                            {language === 'en' ? 'Definition (English)' : 'परिभाषा (अङ्ग्रेजी)'}
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            {entry.definition_en}
                          </p>
                        </div>
                      )}

                      {/* Nepali Definition */}
                      {entry.definition_ne && entry.definition_ne.trim() && (
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">
                            {language === 'en' ? 'Definition (Nepali)' : 'परिभाषा (नेपाली)'}
                          </h4>
                          <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'serif' }}>
                            {entry.definition_ne}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Etymology */}
                  {((entry.etymology_en && entry.etymology_en.trim()) || (entry.etymology_ne && entry.etymology_ne.trim())) && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {entry.etymology_en && entry.etymology_en.trim() && (
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-900 mb-2">
                            {language === 'en' ? 'Etymology (English)' : 'व्युत्पत्ति (अङ्ग्रेजी)'}
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {entry.etymology_en}
                          </p>
                        </div>
                      )}

                      {entry.etymology_ne && entry.etymology_ne.trim() && (
                        <div className="bg-orange-50 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-900 mb-2">
                            {language === 'en' ? 'Etymology (Nepali)' : 'व्युत्पत्ति (नेपाली)'}
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: 'serif' }}>
                            {entry.etymology_ne}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Explanation */}
                  {((entry.explanation_en && entry.explanation_en.trim()) || (entry.explanation_ne && entry.explanation_ne.trim())) && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {entry.explanation_en && entry.explanation_en.trim() && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {language === 'en' ? 'Explanation (English)' : 'व्याख्या (अङ्ग्रेजी)'}
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {entry.explanation_en}
                          </p>
                        </div>
                      )}

                      {entry.explanation_ne && entry.explanation_ne.trim() && (
                        <div className="bg-yellow-50 rounded-lg p-4">
                          <h4 className="font-semibold text-yellow-900 mb-2">
                            {language === 'en' ? 'Explanation (Nepali)' : 'व्याख्या (नेपाली)'}
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: 'serif' }}>
                            {entry.explanation_ne}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {filteredEntries.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              {language === 'en' 
                ? `Showing ${filteredEntries.length} of ${entries.length} entries`
                : `${entries.length} मध्ये ${filteredEntries.length} शब्द देखाइँदै`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}