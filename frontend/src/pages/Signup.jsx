import SignupComponent from "../components/SignupComponent.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

export default function Signup() {

  return (
    <>
      <div className='flex'>
        <NavBar />
        <div className="sm:flex-1 sm:ml-60">
          <SignupComponent />
          <Footer />
        </div>
      </div>
    </>
  );
}