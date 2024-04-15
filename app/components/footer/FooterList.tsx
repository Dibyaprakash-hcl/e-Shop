import React from 'react'
import "./footer.scss"

interface FooterListProps{
    children:React.ReactNode;
}

const FooterList:React.FC<FooterListProps> = ({children}) => {
  return (
    <div className='footer-list'>
      {children}
    </div>
  )
}

export default FooterList
