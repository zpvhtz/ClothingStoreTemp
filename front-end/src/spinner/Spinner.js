import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class Spinner extends React.Component{
    render(){
        return(
            <div id="spinnerLoader" style={{display: "flex", width: "100%", height: "85%", position: "absolute", zIndex: "100", justifyContent: "center", alignItems: "center"}}>
                <Loader
                    type="BallTriangle"
                    color="#F8694A"
                    height={200}
                    width={200}
                    // timeout={3000} //3 secs

                />
            </div>
        );
    }
}

export default Spinner;