import React, { useState } from "react";
import FormMeta from "./FormMeta";
import { MdOutlineClose, MdOutlineModeEditOutline } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

const aniTimer = 0;

function ProfileMeta({ name, surname, email, phone_primary }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className={"w-100"}>
            <CSSTransition
                in={!isEdit}
                timeout={aniTimer}
                classNames="fade"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}
            >
                <div
                    className={
                        "edit-wrapper d-flex justify-content-end py-3 cursor-pointer"
                    }
                    onClick={() => setIsEdit(!isEdit)}
                >
                    <MdOutlineModeEditOutline />
                </div>
            </CSSTransition>
            <CSSTransition
                in={isEdit}
                timeout={aniTimer}
                classNames="fade"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}
            >
                <div
                    className={
                        "edit-wrapper d-flex justify-content-end py-3 cursor-pointer"
                    }
                    onClick={() => setIsEdit(!isEdit)}
                >
                    <MdOutlineClose />
                </div>
            </CSSTransition>

            <CSSTransition
                in={isEdit}
                timeout={aniTimer}
                classNames="fade"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}
            >
                <FormMeta
                    name={name}
                    surname={surname}
                    email={email}
                    phone_primary={phone_primary}
                    inputsFields={["name", "surname", "email", "phone_primary"]}
                    setIsLoading={setIsLoading}
                    setIsEdit={setIsEdit}
                />
            </CSSTransition>
            <CSSTransition
                in={!isEdit}
                timeout={aniTimer}
                classNames="fade"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}
            >
                <div className="flex-column">
                    <h5 data-hj-suppress>{`${name} ${surname}`}</h5>
                    <h6 className="my-2">{email}</h6>
                    <h6 data-hj-suppress>{phone_primary}</h6>
                </div>
            </CSSTransition>
        </div>
    );
}

export default ProfileMeta;
