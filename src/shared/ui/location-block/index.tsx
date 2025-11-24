import { DubnaIcon } from "@/shared/DubnaIcon/DubnaIcon";

export function LocationBlock(
    {
        classLocationBlock,
        classLocationText,
        valueLocation
    }:
        {
            classLocationBlock: string,
            classLocationText: string,
            valueLocation: string
        }
) {
    return (
        <div className={classLocationBlock}>
            <DubnaIcon />
            <p className={classLocationText}>{valueLocation}</p>
        </div>
    )
}