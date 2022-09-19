const Footer = () => {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 " style={{ backgroundColor: "#282c34", width: "100%" }}>
            <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    {/**va un logo**/}
                </a>
                <span className="text" style={{ color: "white" }}>© Proyecto Programación 3</span>
            </div>
            <h3 style={{ fontsize: "0.5em", color: "white", fontFamily: "impact" }} className="text-center">Campastro, Quintana y Le Gras</h3>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            </ul>
        </footer>
    )
}

export default Footer