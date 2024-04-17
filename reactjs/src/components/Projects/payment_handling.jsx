import { React, useEffect, useState } from "react";
import AuthUser from "../Authentication/AuthUser";
import { Link } from "react-router-dom";
import Post_Pledge from "./post_success_pledge";
import Pledge_Error from "./pledge_error";

export default function Payment_Handling() {

    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status.toLowerCase === 'completed') {
        return (
            <Post_Pledge />
        )
    }
    else {
        return (
                <Pledge_Error/>
        )
    }
}