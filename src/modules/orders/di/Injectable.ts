import type { Constructor } from "@/modules/orders/types";
import { Registry } from "./Registry";

export function Injectable<T>() { 
    return function (constructor:Constructor<T> ) {
       Registry.getInstance().register(constructor);
    }   
}   