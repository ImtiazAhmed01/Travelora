
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { AuthContext } from '../Provider/authProvider';

const Payment = () => {
    const { id } = useParams(); // booking ID
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const user = useContext(AuthContext)

    const [paymentStatus, setPaymentStatus] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [booking, setBooking] = useState(null);

    // Step 1: Fetch booking details to get packageId
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await fetch(`http://localhost:5000/bookings/${id}`);
                const data = await res.json();
                setBooking(data);
            } catch (err) {
                console.error('Error fetching booking:', err);
            }
        };

        fetchBooking();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !booking || !booking.packageId) return;

        const card = elements.getElement(CardElement);

        try {
            setIsProcessing(true);

            console.log("Creating payment intent for booking:", booking);

            // Step 2: Create payment intent
            const response = await fetch('http://localhost:5000/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 5000, bookingId: id, packageId: booking.packageId }),
            });

            const data = await response.json();

            if (!data.clientSecret) {
                throw new Error('Missing clientSecret from server');
            }

            // Step 3: Confirm card payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card },
            });

            if (error) {
                console.error('Payment Error:', error.message);
                setPaymentStatus('Payment Failed');
                setIsProcessing(false);
            } else if (paymentIntent.status === 'succeeded') {
                setPaymentStatus('Payment Successful');

                // Step 4: Update booking status to "In Review"
                await fetch(`http://localhost:5000/bookings/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'In Review' }),
                });

                // Step 5: Copy tour package to adminReview collection
                await fetch(`http://localhost:5000/adminReview/copy/${booking.packageId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userName: booking.touristName,
                        userEmail: booking.touristEmail,
                        packageId: booking.packageId,
                    }),
                });


                if (!copyResponse.ok) {
                    console.warn('Failed to copy package to adminReview');
                }

                // Step 6: Redirect after delay
                setTimeout(() => {
                    navigate('/dashboard/tourist/myBookings');
                }, 2000);
            }
        } catch (err) {
            console.error('Error processing payment:', err.message);
            setPaymentStatus('Payment Failed');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Complete Your Payment</h2>
            <form onSubmit={handleSubmit}>
                <CardElement className="p-4 border rounded-md" />
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="btn btn-primary mt-4"
                >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
            {paymentStatus && <p className="mt-4 font-semibold">{paymentStatus}</p>}
        </div>
    );
};

export default Payment;
