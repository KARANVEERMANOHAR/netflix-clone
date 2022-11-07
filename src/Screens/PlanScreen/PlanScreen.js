import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './PlanScreen.css'
import {db} from '../../Firebase'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import {loadStripe} from '@stripe/stripe-js'
function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null);

    useEffect(() =>{
        db.collection("customers").doc(user.uid)
        .collection("subscriptions")
        .get().then((querySnapshot) =>{
            querySnapshot.forEach(async (subscription)=>{
                setSubscription({
                    role:subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds
                })
            })
        })
    },[user.uid])

    const loadCheckout = async (priceId) =>{
        
        const docRef = await db.collection('customers').doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        })

        docRef.onSnapshot(async (snap) =>{
            
            const {error, sessionId} = snap.data();
            

            if(error){
                // show error to customer 
                // inspect your cloud function logs in firebase console
                alert(`An error Occured', ${error.message}`)
            }

            if(sessionId){
                // we have a session let's redirect to checkout
                // init stripe

                const stripe = await loadStripe("pk_test_51M1DKUSBX3ZcLOZirchctkj4DcsmBUXPOBCyqBFWlMuW4UvN2awD4CfMKPnwFrgofczVm3BfJZFZ4uTWsvSFNs9n00QarYWhEJ");
                stripe.redirectToCheckout({sessionId})
            
            }
        })
    }

    useEffect(() =>{
        db.collection('products').where("active" , "==", true).get().then((querySnapshot) =>{
            const products = {};
            querySnapshot.forEach(async (productDoc) =>{
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach((price) =>{
                    products[productDoc.id].price = {
                        priceId: price.id,
                        priceData:price.data()
                    }
                })
            })
            setProducts(products);
        })
    },[])
  return (
    <div className='planScreen'>
        {subscription && <p>Renewal Date:{new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>}
        {Object.entries(products).map(([productId, productData]) =>{
            // add some logic to check user subscription

            const isCurrentPackage = productData.name?.toLowerCase()
            .includes(subscription?.role)
            return(
                <div className={`${isCurrentPackage && "planScreen_plan--disabled" } planScreen_plan`} key={productId}>
                    <div className="planScreen_info">
                        <h5>{productData.name} </h5>
                        <h6>{productData.description} </h6>
                    </div>
                    <button onClick={() =>!isCurrentPackage && loadCheckout(productData.price.priceId)}>{isCurrentPackage? 'Current Package': "Subscribe"}</button>
                </div>
            )
        })}
    </div>
  )
}

export default PlanScreen