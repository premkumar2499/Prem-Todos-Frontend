import React, { useState } from 'react';

const Messages = ({error,msg}) => {
    const [open,setOpen] = useState(true);
    return(
        <>
        { error ? (
            open && <div className="d-flex flex-row justify-content-between align-items-center alert alert-danger">
            <strong>{msg}</strong>
            <button type="button" className="error-border bg-transparent" onClick={()=>setOpen(!open)}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ) : (
            open && <div className="d-flex flex-row justify-content-between align-items-center alert alert-success">
            <strong>{msg}</strong>
                <button type="button" className="error-border bg-transparent" onClick={()=>setOpen(!open)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )}
        </>
    )
}

export default Messages;