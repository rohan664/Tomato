import {atom} from "recoil"
import {recoilPersist} from "recoil-persist"

const { persistAtom } = recoilPersist()

export const cartItems = atom({
    key : "cart",
    default : {},
    effects_UNSTABLE : [persistAtom]
})

export const orderItems = atom({
    key : "order",
    default : [],
    effects_UNSTABLE : [persistAtom]
})