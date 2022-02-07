import React from 'react';

export default function Alert(props) {
    return (
        <div>
            {props.alert && <div className={`alert alert-${props.alert.type} W-6`} role="alert">
                <strong>{props.alert.message}</strong>
               
            </div>}
        </div>

    )

}
