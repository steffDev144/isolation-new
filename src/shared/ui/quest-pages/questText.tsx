export function QuestText({ description }: { description: string }) {
    return (
        <div className="quest__info_text">
            <p className="quest__info_text-descr">
                {description}
            </p>
        </div>
    )
}