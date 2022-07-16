import React from 'react'
import logo from './brand/logo.svg'
import test from './content/static/images/test.jpeg'
import './content/static/css/home.css'

export default function Home() {
  return (
    <div>
        <div className='test'>
            <div className="text-center my-5">
                <img className="img-fluid mb-4" src={logo} alt="..." />
                <h1 className="fs-3 fw-bolder">ManageCasa</h1>
            </div>
            <div className="py-5 bg-image-full home-bg-image">
                <div className="py-5"></div>
            </div>
        </div>
         {/* Content section */}
        <section className="py-5">
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <h2>Full Width Backgrounds</h2>
                        <p className="lead">A single, lightweight helper class allows you to add engaging, full width background images to sections of your page.</p>
                        <p className="mb-0">The universe is almost 14 billion years old, and, wow! Life had no problem starting here on Earth! I think it would be inexcusably egocentric of us to suggest that we're alone in the universe.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Image element - set the background image for the header in the line below--> */}
        <div className="py-5 bg-image-full home-bg-image-test"></div>
        {/* <!-- Content section--> */}
        <section className="py-5">
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <h2>Engaging Background Images</h2>
                        <p className="lead">The background images used in this template are sourced from Unsplash and are open source and free to use.</p>
                        <p className="mb-0">I can't tell you how many people say they were turned off from science because of a science teacher that completely sucked out all the inspiration and enthusiasm they had for the course.</p>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- Footer--> */}
        <footer className="py-5 bg-dark">
            <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2022</p></div>
        </footer>
    </div>
  )
}
