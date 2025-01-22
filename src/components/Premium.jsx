import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Premium = () => {
    const handleBuyClick = async (type) => {
        const order = await axios.post(
            BASE_URL + "/payment/create",
            {
                membershipType: type,
            },
            {
                withCredentials: true
            }
        );

        //it shouls open the razorpay dialogue box
        const { amount, keyId, currency, notes, orderId } = order.data;
        const options = {
            key: keyId,
            amount,
            currency,
            name: 'Developers Connect',
            description: 'Connect to other developers',
            order_id: orderId, // This is the order_id created in the backend
            // callback_url: 'http://localhost:3000/payment-success', // Your success URL
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                // email: 'gaurav.kumar@example.com',
                // contact: '9999999999'  
            },
            theme: {
                color: '#F37254'
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    return (
        <div className="m-10">
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                    <h1 className="font-bold text-3xl">Silver Membership</h1>
                    <ul>
                        <li> - Chat with other people </li>
                        <li> - 100 connection Requests per day </li>
                        <li> - Blue Tick </li>
                        <li> - 3 months </li>
                    </ul>
                    <button onClick={() => handleBuyClick("silver")} className=" btn btn-primary">Buy Silver</button>

                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                    <h1 className="font-bold text-3xl">Gold Membership</h1>
                    <ul>
                        <li> - Chat with other people </li>
                        <li> - Infinite connection Requests per day </li>
                        <li> - Blue Tick </li>
                        <li> - 6 months </li>
                    </ul>
                    <button onClick={() => handleBuyClick("gold")} className="btn btn-secondary">Buy Gold</button>

                </div>
            </div>
        </div >
    )
}
export default Premium;