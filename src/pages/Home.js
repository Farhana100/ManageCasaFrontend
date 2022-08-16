import React from 'react'
import logo from '../my-components/brand/logo.svg'
import '../my-components/content/static/css/home.css'
import Footer from '../my-components/Footer'

export default function Home() {
  return (
    <div>
        <div className='home-bg-image1-grad'>
            <div className="text-center my-5">
                <img className="img-fluid mb-4" src={logo} alt="..." />
                <h1 className="fs-3 fw-bolder">ManageCasa</h1>
            </div>
            <div className="py-5 bg-image-full home-bg-image1">
                <div className="py-5"></div>
            </div>
        </div>
         {/* Content section */}
        <section className="py-5">
            <div className="container my-5">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-6">
                        <h2>A platform to manage Apartments</h2>
                        <p className="lead">We are here to make your life easy.</p>
                        <p className="mb-0">The universe is almost 14 billion years old, and, wow! Life had no problem starting here on Earth! I think it would be inexcusably egocentric of us to suggest that we're alone in the universe.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Image element - set the background image for the header in the line below--> */}
        <div className="py-5 bg-image-full home-bg-image2"></div>
        {/* <!-- Content section--> */}
        <section className="py-5">
            <div className="container my-5">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-6">
                        <h2>What do we have to offer?</h2>
                        <p className="lead">Automate payments and bills, hold Apartment management committee elections, preserve and easy access to your data and many more ...</p>
                        <p className="mb-0">Join us to find out!</p>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- Footer--> */}
        <Footer/>
    </div>
  )
}
