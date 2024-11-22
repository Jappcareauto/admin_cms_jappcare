interface ScheduleItemProps {
    name: string,
    serviceName: string,
    vehicleName: string,
    date: string,
    dateEnd: string,
}
const ScheduleItem = ({ name, serviceName, vehicleName, date, dateEnd }: ScheduleItemProps) => {
    return (
        <div className="p-2 px-4 border-l-8 bg-orange-50 border-l-orange-500 rounded-xl ">
            <div className="flex items-center justify-between">
                <div className="flex items-center w-full gap-4 rounded-2xl">
                    {/* <img width="48" height="48" className="rounded-full"
                        src="../../assets/images/10c6847941b93f45858be7d3ce3ff3ec.png" alt="" /> */}
                    <span className="text-sm max-md:text-xs">{name}</span>
                </div>
                <span className="text-sm">{vehicleName}</span>
            </div>
            <div>
                <h3 className="text-sm font-bold">{serviceName} - appointement</h3>
                <h6 className="text-sm">{date} - {dateEnd}</h6>
            </div>
        </div>
    )
}

export default ScheduleItem