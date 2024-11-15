import { Helmet } from 'react-helmet-async'
// import previewImage from './assets/preview.jpg'

const Wrapper = ({ children }) => {
  //   const description = 'Welcome to the future of DeFi.'
  //   const image = previewImage
  //   const title = 'Sirio Finance'
  //   const url = window.location.origin

  return (
    <>
      {/* <Helmet prioritizeSeoTags>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:card" content={image} />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Helmet> */}
      {children}
    </>
  )
}

export default Wrapper
