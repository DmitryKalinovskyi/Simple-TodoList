import * as Icon from 'react-bootstrap-icons';
export default function TodoOptions() {
    return (
        <>
            <div className="position-fixed" style={{left: '4px', bottom: '4px'}}>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <Icon.GearFill size={20}/>
                </button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Settings</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    Storage type
                                </div>
                                <div className="col-auto">

                                <select className="form-select">
                                    <option>SQL</option>
                                    <option>XML</option>
                                </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}