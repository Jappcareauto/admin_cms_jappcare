interface InvoiceListItemProps {
    name: string,
    qte: number,
    price: number,
    device: string,
}
const InvoiceListItem = ({price, qte, name, device}: InvoiceListItemProps) => {
    return (
        <div className="text-sm flex justify-between py-4">
            <div>
                <span className="text-black">{name}</span>
            </div>
            <div className="gap-6 grid grid-cols-3">
                <span className="text-black">{qte}</span>
                <span className="text-black">{price} {device}</span>
                <span className="text-black font-bold">{price * qte} {device}</span>
            </div>
        </div>
    )
}
export default InvoiceListItem