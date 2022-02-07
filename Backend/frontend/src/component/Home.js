import React from 'react';
import Notes from './Notes'
import AddNote from './AddNote'
import book1 from './images/book1.jpg'
export default function Home(props) {
    const background = {

        backgroundImage: `url(${book1})`,
        backgroundRepeat: 'no-repeat',
        // backgroundAttachment:'fixed',
        width: "100vw",
        height: "100vh",
        backgroundSize: 'cover',
        justifyContent: 'center',
        alignItem: 'center',
        backgroundPosition: 'center',

    }
    const { showAlert } = props;
    return <>
       

            <div style={background}>
            {/* <div style={{ "height": "93vh" }}> */}
                <AddNote showAlert={showAlert} />
                <div className='justify-content-center d-flex ' style={{"color":"white"}}>
                    <u><h3>Your Notes</h3></u>
                </div>

                <Notes showAlert={showAlert} />
            </div>
        {/* </div> */}
    </>

}
