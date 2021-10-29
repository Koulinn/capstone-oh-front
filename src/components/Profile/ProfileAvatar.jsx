import React from 'react'
import { Avatar, Badge } from '@mui/material';

// /me/uploadAvatar

export default function ProfileAvatar({ medical_tests_requested, name, avatar }) {
    return (
        <Badge
            color='primary'
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            invisible={medical_tests_requested?.length > 0 ? false : true}
        >
            <label htmlFor="avatar" className="cursor-pointer"><Avatar alt={name + ' picture'} src={avatar} /></label>
            <input className="d-none position-absolute" id='avatar' type="file" />
        </Badge>
    )
}
