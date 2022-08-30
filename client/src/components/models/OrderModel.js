import {Modal} from 'antd';
import { currencyFormatter } from '../../actions/stripe';


const OrderModel=({session, orderedBy, hotel, showModal, setShowModal}) =>{
  return (
    <Modal visible={showModal} title="Payment Information" onCancel={()=>setShowModal(!showModal)}>
        <p>Payment intent: {session.payment_intent}</p>
        <p>Payment status: {session.payment_status}</p>
        <p>Amount total: {session.currency.toUpperCase()}{" "}{session.amount_total/100}</p>
        <p>Stripe customer id: {session.customer}</p>
        <p>Customer: {orderedBy.name}</p>
        <p className='alert alert-info'>Seller Phone: {hotel.postedPhone}</p>
        <p className='alert alert-info'>Seller Email: {hotel.postedEmail}</p>

        <p>Payment intent:{session.payment_intent}</p>
    </Modal>
  )
}

export default OrderModel;