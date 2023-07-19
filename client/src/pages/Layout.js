import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const Layout = ({children}) => {
  return (
    <div className='container'>
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}

export default Layout;
