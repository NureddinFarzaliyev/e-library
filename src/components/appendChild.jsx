import React from 'react'

const AppendChild = () => {

  setTimeout(() => {
    
    const foldersDiv = document.querySelector('.folders')
    const filesDiv = document.querySelector('.files')

    console.log(foldersDiv, filesDiv)

  }, 100);

  return (
    <div>AppendChild</div>
  )
}

export default AppendChild