import { Button } from "./Button"

const Alert = (props: {message: string, emitHandler: (value: boolean) => void, color: string}) => {
    return (
        <div className={" shadow-md border bg-white border-l-8 p-4 " + props.color}>
            <p className="p-4 text-sm text-stone-600">{props.message}</p>
            <Button typeButton={"primary"} className="w-fit rounded-full " onClick={() => props.emitHandler(true)} label={"Close"}></Button>
        </div>
    )
} 

export default Alert