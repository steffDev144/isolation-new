export function TitleSection(
    {
        classTitle,
        text,
        id
    }: {
        classTitle: string,
        text: string,
        id?: string
    }
) {
    return (
        <h2 className={classTitle} id={id}>{text}</h2>
    )
}