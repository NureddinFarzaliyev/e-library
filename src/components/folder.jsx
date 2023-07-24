import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Folder = () => {

    const id = useParams().id

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
      getLib(id);
    }, [])

    return (
        <div>
            {library ? library.map((element) => (
                <div key={element.id}>
                    {element.mimeType === "application/vnd.google-apps.folder" ? (
                        <Link onClick={setTimeout(() => {
                            () => window.location.reload()
                        }, 200)} to={`/folder/${element.id}`}>{element.name}</Link>
                    ) : (
                        <span>NOT FOLDER <a href={`https://drive.google.com/file/d/${element.id}/view`} target='_blank'>{element.name}</a></span>
                    )}
                </div>
            )) : null}
        </div>
    )
}

export default Folder