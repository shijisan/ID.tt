import ProfilePic from './ProfilePic.jsx'

function StudentDashboardComponent(){
    return(
        <>
            <main className="container py-5">

                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <ProfilePic />
                            <hr />
                            <ul className="profileDetails">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}

export default StudentDashboardComponent