import Navbar from "../components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import Footer from "../components/Footer";
import Title from "./components/Title";
import SmallPhotoBlock from "./components/SmallPhotoBlock";

function Main() {
  return (
     <div>
       <Navbar active='1'/>
      <Title/>
      <Gallery/>
      <SmallPhotoBlock/>
      <Content/>
      <Footer/>
     </div>
   );
}
export default Main;