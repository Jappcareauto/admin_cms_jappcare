import BodyShopImage from "@/public/images/Group 37102.png";
import GeneralMaintenanceImage from "@/public/images/Group 633095.png";
import DeepCleaningImage from "@/public/images/Group 37102 (2).png";
import PainShopImage from "@/public/images/Group 633092 (1).png";

const dataListDefinitionEnum = [
    {
        label: "CUSTOM",
        value: "CUSTOM"
    },
    {
        label: "VIN_DETECTION",
        value: "VIN_DETECTION"
    },
    {
        label: "VIN_DETECTION_PREMIUM",
        value: "VIN_DETECTION_PREMIUM"
    },
    {
        label: "VEHICLE_HISTORY_CHECK",
        value: "VEHICLE_HISTORY_CHECK"
    },
    {
        label: "VEHICLE_REPAIR",
        value: "VEHICLE_REPAIR"
    },
    {
        label: "VEHICLE_MAINTENANCE",
        value: "VEHICLE_MAINTENANCE"
    },
    {
        label: "TRANSMISSION_REPAIR",
        value: "TRANSMISSION_REPAIR"
    },
    {
        label: "ENGINE_DIAGNOSTICS",
        value: "ENGINE_DIAGNOSTICS"
    },
    {
        label: "BRAKE_INSPECTION",
        value: "BRAKE_INSPECTION"
    },
    {
        label: "ELECTRICAL_SYSTEM_CHECK",
        value: "ELECTRICAL_SYSTEM_CHECK"
    },
    {
        label: "TIRE_REPLACEMENT",
        value: "TIRE_REPLACEMENT"
    },
    {
        label: "AIR_CONDITIONING_SERVICE",
        value: "AIR_CONDITIONING_SERVICE"
    },
    {
        label: "BATTERY_REPLACEMENT",
        value: "BATTERY_REPLACEMENT"
    },
    {
        label: "SUSPENSION_REPAIR",
        value: "SUSPENSION_REPAIR"
    },
    {
        label: "FUEL_SYSTEM_SERVICE",
        value: "FUEL_SYSTEM_SERVICE"
    },
    {
        label: "EXHAUST_SYSTEM_REPAIR",
        value: "EXHAUST_SYSTEM_REPAIR"
    },
    {
        label: "BODYWORK_REPAIR",
        value: "BODYWORK_REPAIR"
    },
    {
        label: "PAINT_JOB",
        value: "PAINT_JOB"
    },
    {
        label: "WASH_AND_DETAILING",
        value: "WASH_AND_DETAILING"
    },

    {
        label: "INSURANCE_INSPECTION",
        value: "INSURANCE_INSPECTION"
    },
    {
        label: "PRE_PURCHASE_INSPECTION",
        value: "PRE_PURCHASE_INSPECTION"
    },
    {
        label: "EMISSIONS_TESTING",
        value: "EMISSIONS_TESTING"
    },
]

const dataListCategoryServiceCenterEnum = [
    {
        label: "General Maintenance",
        value: "GENERAL_MAINTENANCE",
        image: GeneralMaintenanceImage.src,
        isActive: false
    },
    {
        label: "Body Shop",
        value: "BODY_SHOP",
        image: BodyShopImage.src,
        isActive: false

    },
    {
        label: "Deep Cleaning",
        value: "DEEP_CLEANING",
        image: DeepCleaningImage.src,
        isActive: false
    },
    {
        label: "Paint Shop",
        value: "PAINT_SHOP",
        image: PainShopImage.src,
        isActive: false
    }
    

]
export { dataListDefinitionEnum, dataListCategoryServiceCenterEnum }