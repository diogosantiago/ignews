import { signIn, useSession } from "next-auth/client"
import { useRouter } from "next/dist/client/router"
import { api } from "../../services/api"
import { getStripeJs } from "../../services/stripe-js"
import styles from "./styles.module.scss"

interface SubscribeButtonProps{
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
    const session = useSession()
    const router = useRouter()

    async function handleSubscribe(){
        if(!session){
            console.log('handleSubscribe')
            signIn('github')
            return;
        }

        console.log(session);
        // @ts-ignore
        if(session[0]?.activeSubscription){
            router.push('/posts')
            return;
        }

        try{
            // const response = await api.post('/subscribe')
            // const { sessionId } = response.data
            // const stripe = await getStripeJs()
            // await stripe.redirectToCheckout({sessionId})
        } catch (err){
            alert(err.message)
        }
    }
    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe Now
        </button>
    )
}