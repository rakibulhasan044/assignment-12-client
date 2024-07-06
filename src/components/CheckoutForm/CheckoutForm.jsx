import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';
import { ImSpinner } from "react-icons/im";



const CheckoutForm = ({ closeModal, item, setIsOpen }) => {

  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth()
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if(item?.price && item?.price > 1) {
        getClientSecret({ price: item?.price})
    }
  },[item?.price])

  const getClientSecret = async (price) => {
    const { data } = await axiosPublic.post(`/create-payment-intent`, price)
    console.log(data);
    setClientSecret(data.clientSecret)
  }

  const handleSubmit = async (event) => {
    // Block native form submission.
    setProcessing(true);
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false)
      return
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError('');
    }

    //confirm payment
    const {error: confirmError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email,
                name: user?.displayName
            },
        },
    })
    if(confirmError) {
        console.log(confirmError);
        setCardError(confirmError.message);
        setProcessing(false)
    }

    if(paymentIntent.status === 'succeeded') {
        // 1. create payment info object
        console.log(paymentIntent);
        const paymentInfo = {
            transectionId: paymentIntent.id,
            date: new Date(),
        }
        console.log(paymentInfo);
        // 2.save payment info in booking collection db
        // 3. change status of user
    }
    setProcessing(false)
    setIsOpen(false)
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="mt-4 flex justify-around">
        <Button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="inline-flex items-center gap-2 rounded-md bg-gray-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
          //   onClick={closeModal}
        >
            {
                processing ? <ImSpinner size={20} className="animate-spin m-auto" />
                : <>Pay ${item.price} </>
            }
        </Button>
        <Button
          className="inline-flex items-center gap-2 rounded-md bg-gray-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
          onClick={closeModal}
        >
          Cancel
        </Button>
      </div>
    </form>
    {
        cardError && <p className="text-xl text-red-600">{cardError}</p>
    }
    </>
  );
};

CheckoutForm.propTypes = {
    item: PropTypes.object,
    closeModal: PropTypes.func,
    setIsOpen: PropTypes.bool

}

export default CheckoutForm;
