// RedButton.tsx
import Link from "next/link";
import "./RedButton.scss";

export function RedButton(
    {
        altImage,
        classButton,
        textButton,
        href
    }:
        {
            altImage: string,
            classButton: string,
            textButton: string,
            href?: string
        }
) {
    if (!href) {
        return (
            <button className={`button-red ${classButton}`}>
                <p className="button-red_text">{textButton}</p>
            </button>
        )
    }

    // Если href начинается с #, это якорь - используем обычный <a>
    if (href.startsWith('#')) {
        return (
            <a href={href} className={`button-red ${classButton}`}>
                <p className="button-red_text">{textButton}</p>
            </a>
        )
    }

    // Для обычных путей используем Link
    return (
        <Link href={href} className={`button-red ${classButton}`}>
            <p className="button-red_text">{textButton}</p>
        </Link>
    )
}