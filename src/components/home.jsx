import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    const libraryUrl = '1WgnFl-8kZJ7UxWYEjyOWD4kW2w4-tI0F';

    const [library, setLibrary] = useState()

    async function getLib(folderId) {
      console.log('getLib worked')
  
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://www.googleapis.com/drive/v3/files?q=%22${folderId}%22%20in%20parents&key=${apiKey}`;
  
      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLibrary(data.files)
        console.log(library)
      } catch (error) {
        console.error('Error fetching public folder:', error);
      }
    }
  
    useEffect(() => {
      getLib(libraryUrl);
    }, [])
    
  
    return (
      <div>
        { library ? library.map((element) => (
          <Link to={`/folder/${element.id}`}>
            <div>{element.name}</div>
          </Link>
        )) : null }
        home
      </div>
    )
}

export default Home