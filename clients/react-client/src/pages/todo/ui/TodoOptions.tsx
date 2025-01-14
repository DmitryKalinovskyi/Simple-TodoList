import * as Icon from 'react-bootstrap-icons';
import useProperty from '../../../shared/features/properties/hooks/useProperty';
import { ChangeEvent } from 'react';
import { StorageType } from '../../../shared/features/properties/state/propertiesSlice';
import { getEnumKeys } from '../../../shared/extension/getEnumKeys';

export default function TodoOptions() {
    const [storageType, setStorageType] = useProperty<StorageType>("storageType");

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        if(event.target.value in StorageType){
            setStorageType(event.target.value as StorageType);
        }
    }

    return (
        <>
            <div className="position-fixed" style={{ left: '4px', bottom: '4px' }}>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <Icon.GearFill size={20} />
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
                            <div className="d-grid gap-3">

                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        Storage type
                                    </div>
                                    <div className="col-auto">
                                        <select className="form-select" onChange={handleSelect} value={storageType}>
                                            {getEnumKeys(StorageType).map((key) =>
                                                <option key={key}>{key}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="row align-items-center">
                                    <button className="btn btn-primary col-auto" data-bs-dismiss="modal" onClick={handleSave}>Save</button>
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}