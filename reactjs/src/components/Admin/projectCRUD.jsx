import { React, useState, ReactDOM } from "react";
import AuthUser from "../Authentication/AuthUser";

export default function ProjectCRUD() {
    const user = AuthUser();

    return(
        <>
              <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                      Project CRUD 
                    </div>

        </>
    )

}