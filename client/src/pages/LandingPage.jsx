import React from 'react';
const LandingPage = () => {
    return (
        <div className="h-screen flex justify-center items-center bg-cover bg-center bg-fixed" style={{ backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStifZ4u_onTaV-vkFCdvIojDCOyCVcATACPpG1xmtZ-H0tdGQBdzzzVZkraw&s)" }}>
            <div className="bg-white bg-opacity-50 p-8 rounded-lg text-center">
                <h1 className="text-4xl font-bold mb-4 text-center" >Welcome to Our Website</h1>
                <div className="bg-white bg-opacity-50 p-8 rounded-lg text-center">
                    <p className="text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam accumsan nulla at posuere.</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
