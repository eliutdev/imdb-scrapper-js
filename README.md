# IMDb Scrapper

## Usage

```js
import imdbScrapper from 'imdb-scrapper'

// Using async await
(async () => {
  const data = await imdbScrapper('tt10161334')
  
  /* Output: 
  {
      title: string;
      description: string;
      image: string;
      type: string;
      userRating: string;
      genres: string[];
      director: string;
  }
  */
  
})()
