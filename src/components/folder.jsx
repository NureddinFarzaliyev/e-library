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
        console.error('Error fetching folder:', error);
      }
    }
  
    useEffect(() => {
      getLib(id);
    }, [])

    return (
        <div>
          {/* <div className='elements-container'>
            {library ? library.map((element) => (
                <div key={element.id} className='element'>
                    {element.mimeType === "application/vnd.google-apps.folder" ? (
                        <Link className='folder-element' key={element.id} onClick={setTimeout(() => {
                            () => window.location.reload()}, 200)} to={`/folder/${element.id}`}>
                            {element.name}
                        </Link>
                    ) : (
                          <a className='file-element' href={`https://drive.google.com/file/d/${element.id}/view`} target='_blank'>
                            {element.name} 
                          </a>
                      )}
                </div>
            )) : null}
          </div> */}

          <div className="elements-container flex items-center justify-center bg-red-900 w-screen h-screen">

            <div className="folders-container flex flex-col mx-10 ml-52 w-56 h-[35rem]">
              {
                library ? library.map((element) => (
                  element.mimeType === "application/vnd.google-apps.folder" ? (
                    <Link className='folder-element' key={element.id} onClick={setTimeout(() => {
                      () => window.location.reload()}, 200)} to={`/folder/${element.id}`}>
                      {element.name}
                    </Link>
                  ) : null
                )) : null
              }
            </div>

            <div className='h-[38rem] bg-gray-700 w-1'></div>

            <div className="files-container flex flex-col mx-20 w-[60rem] h-[35rem]">
              {
                library ? library.map((element) => (
                  element.mimeType != "application/vnd.google-apps.folder" ? (
                    <a className='file-element' href={`https://drive.google.com/file/d/${element.id}/view`} target='_blank'>
                      {element.name} 
                    </a>
                  ) : null
                )) : null
              }
            </div>

          </div>
        </div>
    )
}

export default Folder