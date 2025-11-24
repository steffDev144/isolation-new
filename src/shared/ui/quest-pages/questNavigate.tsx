import Link from "next/link";

interface QuestNavigateProps {
    questName: string;
}

export function QuestNavigate({ questName }: QuestNavigateProps) {
    return (
        <div className="quest__navigation">
            <Link href="/" className="quest__navigation-link">
                Главная
            </Link>
            <span className="quest__navigation-separator">›</span>
            <span className="quest__navigation-current">{questName}</span>
        </div>
    );
}