// Prevent constants modification
const baseUrl = 'https://www.amazon.com'

module.exports = Object.freeze({
  URLS: {
    BASE_URL: baseUrl,
    BEST_SELLERS: `${baseUrl}/gp/bestsellers/{slug}`,
    NODE: `${baseUrl}/b/?node={id}`,
    PRODUCT: `${baseUrl}/dp/{id}`,
    SEARCH: `${baseUrl}/s?k={searchTerm}`,
    SEARCH_CAT: `${baseUrl}/s?k={searchTerm}&i={i}`
  },

  PARAMETERS: {
    REFERER: 'ref',
    LANGUAGE: 'language'
  }
})
