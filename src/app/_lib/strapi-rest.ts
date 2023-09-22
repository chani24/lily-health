const baseUrl = process.env.STRAPI_API_ENDPOINT;

export async function fetcher(url: string) {
    try {
      const response = await fetch( baseUrl + url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
}
  
 export const imageLoader = ({ src, width}: {src: string, width: number}) => {
  return `${src}?w=${width}&q=100`
}