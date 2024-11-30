import { ProductInterface } from "@/interfaces/ProductInterface"

const CardProduct = (props: { item: ProductInterface, onSubmit: (value: ProductInterface) => void }) => {
    return (

        <div onClick={() => props.onSubmit(props.item)}>
            <div
                className=" h-48 bg-stone-100 animate-pulse overflow-hidden flex items-center justify-center border rounded-lg ">
             
            </div>
            <div className="text-sm p-1 px-2">
                <h6 className="font-semibold mb-2">
                    {props.item.name}
                </h6>
                <span className="text-orange-500">{props.item.price.amount} {props.item.price.currency}</span>
            </div>
        </div>

    )
}

export default CardProduct