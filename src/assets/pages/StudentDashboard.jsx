import Nav from "../components/Nav"
import BorderLine from "../components/BorderLine"
import Footer from "../components/Footer"
import StudentDashboardComponent from "../components/StudentDashboardComponent";

function StudentDashboard(){
    return(
        <>
            <Nav />
            <BorderLine />
            <StudentDashboardComponent />
            <Footer />
        </>
    );
}
export default StudentDashboard