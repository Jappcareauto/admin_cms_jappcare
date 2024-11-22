import LoadingIcon from "../Icones/LoadingIcon"

const Loader = (props: { message: string | undefined | null, isLoading: boolean }) => {
    if (props.isLoading) {
        return (
            <div className="flex w-full h-full justify-center items-center bg-black/30 z-40 top-0 left-0 fixed">
                <LoadingIcon fill="#FB7C37"></LoadingIcon>
                {props.message ? props.message : null}
            </div>
        )
    } else {
        return null
    }
}

export default Loader