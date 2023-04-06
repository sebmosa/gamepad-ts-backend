export class RawgService {
  static apiFormat(url: string | null) {
    if (url !== null) {
      const api_host = process.env.API_HOST
      const urlParams = new URLSearchParams(url.split('?')[1])

      const api_page_size = urlParams.get('page_size')
      const default_page = '1'
      const api_page = urlParams.get('page') ?? default_page
      const api_search = urlParams.get('search')?.replace(/\s/g, '+')
      const api_search_precise = urlParams.get('search_precise')
      const api_platforms = urlParams.get('platforms')
      const api_genres = urlParams.get('genres')
      const api_metacritic = urlParams.get('metacritic')
      const ordering = urlParams.get('ordering')

      let apiUrl = ''

      if (api_genres === '' || api_platforms === '') {
        apiUrl = `${api_host}/games?page_size=${api_page_size}&page=${api_page}&search=${api_search}&search_precise=${api_search_precise}&metacritic=${api_metacritic}&ordering=${ordering}`
      } else {
        apiUrl = `${api_host}/games?page_size=${api_page_size}&page=${api_page}&search=${api_search}&search_precise=${api_search_precise}&platforms=${api_platforms}&genres=${api_genres}&metacritic=${api_metacritic}&ordering=${ordering}`
      }

      return apiUrl
    } else {
      return null
    }
  }
}
