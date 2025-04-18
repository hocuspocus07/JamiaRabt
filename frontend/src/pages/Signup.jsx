import SignupComponent from "../components/SignupComponent.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

export default function Signup() {

  return (
    <>
      <div className='flex'>
        <NavBar />
        <div>
          <SignupComponent />
          <Footer />
        </div>
      </div>
    </>
  );
}