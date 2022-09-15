const NotFound = () => {
    return (
        <body className='body_nf' style={{background:"gray"}}>
            <section className="notFound">
            <div className="text" style={{color:"white"}}>
                    <h1 className="text-center">404</h1>
                    <h2 className="text-center">PAGE NOT FOUND</h2>
                </div>
                <div className="img text-center">
                    <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage" />
                    <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly" />
                </div>
            </section>
        </body>
    )
}

export default NotFound 