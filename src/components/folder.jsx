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
          throw new Error('Response was not ok');
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

          <div className="elements-container flex items-center justify-center bg-bg-color overflow-hidden text-text-color w-screen h-screen">

            <div className="folders-container flex flex-col mx-10 ml-52 w-96 h-[35rem] overflow-y-scroll overflow-x-hidden">

              <Link to={'/'} className='flex bg-whiteish text-black p-2 rounded font-bold mb-5 fixed'>
                <img src="/public/home-icon-silhouette-svgrepo-com.svg" className='h-6 mr-3' alt="" />
                <div>Home</div>
              </Link>

              <div className='mt-12'>
                {
                  library ? library.map((element) => (
                    element.mimeType === "application/vnd.google-apps.folder" ? (
                      <Link className='folder-element flex h-10 w-64 items-center hover:bg-gray-900 rounded py-4 px-2' key={element.id} onClick={setTimeout(() => {
                        () => window.location.reload()}, 200)} to={`/folder/${element.id}`}>
                        <img src="/public/folder-icon.svg" alt="" />
                        <div className='ml-2'>{element.name}</div>
                      </Link>
                    ) : null
                  )) : null
                }
              </div>
            </div>

            <div className='h-[38rem] bg-gray-700 w-1'></div>

            <div className="files-container flex flex-col mx-20 w-[60rem] h-[35rem] mt-20 overflow-y-scroll">

              <div className="searchbar">
                <input type="text" name="search" id="search" placeholder='Search for files...' className='bg-secondary-color w-96 fixed mb-4 p-2 rounded h-10 mt-[-3rem]' />
              </div>


              <div>
                {
                  library ? library.map((element) => (
                    element.mimeType != "application/vnd.google-apps.folder" ? (
                      <div className='bg-secondary-color hover:bg-gray-900 transition rounded my-1 p-2 '>
                        <a className='file-element flex' href={`https://drive.google.com/file/d/${element.id}/view`} target='_blank'>
                          <img src="/public/file-icon.svg" className='mr-3 ml-2' alt="" /> 
                          <div>{element.name}</div>
                        </a>
                      </div>
                    ) : null
                  )) : null
                }
              </div>


            </div>

          </div>
        </div>
    )
}

export default Folder