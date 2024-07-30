import Logo from '../images/iden.webp'

function Header(){
    return(
        <>
            <main className="container d-flex justify-content-center align-items-center flex-column">
                <div className="card main-card p-5 text-center d-flex justify-content-center align-items-center">
                    <h1 className="jockey-one-regular" style={{fontSize: '7em'}}>ID<span style={{fontSize: '.5em'}}>.TT</span></h1>
                    <h2 className="poppins-regular">Forgot your ID? We got you!</h2>
                    <div className="d-flex justify-content-evenly mt-4" style={{width:'inherit'}}>
                        <a href="/login" className="themed-button">Login</a>
                        <a href="/register" className="themed-button">Register</a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Header