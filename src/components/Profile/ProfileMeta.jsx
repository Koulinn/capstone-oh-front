import React, { useState } from 'react'
import FormMeta from './FormMeta';
import {MdOutlineModeEditOutline} from 'react-icons/md'

function ProfileMeta({ name, surname, email, phone_primary }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(true)


    return (
        <div className={isEdit? 'w-50' :"w-100"}>
            <div class={"edit-wrapper d-flex justify-content-end py-3 cursor-pointer" + (isEdit? ' px-3' : ' pl-3' )}
                onClick={()=>setIsEdit(!isEdit)}
            >
                <MdOutlineModeEditOutline/>
                </div>
            {isEdit ? <FormMeta
                name={name}
                surname={surname}
                email={email}
                phone_primary={phone_primary}
                inputsFields={['name', 'surname', 'email', 'phone_primary']}
                setIsLoading={setIsLoading}
                setIsEdit={setIsEdit}
            />
                :
                <>
                    <h5>{`${name} ${surname}`}</h5>
                    <h6 className="my-2">{email}</h6>
                    <h6>{phone_primary}</h6>
                </>
            }
        </div>
    )
}

export default ProfileMeta
