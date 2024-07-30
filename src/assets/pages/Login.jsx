import Nav from "../components/Nav"
import BorderLine from "../components/BorderLine"
import Footer from "../components/Footer"
import StudentLogin from "../components/StudentLogin";

function Homepage(){
    return(
        <>
            <Nav />
            <BorderLine />
            <StudentLogin />
            <Footer />
        </>
    );
}
export default Homepage