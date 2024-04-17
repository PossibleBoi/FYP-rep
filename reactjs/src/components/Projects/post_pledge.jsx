import { React, useEffect, useState } from "react";
import AuthUser from "../Authentication/AuthUser";
import { Link } from "react-router-dom";

export default function Post_Pledge() {
  const { http, khalti } = AuthUser();
  const [transactionID, setTransactionID] = useState('');
  const [amount, setTotalAmount] = useState('');

  const information = window.location.href.split("/")[5].split('&');

  const pidx = information[12].split('=')[1];
  const projectID = information[10].split('=')[1].split('_')[3];
  const userID = information[10].split('=')[1].split('_')[1];
  const rewardID = information[10].split('=')[1].split('_')[5];
  //fix all those above to states, use the information from below post !
  useEffect(() => {
    khalti.post('/epayment/lookup/', {
      pidx: pidx
    }).then((response) => {
      setTotalAmount(response.data.total_amount);
      setTransactionID(response.data.transaction_id);
    }).catch((error) => {
      console.log(error);
    });

    http.post('/transaction/add', {
      transaction_id: transactionID,
      transction_date: new Date().toLocaleDateString('eu-EU'),
      user_id: userID,
      project_id: projectID,
      amount: amount / 100,
      reward_id: rewardID
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  })

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Thank You For Backing the Project!</h2>
        <div className="space-y-4">
          <p>Your Pledge Is Appreciated Greatly By Our Team at Diyo And The Project Creators!</p>
          <div className="bg-gray-700 p-4 rounded">
            <p className="font-bold">Pledged Amount Rs.{amount / 100}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}