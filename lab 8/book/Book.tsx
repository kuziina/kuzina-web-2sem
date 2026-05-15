import Navbar from "../components/Navbar";
import Content from "./components/Content";
import Footer from "../components/Footer";
import structures from '../data';
import { useParams } from 'react-router-dom';

function Book(){

    const { id } = useParams();
    const struct = structures[Number(id)];

    return(
        <>
            <Navbar active="1"/>
            <Content book={struct}/>
            <Footer/>
        </>
    )
}

export default Book;