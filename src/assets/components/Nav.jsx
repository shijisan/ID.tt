import Logo from '../images/iden.webp'

function Nav(){
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark poppins-regular">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={Logo} alt="Logo" className="d-inline-block align-text-top" style={{height:'8vh'}}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end mt-4" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item d-none" href="#">Profile</a></li>
                                    <li><a className="dropdown-item" href="/login">Login</a></li>
                                    <li><a className="dropdown-item" href="/register">Register</a></li>
                                    <li><hr className="dropdown-divider d-none" /></li>
                                    <li><a className="dropdown-item d-none" href="#">Log-out</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav