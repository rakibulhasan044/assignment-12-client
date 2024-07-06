import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import PropTypes from 'prop-types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);


const CheckOutModal = ({ isOpen, closeModal, item, setIsOpen }) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-black/30 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="font-medium text-white text-center text-xl"
              >
                Review Info Before Payment
              </DialogTitle>
              <p className="mt-2  text-white/50">
                Package type: {item.title}
              </p>
              <p className="text-white/50">Validate for one month</p>
              <p className="text-white/50">Total ptice: ${item.price}</p>

              <Elements stripe={stripePromise} >
                <CheckoutForm 
                closeModal={closeModal} 
                item={item}
                setIsOpen={setIsOpen} />
              </Elements>
 
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

CheckOutModal.propTypes = {
  item: PropTypes.object,
  closeModal: PropTypes.func,
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool
}

export default CheckOutModal;
