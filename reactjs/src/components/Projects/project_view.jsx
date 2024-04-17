import React, { useEffect, useState } from 'react';
import AuthUser from '../Authentication/AuthUser';

export default function Project_View() {
    const { user, http, khalti } = AuthUser();
    const project_id = window.location.pathname.split('/')[2];
    const [project, setProject] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModalDonate, setShowModalDonate] = useState(false);
    const [showModalInvest, setShowModalInvest] = useState(false);
    const [amount, setAmount] = useState(0);
    const [reportModal, setReportModal] = useState(false);
    const [report, setReport] = useState('');
    const [updates, setUpdates] = useState([]);


    useEffect(() => {
        http.get(`/project/${project_id}`).then((response) => {
            setProject(response.data.project[0]);
        }).catch((error) => {
            console.error(error);
        });

        http.get(`/user/project/${project_id}/updates`).then((response) => {
            setUpdates(response.data.project_updates);
        }).catch((error) => {
            console.error(error);
        });
    }, []);


    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    const InitiatePaymentCrowdfund = () => {
        setShowModalDonate(true);
    }

    const InitiatePaymentInvest = () => {
        setShowModalInvest(true);
    }

    const CreateReport = () => {
        setReportModal(true)
    }
    const crowdfundPay = () => {

        khalti.post('epayment/initiate/', {
            "return_url": "http://localhost:3000/payment/success/",
            "website_url": "http://localhost:3000/",
            "amount": amount * 100, // Use entered amount
            "purchase_order_id": 'userid_' + user.id + '_projectid_' + project.projectID,
            "purchase_order_name": 'donation_' + project.project_title,
            "customer_info": {
                "name": user.name,
                "email": user.email,
                "phone": "9800000123"
            },
        }
        ).then((response) => {
            window.location.href = response.data.payment_url;
        }).catch((error) => {
            console.error(error);
        });
    }


    const investPay = (reward) => {
        const rewardID = reward.rewardID;

        khalti.post('epayment/initiate/',
            {
                "return_url": "http://localhost:3000/payment/success/",
                "website_url": "http://localhost:3000/",
                "amount": reward.amount * 100,
                "purchase_order_id": 'userid_' + user.id + '_projectid_' + project.projectID + "_rewarded_" + rewardID,
                "purchase_order_name": 'rewarded_' + project.project_title,
                "customer_info": {
                    "name": user.name,
                    "email": user.email,
                    "phone": "9800000123"
                }
            }
        ).then((response) => {
            window.location.href = response.data.payment_url;
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleReportSubmit = () => {
        http.post('/report/add', {
            project_id: project_id,
            user_id: user.id,
            report: report,
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        })
        // After submitting, you can close the modal
        setReportModal(false);
    };

    const fundingPercentage = ((parseFloat(project.total_amount_raised) / parseFloat(project.funding_goal)) * 100).toFixed(2);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Title */}
            <div className="items-center justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-yellow-600">{project.project_title}</h1>
                    <h5 className="text-lg font-semibold mb-4 text-center text-yellow-600"> {project.short_description}</h5>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
                {/* Image Column */}
                <div>
                    {/* Image Carousel */}
                    <div className="relative overflow-hidden rounded-lg">
                        {project.images && project.images.length > 0 && (
                            <img
                                src={`http://localhost:8000/${project.images[currentImageIndex].image}`}
                                alt="Project Image"
                                className="object-contain w-full h-auto cursor-pointer"
                                onClick={handleNextImage}
                            />
                        )}
                        {/* Next Button */}
                        <button
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full bg-gray-700"
                            onClick={handleNextImage}
                        >
                            &rarr;
                        </button>
                        {/* Previous Button */}
                        <button
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full bg-gray-700"
                            onClick={handlePrevImage}
                        >
                            &larr;
                        </button>
                    </div>
                </div>

                <div>
                    <div>
                        <div className="mt-5">
                            <button onClick={CreateReport} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded absolute right-10">
                                <span>Report</span>
                            </button>
                             <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2 text-yellow-600">Project Details</h2>
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="mb-4">
                        <p className="font-semibold">Total Funding:</p>
                        <p>Rs. {project.total_amount_raised}</p>
                        {/* Progress Bar */}
                        <div className="h-4 bg-gray-200 rounded-md mt-2">
                            <div
                                className="h-full bg-green-500 rounded-md"
                                style={{ width: `${fundingPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Total Backers:</p>
                        <p>{project.total_transactions}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">End Date:</p>
                        <p>{project.end_date}</p>
                    </div>
                </div>
            </div>
                            {/* Action Buttons */}
                            <div className="md:flex-row md:justify-between items-center">
                                {/* Description */}
                                {project.status === 'Running' ? (
                                    <>
                                        <div>
                                            {project.type === 'Invest' ? (
                                                <button onClick={InitiatePaymentInvest} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded w-full mb-2 md:mb-0 md:mr-2">
                                                    Pick a Reward
                                                </button>
                                            ) : (
                                                <button onClick={InitiatePaymentCrowdfund} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded w-full mb-2 md:mb-0 md:mr-2">
                                                    Donate
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                                                <h2 className="text-lg font-semibold mb-2 text-yellow-600">Project Description</h2>
                                                <p>{project.description}</p>
                                            </div>
                                            {/* Creator Information */}
                                            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                                                <h2 className="text-lg font-semibold mb-2 text-yellow-600">Creator Information</h2>
                                                <div className="grid gap-2">
                                                    <span className="p-2 rounded">Name: {project.creator}</span>
                                                    <span className="p-2 rounded">Email: {project.creator_email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-red-500">Project is not active</span>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                {/* 1 and Discussions */}
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold mb-4 text-yellow-700">Progress and Discussions</h2>
                    <div className="grid gap-4">
                        <div className="bg-yellow-50 p-6 rounded-lg mb-4">
                            <div className="grid grid-cols-1 gap-6">
                                {updates.map((update, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
                                        <p className="text-gray-700">{update.content}</p>
                                        <p className='text-gray-700'>Created At: {update.created_at.split('T')[0]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Donation Modal */}
            {showModalDonate && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Payment</h3>
                                        <div className="project-section px-4 py-8">
                                            <h1 className="project-title text-xl font-bold mb-4">{project.project_title}</h1>
                                            <div className="project-details">
                                                <div className="donation-entry mb-4">
                                                    <label htmlFor="donation-enter" className="block text-gray-700">Enter Amount:</label>
                                                    <input onChange={(e) => setAmount(e.target.value)} type="number" id="donation-enter" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                                </div>
                                                <button onClick={crowdfundPay} className="donate-now bg-purple-500 text-white px-4 py-2 rounded-md mb-4">Continue With Khalti</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => setShowModalDonate(false)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/*Donation Modal */}
            {showModalInvest && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            {/* Rewards Section */}
                            {project.rewards && project.rewards.length > 0 && (
                                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                                    <h2 className="text-lg font-semibold mb-2 text-yellow-600">Rewards</h2>
                                    {project.rewards.map((reward, index) => (
                                        <div key={index} className="bg-white rounded-lg p-4 shadow-md mb-4">
                                            <div className="mb-4">
                                                <p className="font-semibold">Title:</p>
                                                <p>{reward.title}</p>
                                            </div>
                                            <div className="mb-4">
                                                <p className="font-semibold">Image:</p>
                                                <img src={`http://localhost:8000/${reward.reward_image}`} alt="Reward Image" className="w-40 h-40 rounded" />
                                            </div>
                                            <div className="mb-4">
                                                <p className="font-semibold">Description:</p>
                                                <p>{reward.description}</p>
                                            </div>
                                            <div className="mb-4">
                                                <p className="font-semibold">Amount:</p>
                                                <p>{reward.amount}</p>
                                            </div>
                                            <div className="mb-4">
                                                <p className="font-semibold">Delivery:</p>
                                                <p>{reward.estimated_delivery}</p>
                                            </div>
                                            <button onClick={() => investPay(reward)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded w-full mb-2 md:mb-0 md:mr-2">
                                                Get
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => setShowModalInvest(false)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {reportModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Create a Report</h3>
                                <div className="mb-4">
                                    <label htmlFor="report" className="block text-gray-700">Report:</label>
                                    <textarea
                                        id="report"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        rows="4"
                                        placeholder="Enter your report here..."
                                        onChange={(e) => setReport(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleReportSubmit}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Submit Report
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setReportModal(false)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
