export function SortQuest({ array }: { array: string[] }) {
    return (
        <>
            {
                array.map((item, index) => {
                    return (
                        <li key={index} className="contacts__text_locations-list_item">{item}</li>
                    )
                })
            }
        </>
    )
}