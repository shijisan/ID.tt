import Nav from "../components/Nav"
import BorderLine from "../components/BorderLine"
import Footer from "../components/Footer"
import StudentRegister from "../components/StudentRegister"

function Homepage(){
    return(
        <>
            <Nav />
            <BorderLine />
            <StudentRegister />
            <Footer />
        </>
    );
}
export default Homepage