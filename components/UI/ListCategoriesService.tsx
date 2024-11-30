import { dataListCategoryServiceCenterEnum } from "@/enums/dataList"
import Image from "next/image"
interface ListCategoriesServiceProps {
    itemActive: (value: string) => void
}
const ListCategoriesService = ({itemActive}: ListCategoriesServiceProps) => {
    const onStateChange = (value: string) => {
        const element : string =  value;
        dataListCategoryServiceCenterEnum.map((item: { isActive: boolean; value: string, label: string; }) => {
            if (value == item.value) {
                item.isActive = true;
            } else {
                item.isActive = false;
            }
        })
        itemActive(element)
    }
    return (
        <div className=" relative  overflow-x-auto">
            <div style={{width: 500}} className=" flex flex-row gap-2">
                {
                    dataListCategoryServiceCenterEnum.map((el) => (
                        <div title={el.value} onClick={() => onStateChange(el.value)} key={el.value} className={`p-2 flex-1 rounded-lg bg-orange-200/50 relative overflow-hidden  h-32 ${el.isActive ? 'border-orange-500 border-2 ' : ''}`}>
                            <p className="text-sm w-full text-wrap">{el.label}</p>
                            <Image src={el.image} className="absolute bottom-0 right-0" width={75} height={75} alt="Image"></Image>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListCategoriesService